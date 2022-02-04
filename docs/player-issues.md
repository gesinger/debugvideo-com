# Player Issues

There are many different web players out there for playing HLS and DASH streams. Some popular ones include:

* [videojs/http-streaming](https://github.com/videojs/http-streaming)
* [hls.js](https://github.com/video-dev/hls.js)
* [shaka-player](https://github.com/google/shaka-player)
* [dash.js](https://github.com/Dash-Industry-Forum/dash.js)

Each player has its own debugging tools and strategies, and often have guides that are useful for diagnosing common issues.

There are strategies though that can use the `<video>` tag created on the page, rather than using player-specific APIs. This section discusses some of those debugging strategies, and issues to look for.

## Player issues can be common

First, it's important to note that the player is often at fault. There might be a bug, a new specification feature the player hasn't added, or even a use-case of the specification that the player developers haven't had time to complete.

But even if the player is not at fault, investigating the player's state and events can help glean more information about the source of the playback issue.

Bugs encompass a large surface area of issues, but here are some common types caused by players:

### Choosing the wrong segment

**What happens**: On a seek, the player chooses a segment that begins after the seeked to time, leading to a gap or skipped content.

**Why does this happen**: For VOD, this problem is less common, as it's much easier to determine the next segment to choose when the manifest isn't changing, but it can still happen. If a user seeks to a new time in the video, the player must calculate what segment to choose. To make a decision, the player uses the durations, start times, and end times of segments in the manifest, combined with actual durations, start times, and end times of segments it's already downloaded and appended. Often the player makes a conservative guess, but this may not be enough.

To exhibit the problem, here's an example HLS manifest:

```
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-TARGETDURATION:10
#EXTINF:10,
segment1.ts
#EXTINF:10,
segment2.ts
#EXTINF:10,
segment3.ts
#EXTINF:10,
segment4.ts
#EXTINF:10,
segment5.ts
#EXTINF:10,
segment6.ts
#EXT-X-ENDLIST
```

There are 6 segments, each with a reported duration of 10 seconds, making for a 60 second long video. If the user seeks to time 41, then the player should request segment5.ts, as that covers times from 40 seconds => 50 seconds. However, it's possible that the segments are actually more than 10 seconds in length. The HLS manifest specifies:

> Durations SHOULD be decimal-floating-point, with enough accuracy to avoid perceptible error when segment durations are accumulated. However, if the compatibility version number is less than 3, durations MUST be integers. Durations that are reported as integers SHOULD be rounded to the nearest integer.
[HTTP Live Streaming 2nd Edition - Section 4.4.4.1](https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-10#section-4.4.4.1)

That "SHOULD" in there can really throw things off, because if it says SHOULD, that means streams can do what they want, and the player may have to handle it. If the actual segment times are 10.4 seconds instead of 10 seconds, then segment5 starts at 41.6 seconds, meaning the player may not be able to continue, as there'll be a 0.6 second gap between the current time of 41 seconds, and the buffer start of 41.6 seconds.

:::info Actual Time Versus Reported Time
Many stream providers try to provide as accurate timing information as possible in the manifest, but for various reasons the segment durations may differ from the durations reported by the manifest. This is why the player uses both manifest reported times and actual times after downloading, parsing, and appending segments.

Certain streaming media formats (e.g., DASH) have stricter time reporting requirements than others (e.g., HLS).
:::

### Setting incorrect timestamp offsets

**What happens**: The player sets timestamp offsets for the source buffers incorrectly, leading to gaps.

**Why does this happen**: Timestamp offsets are used to ensure that media before and after a discontinuity line up correctly (i.e., without gaps or overlaps). That [timestamp offset](https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer/timestampOffset) is set on each [source buffer](https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer).

After setting the timestamp offset of a source buffer, when new content is appended, the media's timing values will be adjusted by the offset. For instance, if the timestamp offset is -10 seconds, and an appended frame has a PTS value of 11 seconds and a DTS of 10.5 seconds, then the timestamps will be adjusted so that the content, when appended, will have a PTS value of 1 second and a DTS of 0.5 seconds.

In order to provide the correct timestamp offset, a player has to make a calculation between the media time before a discontinuity and the media time after a discontinuity. If there was a seek, and the media isn't playing consecutively, the player has to make even more of a guess, based off of manifest reported media times, which, as mentioned above, are not always accurate.

This all leads to the potential for the timestamp offset to be wrong, which can cause gaps or overlapped content.

In addition, there may be separate audio and video source buffers, and those timestamp offsets must be kept in line with each other.

## Player State

### Buffer, Current Time

One of the most common issues a player encounters is a buffer gap. While the cause can be the stream itself or how the player downloaded and appended content, it's important to know how to check for them. The easiest way is to determine if the current time is within, or close to, a gap in the buffer:

```javascript
(() => {
  // Here we're assuming there's one video element on the page, but
  // it would be better to use the specific player you want in place
  // of this assumption.
  const videoElement = document.getElementsByTagName('video')[0];

  const timeRangesToArray = (timeRanges) => {
    const timeRangesList = [];

    for (let i = 0; i < timeRanges.length; i++) {
      timeRangesList.push({
        start: timeRanges.start(i),
        end: timeRanges.end(i)
      });
    }

    return timeRangesList;
  };

  const timeRangesString = (timeRangesArray) => {
    let string = timeRangesArray.reduce((acc, timeRange) => {
      acc += `${timeRange.start} => ${timeRange.end}, `;
      return acc;
    }, '');

    return string.substring(0, string.length - 2);
  };

  const buffered = videoElement.buffered;
  
  console.log(`Current Time: ${videoElement.currentTime}`);
  console.log(`Buffered: ${timeRangesString(timeRangesToArray(buffered))}`);
})();
```

Under normal playback conditions, the script will output something like the following:

```
Current Time: 40
Buffered: 37 => 47
```

However, in the event of a gap, you may see:

```
Current Time: 40
Buffered: 37 => 40, 41 => 47
```

In the above example there's a 1 second gap between times 40 and 41. The player stopped at time 40, and is most likely showing a buffering indicator. Sometimes the player will skip over small gaps, but if the gap is longer, or the player is not setup to skip gaps, then the player may remain stuck.

In addition, there can be a gap with only one range:

```
Current Time: 40
Buffered: 41 => 47
```

This is often the case if a seek resulted in the player choosing the wrong segment to download, or if the downloaded segment has a gap in audio or video at its start.

### Paused

If the player is paused, playback stops. While this may seem obvious, occasionally a plugin or script pauses a player at unexpected times. If the paused state isn't immediately obvious in the player UI, a ticket may be raised for playback stopping due to the video being paused. To check, you can use the `paused` attribute of the video element:

```javascript
(() => {
  // Here we're assuming there's one video element on the page, but
  // it would be better to use the specific player you want in place
  // of this assumption.
  const videoElement = document.getElementsByTagName('video')[0];

  console.log(`Paused: ${videoElement.paused}`);
})();
```

### Seeking

A plugin or the player may perform a seek even without user interaction. Its helpful when debugging to know if the player is currently in an unresolved seek, and there's a useful property on the video element to check for just that:

```javascript
(() => {
  // Here we're assuming there's one video element on the page, but
  // it would be better to use the specific player you want in place
  // of this assumption.
  const videoElement = document.getElementsByTagName('video')[0];

  console.log(`Seeking: ${videoElement.seeking}`);
})();
```

## Events

Looking at what [events](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#events) a player is firing can often provide insight into issues. Some events are especially helpful: stalls, seeks, and durationchanges.

The following is a script that listens for many of the most useful events on the video element, and logs when they're encountered:

```javascript
(() => {
  const events = [
    'canplay',
    'durationchange',
    'ended',
    'loadeddata',
    'loadedmetadata',
    'pause',
    'play',
    'playing',
    'progress',
    'ratechange',
    'seeked',
    'seeking',
    'stalled',
    'suspend',
    'waiting',
  ];
  // Here we're assuming there's one video element on the page, but
  // it would be better to use the specific player you want in place
  // of this assumption.
  const videoElement = document.getElementsByTagName('video')[0];

  events.forEach((event) => {
    videoElement.addEventListener(event, () => console.log(`${event} fired`));
  });
})();
```
