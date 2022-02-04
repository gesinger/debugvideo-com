# DRM

Now it's time for everyone's favorite topic, digital rights management.

DRM for web video is handled through the [EME (encrypted media extensions) API](https://www.w3.org/TR/encrypted-media/).

The purpose of DRM is to make debugging difficult (this is only partially true). That said, there do exist some tools and strategies you can use to help diagnose some common issues.

Most DRM-related problems can be broken down into one of three categories:
* **No playback (audio or video)**
* **Playback of audio but no video**
* **Playback stops**

## Quick intro to EME in web players

EME provides the APIs needed to allow a browser to decrypt encrypted video. But to do that, it needs to be properly configured. If you're using a custom player, they generally have easy options (or plugins with options) to configure EME, so all you need is to:

1. List the different key systems that the content supports (e.g., Widevine and Playready)
2. For each key system, provide a license URL for retrieving a key

The license is provided to the browser, which, under the surface, uses it with a CDM (content decryption module) to decrypt the content.

## No playback (audio or video)

The most common issue you'll run into is no playback.

Often it's because the key system options are not provided to the player, or are not provided in a way the player expects. If the player uses a plugin for handling DRM/EME, then verify that the plugin is included, and that it's initialized.

Certain key systems only work on certain browsers, so make sure that the key system you're trying to use is supported.

If you know that the options are configured correctly, and you're dealing with content that is encrypted with multiple key systems (e.g., Widevine and Playready), then try one of the other key systems (you may need to use a different browser).

Check the [devtools network panel](devtools-network) to see if any license requests failed. Check also that license requests were made. If no license requests were made, then either the EME options aren't provided correctly to the player, the EME plugin/system is not initialized, the content is not encrypted, or something failed before a key session requested a license.

Some manifests internally signal their encryption and necessary decryption information. Check for DASH's `ContentProtection` elements and HLS's [EXT-X-KEY tags](https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-10#section-4.4.4.4).

One way to check if the content is encrypted is to hook into the EME events on the video element. For browsers using the modern EME API, check for the [encrypted](https://www.w3.org/TR/encrypted-media/#dom-htmlmediaelement-onencrypted) event. Other EME events may be triggered on session objects created as part of the [EME workflow](https://www.w3.org/TR/encrypted-media/#examples).

```javascript
// Here we're assuming there's one video element on the page, but
// it would be better to use the specific player you want in place
// of this assumption.
const videoElement = document.getElementsByTagName('video')[0];

videoElement.addEventListener('encrypted', () => console.log('"encrypted" event fired'));
```
## Playback of audio but no video

If only audio plays back, a common issue is that the content is encrypted such that it's not allowed to be played on external monitors (or only on specific external monitors). See also [HDCP](https://en.wikipedia.org/wiki/High-bandwidth_Digital_Content_Protection).

## Playback stops

### After a few seconds

It's possible for some encrypted content to play the first few seconds before stopping when no license is provided. In this case, verify that the license is successfully retrieved and working (see the section on [no playback](#no-playback-audio-or-video) above).

### After more than a few seconds

#### Key rotation

Generally, if a key expires, the player and EME implementation should handle retrieving a new usable key from the given license server (provided via the key system options). If there's an issue with the server's response, or if the player is not requesting a new key, verify that the [waitingforkey](https://www.w3.org/TR/encrypted-media/#dom-htmlmediaelement-onwaitingforkey) event is fired, and that a new license request is made in the [devtools network panel](devtools-network).

To listen for the `waitingforkey` event:

```javascript
// Here we're assuming there's one video element on the page, but
// it would be better to use the specific player you want in place
// of this assumption.
const videoElement = document.getElementsByTagName('video')[0];

videoElement.addEventListener('waitingforkey', () => console.log('"waitingforkey" event fired'));
```

#### Unencrypted content to encrypted

Some browsers require EME to be configured at the start of video playback, even if the video starts with content that is unencrypted (e.g., playing an unencrypted ad before encrypted content). If EME is not configured, when the player reaches the encrypted content, the browser may throw an error.

To resolve this issue, make sure that the key session in being created at the start of playback, before any content is appended.

## Creating test DRM content

Without proper credentials for various key systems, it's nearly impossible to create test content. However, there is one key system that must be supported by all browsers and is easier to create content for, [Clear Key](https://www.w3.org/TR/encrypted-media/#clear-key).

One great tool for creating test content using Clear Key is [Shaka Packager](https://github.com/google/shaka-packager). For a script that wraps Shaka Packager with a shortened list of options, there's [encrypted video creator](https://github.com/gesinger/encrypted-video-creator).
