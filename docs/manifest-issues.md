# Manifest Issues

## Automatic Stream Validators

Besides playing a stream in another player, tools exist to check for common issues with HLS and DASH streams.

These don't validate everything, but are often a good quick check to see if anything stands out.

### HLS

Apple provides their own HLS validator through the command line tool `mediastreamvalidator`. Details on it can be found at https://developer.apple.com/documentation/http_live_streaming/about_apple_s_http_live_streaming_tools

To use it, run it on the command line along with the manifest URL:

```bash
mediastreamvalidator https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8
```

### DASH

The DASH-IF provides a handy [DASH Conformance Tool](https://conformance.dashif.org/) online that saves a lot of time reading XML (thank you DASH-IF).

## Human Powered Stream Validators

Once you get used to reading HLS and DASH manifests (though can anyone truly be *happy* reading XML), some issues stand out rather quickly, even without validation tools. The following are some notable issues that have occurred in streams:

### Common HLS Manifest Issues

#### No segments

This one's easy, but if there are no segments, there's nothing to play.

This case may happen when a stream provider makes a manifest available for a live stream before the stream starts, and doesn't include any filler content. Alternatively, it may happen at the end of a live stream if the stream provider removes all segments from the manifest.

#### A live stream that isn't updating

If a manifest has been refreshed multiple times and no new segments are added, then it's likely the player will complain, as there'll be nothing to play.

This is common for live streams which have ended, where the stream provider is supposed to add an `EXT-X-ENDLIST` tag:

> If the Media Playlist contains the final Media Segment of the presentation, then the Playlist file MUST contain the EXT-X-ENDLIST tag; this allows clients to minimize unproductive Playlist reloads.
[HTTP Live Streaming 2nd Edition - Section 6.2.1](https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-10#section-6.2.1)

Stream providers don't always do this, leading to player timeouts or other issues.

#### Alternate renditions with synchronization issues

One of the keys to adaptive bitrate streaming is having multiple renditions with different bitrates. This is all well and good, so long as the renditions are kept in sync. If they aren't, then the player might not know how to line up content, leading to playback issues.

In live HLS media playlists, two numbers are key to syncing different renditions: [EXT-X-DISCONTINUITY-SEQUENCE](https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-10#section-4.4.3.3) and [EXT-X-MEDIA-SEQUENCE](https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-10#section-4.4.3.2).

##### Media Sequence Misalignment

:::info Media Sequence
`EXT-X-MEDIA-SEQUENCE` represents the segment number of the first segment in a playlist. Whenever segments are removed from live playlists, `EXT-X-MEDIA-SEQUENCE` will increment by the number of removed segments. For instance, if you start with a live stream that has the following segments:

```
#EXTM3U
#EXT-X-TARGETDURATION:10
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-DISCONTINUITY-SEQUENCE:0
#EXT-X-MAP:URI="init-segment.mp4"
#EXTINF:10
segment0.mp4
#EXTINF:10
segment1.mp4
#EXTINF:10
segment2.mp4
#EXTINF:10
segment3.mp4
#EXTINF:10
segment4.mp4
#EXTINF:10
segment5.mp4
```

and on a refresh two segments are removed:

```
#EXTM3U
#EXT-X-TARGETDURATION:10
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:2
#EXT-X-DISCONTINUITY-SEQUENCE:0
#EXT-X-MAP:URI="init-segment.mp4"
#EXTINF:10
segment2.mp4
#EXTINF:10
segment3.mp4
#EXTINF:10
segment4.mp4
#EXTINF:10
segment5.mp4
```

Then `EXT-X-MEDIA-SEQUENCE` value is incremented by 2.
:::

`EXT-X-MEDIA-SEQUENCE` doesn't have to match between media playlists:

> A client MUST NOT assume that segments with the same Media Sequence Number in different Media Playlists contain matching content
[HTTP Live Streaming 2nd Edition - Section 4.4.3.2](https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-10#section-4.4.3.2)

Although they don't have to match up precisely, if you do notice that the media playlists generally have similar timing values, it's worth checking the [content itself](segment-issues#ffprobe) to see that the media timing values line up.

##### Discontinuity Sequence Misalignment

:::info Discontinuity Sequence
`EXT-X-DISCONTINUITY-SEQUENCE` represents the number of `EXT-X-DISCONTINUITY` tags that have "fallen off" the playlist since the start of the stream. For instance, if you start with a live stream that has the following segments:

```
#EXTM3U
#EXT-X-TARGETDURATION:10
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-DISCONTINUITY-SEQUENCE:0
#EXT-X-MAP:URI="init-segment.mp4"
#EXTINF:10
segment0.mp4
#EXT-X-DISCONTINUITY
#EXT-X-MAP:URI="new-init-segment.mp4"
#EXTINF:10
segment1.mp4
#EXTINF:10
segment2.mp4
#EXTINF:10
segment3.mp4
#EXTINF:10
segment4.mp4
#EXTINF:10
segment5.mp4
```

and on a refresh two segments are removed, including the discontinuity:

```
#EXTM3U
#EXT-X-TARGETDURATION:10
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:2
#EXT-X-DISCONTINUITY-SEQUENCE:1
#EXT-X-MAP:URI="init-segment.mp4"
#EXTINF:10
segment2.mp4
#EXTINF:10
segment3.mp4
#EXTINF:10
segment4.mp4
#EXTINF:10
segment5.mp4
```

Then `EXT-X-DISCONTINUITY-SEQUENCE` value is incremented by 1.
:::

Most of the time, sync issues between media playlists are caused by mismatching `EXT-X-DISCONTINUITY-SEQUENCE` values.

If a player is playing a live playlist, and it's trying to switch between different playlists (e.g., from a 360p rendition to a 720p rendition), it needs to know what timestamp offset to use. In order to determine the timestamp offset, it needs to know the discontinuity sequence value.

The number of `EXT-X-DISCONTINUITY` tags in each rendition must match. Therefore, the `EXT-X-DISCONTINUITY-SEQUENCE` must match. Note though that since segments in different renditions may have different durations, they may not line up on segments with similar names. Instead, the match must be whenever the stream reaches discontinuous content.

In most cases, this value loses sync when an encoder for one rendition on the server side goes down, and it adds an `EXT-X-DISCONTINUITY` to its manifest to compensate for the down time. If this value isn't added in other media playlists though, the media stream is invalid, as the client has no way of knowing where to position the media. This should be addressed on the server side (the stream provider), as `EXT-X-DISCONTINUITY-SEQUENCE` MUST be kept in sync between renditions.

Once you're used to looking for discontinuity sync issues between playlists, they are easy to spot.

#### Short live windows

The HLS specification requires a minimum of 3 target durations worth of content in a live stream:

> The server MUST NOT remove a Media Segment from a Playlist file without an EXT-X-ENDLIST tag if that would produce a Playlist whose duration is less than three times the Target Duration. Doing so can trigger playback stalls.
[HTTP Live Streaming 2nd Edition - Section 6.2.2](https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-10#section-6.2.2)

The following manifest is illegal:

```
#EXTM3U
#EXT-X-TARGETDURATION:10
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-DISCONTINUITY-SEQUENCE:0
#EXT-X-MAP:URI="init-segment.mp4"
#EXTINF:10
segment0.mp4
#EXTINF:10
segment1.mp4
#EXTINF:9
segment2.mp4
```

The `EXT-X-TARGETDURATION` is 10 seconds. There are 3 segments with a total of 29 seconds. This is less than the required 30 seconds the spec requires.

However, it's common for stream providers to only include 3 segments in their live stream, whether or not they meet the minimum requirement. In addition, even if the stream provider includes four segments, or however many is necessary to ensure it always provides 3 times the target duration, video players may still struggle to play the video without stalls. This is why the [HLS Authoring Specification for Apple Devices](https://developer.apple.com/documentation/http_live_streaming/hls_authoring_specification_for_apple_devices) requires at least 6 segments

> 8.11. You MUST provide at least six segments in a live/linear playlist.

If media playlists don't include enough segments in a live window, depending on the robustness of the player and network, there may be issues with playback in the form of stalled playback, skipped content, and other errors.

#### Segment durations exceed the target duration

> The EXT-X-TARGETDURATION tag specifies the Target Duration, an upper bound on the duration of all Media Segments in the Playlist. The EXTINF duration of each Media Segment in a Playlist file, when rounded to the nearest integer, MUST be less than or equal to the Target Duration. Longer segments can trigger playback stalls or other errors. It applies to the entire Playlist file.
[HTTP Live Streaming 2nd Edition - Section 4.4.3.1](https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-10#section-4.4.3.1)

If any segment broadcasts an `EXTINF` duration that exceeds the `EXT-X-TARGETDURATION`, then it's possible the player will have issues with playback. These issues are exacerbated in live streams.

If you save the manifest as a string, here's a function which compares the `EXTINF` durations to the `EXT-X-TARGETDURATION` to find invalid segments:

```javascript
const checkForInvalidSegmentDurations = (manifestString) => {
  const TARGETDURATION_TAG = '#EXT-X-TARGETDURATION:';
  const EXTINF_TAG = '#EXTINF:';

  const manifestArray = manifestString.split('\n');
  const targetDurationLine = manifestArray.find(
    (line) => line.startsWith(TARGETDURATION_TAG));
  const targetDuration = Number.parseFloat(
    targetDurationLine.substring(TARGETDURATION_TAG.length));
  const invalidDurations = manifestArray.reduce((acc, line) => {
    if (!line.startsWith(EXTINF_TAG)) {
       return acc;
    }

    const duration = Number.parseFloat(line.substring(EXTINF_TAG.length));

    if (Math.round(duration) > targetDuration) {
      acc.push(
        `Found duration of ${duration}s, which, when rounded, exceeds target duration`);
    }

    return acc;
  }, []);

  if (invalidDurations.length) {
    console.log(invalidDurations.join('\n'));
  } else {
    console.log('Found no invalid durations');
  }
};
```

:::tip Try it yourself
Run `checkForInvalidSegmentDurations` on an HLS manifest. Try changing some of the durations in the manifest string and see if you can get it to report invalid durations.
:::

### Common DASH Manifest Issues

Often, issues with well formatted DASH manifests involve live manifests refreshes.

#### Changing period start times on refreshes

:::info Periods
Periods in DASH accomplish the same task as discontinuities in HLS.
:::

In a DASH manifest, a Period can have `id` and `start` attributes. `Period@id` helps identify Periods between manifest refreshes. `Period@start` provides an anchor point for media segments within the period.

Prior to the 2019 DASH specification, `Period@id` was an optional attribute for `dynamic` (live) playlists. `Period@id` is mentioned because, without it, the only way to sync Periods on refreshes was to use `Period@start`, and that value could change. There was an [issue](https://github.com/Dash-Industry-Forum/DASH-IF-IOP/issues/160) in the [DASH-IF Interoperability Points](https://github.com/Dash-Industry-Forum/DASH-IF-IOP) regarding the topic of changing `Period@start` times over MPD updates, and as of v4.1.2 of the IOP, section 4.4.3.3 states:

> MPD@availabilityStartTime and `Period@start` shall not be changed over MPD updates.

If the MPD is following the latest DASH spec, then `Period@id` can be used to match Periods between playlists. If not, but the MPD is following the latest DASH-IF IOP, then `Period@start` can be used. If neither of those are being followed, and you notice that there's no `Period@id` and the `Period@start` values change, then it's likely that DASH players may run into issues.

#### Changing Segment URLs

Technically, there's no mention in the DASH specification that segment URLs can't change for live manifests on refreshes. Although most players should be able to handle this, it's possible that that's causing issues. It's not too common, and often the changes are minor (e.g., adding a query param), but it's worth checking.
