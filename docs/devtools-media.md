# Media

The media panel is a Chrome devtools specific panel that defaults to hidden. It can be enabled following [this guide](https://developer.chrome.com/docs/devtools/media-panel/), or using the image below.

![Image of enabling devtools Media panel in Chrome](/img/enable-devtools-media.png)

Once you've selected the player you want to examine from the list of available players in the media panel, you will find the following tabs: Properties, Events, Messages, and Timeline.

![Image of devtools Media panel tabs](/img/devtools-media-tabs.png)

Of these, Messages is often the most useful. If your player encounters [MEDIA\_ERR\_DECODE](devtools-console#media_err_decode), then you can sometimes find the cause of the error just above where the error is logged. For instance, after scrambling some of the video data in an MP4, you might see:

![Image of devtools Media panel with error message](/img/devtools-media-error.png)

As a practical matter, there are often many messages that are relatively frequent, and do not necessarily indicate a critical issue (i.e., playback failure). For instance, audio splice trimming, e.g.:

```
Skipping audio splice trimming at PTS=1117390612us.
Found only 44us of overlap, need at least 1000us.
Multiple occurrences may result in loss of A/V sync.
```

These messages are useful, in particular if you've seen, as the message says, a loss of audio and video sync, but often these are handled without issue, and are not prone to triggering errors.

The media panel used to only be accessible via chrome://media-internals. That is still available, though the media panel is often more convenient for finding players within a specific tab.
