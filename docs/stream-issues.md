# Stream Issues

This guide is limited to HLS and DASH, but many of the topics are applicable to any streaming implementation.

Outside of HTTP request failures, where more debugging details can be found in the [network devtools section](devtools-network), stream issues can be broken down into two categories: [manifest](manifest-issues) and [segment](segment-issues). Before that though, it's often valuable to try to play the same stream in other players.

## Checking other players

Grab the source of the player and drop it into another player. If the stream is DRM protected, make sure to grab the DRM player config and map it to the new player's config. The configs are often player specific, but if you're looking for them, good search terms are DRM and EME (encrypted media extensions). See [the DRM section](drm) for more details.

For HLS, one easy player to try is Safari's native player. If an HLS stream fails to play using a custom player, try grabbing the source m3u8 URL and playing it directly in Safari (you can put an m3u8 URL directly in Safari's URL bar). The native Safari HLS playback engine is very robust. If it plays in Safari, the issue is likely within the player. _Caution_ must be taken though, as some players may have error handling logic for streams which don't precisely follow the HLS specification. This includes Safari's native player.
