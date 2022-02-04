# Browser Issues

Browser playback engines are pretty robust. Most of the time, if the issue appears to be coming from the browser, it's a sign of an issue elsewhere. For instance, MEDIA\_ERR\_DECODE is often due to the video data itself, or appending content that the browser doesn't support.

However, it's still possible that an issue is going on within the browser. Getting more visibility can be a time consuming process. For open source browsers (e.g., Chromium and Firefox), you can compile them from source and enable more verbose logging within the media paths. Or you can modify the code and add in your own logging.

It's often more beneficial to verify the media itself (multiple times) before diving into a dev build of a browser.

One way to increase confidence that the browser caused the issue is to verify that it only happens in a single browser.

There are also a few browser behaviors and APIs that may be worth investigating.

## Background Tabs

When a tab is put into the background, some browsers will throttle event handlers. For live streams, this can disrupt manifest refreshes. With enough throttling (or short live windows) content can be missed, requiring a player to resync.

You can programmatically check whether a tab moves to the background using the [page visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API), e.g.:

```javscript
document.addEventListener('visibilitychange', () => console.log(
  `Tab moved to the ${document.hidden ? 'background' : 'foreground'}`));
```

## VideoPlaybackQuality API

Sometimes, the problem isn't the browser itself, but the hardware's ability to play the video. If there aren't enough resources to decode the video in time to keep up with playback, then frames may be dropped. The [VideoPlaybackQuality API](https://www.w3.org/TR/media-source/#VideoPlaybackQuality) provides frame metrics useful for tracking how well the browser is able to keep up with the appended content.

A few dropped frames in a long session of playback is generally a nonissue, but if the proportion of dropped frames to total frames starts climbing, then the current hardware resources may not be able to handle the content.

```javascript
(() => {
  const videoElement = document.getElementsByTagName('video')[0];
  const videoPlaybackQuality = videoElement.getVideoPlaybackQuality();
  const { droppedVideoFrames, totalVideoFrames } = videoPlaybackQuality;
  const percentDroppedFrames = 100 *
    (droppedVideoFrames / totalVideoFrames);

  console.log(`Percent of dropped frames: ${percentDroppedFrames.toFixed(2)}%`);
})()
```
