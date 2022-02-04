# What if you can't reproduce?

If you can't reproduce the issue, or you're struggling to reproduce it, then there are some strategies you can take to try to gather information on what might've happened. In addition, if you are able to do a little preliminary debugging using this info, it will help to create the exact conditions necessary to reproduce the issue.

## HAR

To debug any stream or network related issues, a HAR (HTTP Archive) file provides as much information as the [devtools network panel](devtools-network). Even better, it provides a permanent record of the web traffic that can be passed from anyone who can reproduce the issue to you.

Almost all browsers support saving the network traffic as a HAR file. See [this article](https://support.google.com/admanager/answer/10358597) for how to do it in Chrome.

Even without a browser that supports saving the network traffic, a HAR file may still be saved using proxy tools, such as the great [Charles Proxy](https://www.charlesproxy.com/). Charles also makes HAR files easy to read.

To see more on what HAR files enable you to do, see this [section on Charles Proxy and HAR files](charles-and-har-files).

## Forceful reproduction

Often, issues are easy to reproduce. But sometimes the conditions to reproduce an issue happen so rarely that hours can be spent doing monotonous tasks such as seeking or watching the same ad on repeat a hundred times in a row (even for ads you thought were entertaining the twentieth time...by the seventieth you start to rethink things).

When issues are hard to reproduce, try a strategy that might save your sanity. Here are some that are often successful.

### Proxying

Charles Proxy is so useful it earned its own [special section along with HAR files](charles-and-har-files) to describe how it can be used to proxy in reproducing issues and testing fixes.

### Writing scripts

If you're spending hours trying to reproduce an issue, let the computer do the work for you. Since just about all UI elements for a video player can be accessed programmatically, any user actions can be done via a script.

Here are some examples:

#### Seek until stuck in seeking

Sometimes a seek never completes. In this case, the player's state will be stuck `seeking`. This script will seek until the player is stuck in that state, so you can go off and do whatever you want instead of clicking the progress bar over and over.

```javascript
(() => {
  // Here we're assuming there's one video element on the page, but
  // it would be better to use the specific player you want in place
  // of this assumption.
  const videoElement = document.getElementsByTagName('video')[0];

  // 5 seconds is a good place to start as a normal
  // interval. Too short of an interval wouldn't be
  // very normal behavior, as it might be short
  // enough that the content wouldn't be downloaded
  // and processed enough to play before the next
  // seek.
  //
  // A more advanced script can use the player buffer
  // and current time to check, but this quick script
  // should handle most cases.
  const SEEK_INTERVAL = 5000;
  let seekCount = 1;
  const interval = setInterval(() => {
    // The case we're looking for.
    if (videoElement.seeking) {
      clearInterval(interval);
      return;
    }

    // Sometimes a seek ends up within 5 seconds of
    // the end of a video. If the video ends, have
    // it automatically restart.
    if (videoElement.ended) {
      videoElement.play();
    }

    // Seek to somewhere within the lenght of the
    // video. If this is a live stream, use the
    // seekable range instead of the duration.
    const seekTo = Math.random() * videoElement.duration;

    console.log(`Seek #${seekCount} to: ${seekTo}`);

    seekCount++;
    videoElement.currentTime = seekTo;
  }, SEEK_INTERVAL);
})();
```

:::tip Try it yourself

Open a page with a video element on it (such as [the VHS test page](https://videojs-http-streaming.netlify.app/)) and run the script above in your console.
:::

#### Pause and log when there's a gap in the buffer

Gaps in the buffer are often the cause of issues in video playback. Sometimes the player will stop, and sometimes the player will have logic to skip over gaps (in addition, the underlying browser's media player may skip small gaps).

To debug gap-related issues, it's sometimes necessary to pause the player as soon as one occurs, to prevent the state of the player from changing.

To pause at a gap, the simple approach is to look for when the player has more than one buffered time range, since buffered should only ever have one time range when there are no gaps[^1].

As for how frequently to check, the optimal approach is to listen for a specific video player event which triggers when a video content append finishes. Alternatively, the browser's video element may trigger a `waiting` event when it encounters a temporary lack of data. But another easy approach that's useful for debugging is to set an interval and hope for the best. It'll handle a good number of cases.

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

  // The check is pretty cheap, so running it every 100ms isn't going
  // to degrade performance enough to alter the behavior of the player,
  // at least during a debugging session.
  const CHECK_INTERVAL = 100;
  const interval = setInterval(() => {
    const buffered = videoElement.buffered;

    if (buffered.length > 1) {
      videoElement.pause();
      clearInterval(interval);
      console.log('Found a gap in the buffer');
      // Log the buffer in an easily readable way
      console.log(timeRangesString(timeRangesToArray(buffered)));
      return;
    }
  }, CHECK_INTERVAL);
})();
```

[^1]: There may be more than one time range if a user seeks and the player doesn't clear the old buffer contents, but most players will clear out any buffer not in the immediate vicinity of the playhead.
