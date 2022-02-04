# Network

When the console doesn't provide enough information to solve a problem alone, the next step is to check the network panel to ensure that the video stream is reachable and valid.

Before we check all of the requests though, we must counter the modern web's tendancy towards spamming hundreds of requests. And this is where filters become handy.

## Filters

Most of the time, a simple filter will work. If you are looking for HLS manifests, filter by "m3u8." If you are looking for DASH manifests, filter by "mpd." If you want to see segments, figure out what [container format](https://en.wikipedia.org/wiki/Comparison_of_video_container_formats) you're looking for and filter by that (often .ts and .mp4/.m4f).

## Make sure the video stream is reachable

If you see any relevant manifest or media requests that have failed (highlighted red, or with a 400 or 500 range [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes), then it's possible the stream is not reachable, and that is the source of the issue.

For instance, from the [previous example](devtools-console#media_err_src_not_supported), where the console shows a MEDIA\_ERR\_SRC\_NOT\_SUPPORTED error, the network tab revealed the following:

![Image of 404 for manifest request](/img/network-404-manifest.png)

Be careful making the assumption that a failed request is the cause of failed playback. It's possible that only one rendition failed, and other renditions are fine. Often though, failed requests will come with a log in the console from the video player (unless us video player devs forgot to put one there...).

## Make sure the video stream is valid

If the manifest(s) and media files are reachable, then it's good to perform some high level manifest validity checks.

There's a lot to cover on this subject, so check out the [stream issues section](stream-issues) for a list of checks.

## Using the network panel for reproducing an issue

### Throttling

When a problem only occurs in low bandwidth environments and your dev computer is hardwired to a gigabit connection, throttle your connection through the network tab.

### Disable cache

For all those times when the cache is making things faster, but also not providing updated responses.

### Custom user agent

Although [feature detection](https://en.wikipedia.org/wiki/Feature_detection_(web_development)) is used instead of [user agent sniffing](https://en.wikipedia.org/wiki/User_agent#User_agent_sniffing) for most browser-based video players, if you need to spoof the user agent to get around specific logic, it's available.
