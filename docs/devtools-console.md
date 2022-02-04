# Console

The first devtools destination is the console.

The console contains thrown errors and useful logs when an identifiable problem has occurred. A good portion of any problems, video or not, can be solved by carefully reading messages logged in the console. If there's a stack trace with links to code line numbers, follow those. If there's a long log message, read it thoroughly.

Although many errors are self explanatory, it's often helpful to know the source of the error logs. There are three possible layers where those logs may be coming from: network, the video player, or the browser.

## Network
Network requests can be logged in the console when the option is set.

![Image of setting to log network requests](/img/log-network-requests.png)

Often the video player will trigger an error on its own when it encounters a 400 or 500 level HTTP status code. Regardless of where it comes from, if you see network request errors logged in the console, and it's for one of the media requests (manifests with HLS or DASH extensions, often .m3u8 and .mpd respectively, or media requests, e.g., .mp4, .ts, and .m4f), then media requests are a good place to start looking for the cause of the issue.

## The Video Player
This guide won't discuss player logs, because they're often specific to the player. Each has its own approach to logging. What's important is that if the player has a debug mode or offers different log levels, use all of those as primary means of debugging. Each log was written for a reason, and will contain helpful information in solving a problem.

## The Browser
Technically, the browser can be any of the media engine code written for the browser (e.g., the decoder, renderer, EME handler, etc.), but the errors are standardized. The errors often don't reveal much without further research, so here are some common ones and some of the possible reasons that they might be thrown.

The HTML living standard provides a list of media error codes, with short descriptions. These may be found at: https://html.spec.whatwg.org/multipage/media.html#error-codes

#### MEDIA\_ERR\_ABORTED and MEDIA\_ERR\_NETWORK
These errors are relatively straightforward, and their causes are often apparent in the [network panel](devtools-network).

#### MEDIA\_ERR\_DECODE
MEDIA\_ERR\_DECODE often occurs after playback has successfully been going for some time. Usually it's due to the content being malformed, or encoded in a way that the browser doesn't understand or expect.

Most of the time MEDIA\_ERR\_DECODE is a nightmare to figure out, as it encompasses a wide range of possible issues. This guide is largely inspired by it.

The best place to start is to check the [media panel](devtools-media). After that, try to find the segment that's causing it (if a specific segment is causing it), then [probe](segment-issues#ffprobe) that segment and compare it with probes of the segments appended immediately before it.

If there are no useful messages and the downloaded segments appear valid, see if the video player is modifying the segments in any way before appending them (e.g., transmuxing) and if you can, verify the player's output. You can use the tools in [segment issues](segment-issues) to verify that the appended segments are valid and as expected. Also check that init segments are appended when needed, and that none of the data was corrupted or changed in a way that broke the format/codec.

#### MEDIA\_ERR\_SRC\_NOT\_SUPPORTED
Whether or not you're using [MSE](https://www.w3.org/TR/media-source/), this error indicates one of three issues: a player dependent error (a player may trigger this error itself), the browser doesn't support the provided source(s), or the source doesn't match specified media format type.

For an example of the player throwing the error, [VHS](https://github.com/videojs/http-streaming), a playback engine for [Video.js](https://github.com/videojs/video.js), will throw this error if the manifest is unreachable:
![Image of 404 for manifest request](/img/network-404-manifest.png)

In the console:
![Image of console error](/img/network-404-manifest-console.png)

If you're not using MSE, check the `<source>` tag to verify that the `src` and `type` are as expected.

If you're using MSE, check the `mimeType` used when calling [addSourceBuffer](https://www.w3.org/TR/media-source/#dom-mediasource-addsourcebuffer) and verify that it matches the mime type of the player's appends.

One common case of this error is when trying to simulate a mobile device using Chrome's device-mode devtools. See the [limitations page](https://developer.chrome.com/docs/devtools/device-mode/#limitations) for details, but content which may play on mobile devices may not always play on desktop browsers, even with the simulation enabled.

If you still see issues after performing all of those checks, use some of the strategies for `MEDIA_ERR_DECODE`.

#### DRM/EME specific errors

In addition to the standard media errors, if you're handling DRM content, then EME may have additional errors. Those are addressed further in the [DRM section](drm).
