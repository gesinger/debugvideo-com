# A short guide to streaming video

There are already many great resources describing how streaming video works:

* [HowVideo.works](https://howvideo.works/)
* [Digital Video Introduction](https://github.com/leandromoreira/digital_video_introduction)
* [awesome.video](https://awesome.video/)

Because there are never enough, here's a quick introduction that should cover most topics needed to understand this guide.

Note that some of the topics are greatly simplified. For more technical discussions, please refer to some of the other excellent resources above.

## Video Files

A video file is a long stream of bits. There are two sections[^1]:

1. Metadata - bits that describe the file
2. Video data - bits that are the actual content

![Image of video file metadata and video data](/img/video-file.svg)

When you open a video file on your computer, the video player parses the file to read the metadata and all of the video data.

## Why use streaming video?

To play a video file in a browser, you can use the [HTML video element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video).

```html
<video>
  <source src="some-video.mp4" type="video/mp4">
</video>
```

The browser will download `some-video.mp4` and play it.

This leads to a few problems:

1. **Wasted bandwidth**

Let's say a 1 minute MP4 file you have is over 100 MB. With an MP4 source in the `<video>` tag, the browser will try to download the entire video, whether you watch it all or not. If you pause the video, it will continue to buffer the entire MP4. This wastes bandwidth.

2. **No support for live streams**

With a single MP4 source, there's no good way of handling live streams. If you try to continually append to an MP4, the browser is going to try to download the entire live stream, from the beginning to the end. For 24/7 live streams, this means that users will most likely never reach the most live portion of the stream. And if the browser did manage to catch up, as soon as it reached the current end of the MP4 the browser would stop downloading content.

3. **No support for different renditions**

In the case of `some-video.mp4` above, the content is 1080p. If a user is connected to 3G, they may not get to watch any of the video because the download is too slow. It would be better if they could download a 360p rendition instead.

4. **No support for mixing content from different videos**

If a stream provider wants to insert an ad into the middle of the stream, there's no way to point to a different video in the middle of `some-video.mp4` without encoding the ad into `some-video.mp4`.

Streaming video aims to solve these issues by providing ways to:

1. Cut a video file into smaller files.
2. Add new content for live streams.
3. Point to multiple renditions.
4. Mix content from different video files.

## How does streaming video work?

### Cutting up a video file

Here's the image from earlier of `some-video.mp4`:

![Image of video file metadata and video data](/img/video-file.svg)

The video file is divided into two sections: metadata and video data.

First, let's cut out the metadata.

![Image of video file metadata cut from video data](/img/video-file-metadata-cut.svg)

Next, let's cut the video data into smaller portions (each portion being a file).

![Image of segmented video file](/img/video-file-segmented.svg)

These portions are called segments, fragments, sections, or chunks. Different streaming protocols use different terms, but they're all essentially the same thing. For this guide we'll refer to them as segments.

The metadata segment is called an init (initialization) segment.

The data segments are called media segments, and are often referred to simply as segments.

Say each segment represents 10 seconds of video data. Now, if a user seeks to 30 seconds in the video, the first 3 segments can be skipped, and less bandwidth is used.

### Requesting portions of the video

But how does the HTML `<video>` tag know about multiple segments and what portions of content they represent?

Here's where streaming media protocols come in. The two most popular are HLS and DASH.

HLS starts with a .m3u8 file that has a series of lines, some with special tags. The specification is relatively small and easy to read. It can be found at https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-10 

DASH starts with a .mpd file that is in XML format. The specification is large and can be found at https://standards.iso.org/ittf/PubliclyAvailableStandards/index.html (look for ISO/IEC 23009-1:2019 -  Information technology — Dynamic adaptive streaming over HTTP (DASH) — Part 1: Media presentation description and segment formats).

Whether using HLS or DASH, those files, the .m3u8 and .mpd files, are called manifests.

Because HLS manifests are often easier to read, let's put the cut up video from before into an HLS Media Playlist called `media-1080.m3u8`:

```
#EXTM3U
#EXT-X-TARGETDURATION:10
#EXT-X-VERSION:3
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
#EXT-X-ENDLIST
```

The `EXT-X-MAP` tag points to the init segment (containing the metadata for the video) and then each of the video data segments follow, with their duration preceding their URLs.

:::info Init Segments
Note that you will not always see init segments. If they're not included, it means that segments are "self initializing," meaning they have the metadata included in the segment.
:::

`media-1080.m3u8` provides an easy way for a player to see how a video file is broken into segments. Now, instead of a player having to request an entire video file to play content starting from 30 seconds, it can skip over `segment0.mp4`, `segment1.mp4`, and `segment2.mp4` and start downloading from `segment3.mp4`.

For browser that support HLS (.m3u8 files) and DASH (.mpd files) natively, you can drop them into a `<video>` tag and everything should work:

```
<video>
  <source src="media-1080.m3u8" type="application/x-mpegURL">
</video>
```

By using a media playlist, we've (largely) solved the **wasted bandwidth** problem.

### Live streams

But what about live streams? Well, the `#EXT-X-ENDLIST` tag at the end of `media-1080.m3u8` marks the stream as VOD (video on demand, meaning the entire video is known at start and has a fixed duration). If you remove the `#EXT-X-ENDLIST` tag from `media-1080.m3u8` then the stream becomes live. This means that the player will periodically re-request `media-1080.m3u8` from the server (in the case of `media-1080.m3u8`, about every 10 seconds), and check for new segments.

So if a user starts playing the stream and it shows:

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
This is the same `media-1080.m3u8` with the `EXT-X-ENDLIST` tag removed. 

:::info Note on Media Sequence and Discontinuity Sequence
You may have noticed that two extra tags were added:

```
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-DISCONTINUITY-SEQUENCE:0
```

These will be discussed [later in this guide](manifest-issues#alternate-renditions-with-synchronization-issues), but in short, these two numbers help maintain sync between different renditions and manifest refreshes.
:::

Ten seconds later, the player requests `media-1080.m3u8` and it shows:

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
#EXTINF:10
segment6.mp4
```

`segment6.mp4` was added and represents 10 seconds of new content. That's it. Live streams are supported.

### Different renditions

`media-1080.m3u8` provides a way for us to save bandwidth by seeking in a video without downloading the entire stream. It also allows us to add content to make a live stream. But it's still only one rendition, 1080p. 

If a user is watching a video on their phone, walks out of the house, lost WIFI, and is now on 3G, we still want playback to continue. If 3G can't support a 1080p rendition then the player should switch to a 360p rendition without any playback interruption.

We need a 360p video file split into segments, and a `media-360.m3u8` manifest:

```
#EXTM3U
#EXT-X-TARGETDURATION:10
#EXT-X-VERSION:3
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
#EXT-X-ENDLIST
```

Note that the manifest looks exactly the same as `media-1080.m3u8`, the key is it exists at a different URL. If `media-1080.m3u8` exists at http://example.com/media-1080.m3u8, then `media-360.m3u8` may exist at http://example.com/media-360.m3u8. But how does the `<video>` tag know about this other rendition?

DASH uses one manifest for a stream, and will list all renditions in a single .mpd file. HLS uses one manifest to list renditions, and different manifests for each rendition. In the HLS spec the manifest which lists other manifests is referred to as a "multivariant playlist," where variant is another term for rendition. In the community you may often hear the term "main manifest" to mean a multivariant playlist. The rendition manifests are referred to in the spec as "media playlists." This sounds complicated, but let's write a multivariant playlist and put it on our server as http://example.com/multivariant.m3u8:

```
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=1280000
http://example.com/media-360.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2560000,AVERAGE-BANDWIDTH=2000000
http://example.com/media-1080.m3u8
```

Now, when setting up the `<video>` tag, instead of pointing to `media-1080.m3u8`, point to `multivariant.m3u8`:

```
<video>
  <source src="http://example.com/multivariant.m3u8" type="application/x-mpegURL">
</video>
```

Now, if the player sees changes in the user's bandwidth, it can switch between `media-360` and `media-1080.m3u8`.

With multiple renditions supported, the only thing left is to handle mixing content from different videos.

### Mixing Content

Let's say you're running a 24/7 live stream, and every 30 seconds you want to run the same 10 second ad. To do this, you need to somehow insert that ad into the media playlist. But you have a problem. Video files have timestamps, so, looking at our sample live stream from above:

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

We know that segment0.mp4 runs from times 0 seconds to 10 seconds, and segment1.mp4 runs from times 10 seconds to 20 seconds, and so on. Not only is it written in the manifest as such, but the media files themselves (segment0.mp4 and segment1.mp4) have times embedded into them. If you insert `ad-segment0.ts` after `segment2.ts` expecting it to play from time 30 seconds to 40 seconds in the stream, you'll end up with a problem:


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
ad-segment0.mp4
#EXTINF:10
segment3.mp4
#EXTINF:10
segment4.mp4
#EXTINF:10
segment5.mp4
```

The problem is that `ad-segment0.mp4`'s media times will report 0 seconds to 10 seconds, the same as `segment0.mp4`, so the ad segment will overwrite `segment0.ts`'s content in the buffer, and won't play at the time expected.

Streaming media provides a way for us to insert content from different sources, with different timing, into the same stream. In HLS it's called a "discontinuity" (since the content is discontinuous). In DASH you'll see the same feature as different "Periods."

What these discontinuities do is tell the player that the content is from a different source, and the times in the segments should be adjusted. To insert `ad-segment0.mp4` into the stream in a way that will position the ad starting at time 30 seconds, the manifest should be modified to:

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
#EXT-X-DISCONTINUITY
#EXT-X-MAP:URI="ad-init-segment.mp4"
#EXTINF:10
ad-segment0.mp4
#EXT-X-DISCONTINUITY
#EXT-X-MAP:URI="init-segment.mp4"
#EXTINF:10
segment3.mp4
#EXTINF:10
segment4.mp4
#EXTINF:10
segment5.mp4
```

When the player reaches an `EXT-X-DISCONTINUITY` tag, it knows to adjust the times of the following segments so that the content follows what came before in the manifest. This timestamp adjustment is called a "timestamp offset." In this case, ad-segment0.mp4, which has a media start time of 0 seconds, will be adjusted by 30 seconds, so all timestamps in the segment will have 30 seconds added to them.

Note also that different content will generally have different metadata, so `EXT-X-MAP` tags for the init segments are required before discontinuous content.

## Video Tag and Media Source Extensions

For the examples above, we've put HLS sources directly into `<video>` tags, e.g.:

```
<video>
  <source src="http://example.com/multivariant.m3u8" type="application/x-mpegURL">
</video>
```

Some browsers support this (e.g., Safari natively supports HLS). But what if the browser doesn't support that type (in this case HLS)?

Here's where MSE ([Media Source Extensions](https://www.w3.org/TR/media-source/)) becomes a great tool. MSE provides a way for developers to append segments of video to a `<video>` tag instead of providing a `<source>` directly.

Browser-based video players generally use the MSE APIs to handle source types that the browser doesn't natively support. For instance, since Chrome doesn't natively support HLS, the following are a few players you can use to support playback of HLS in Chrome:

* [Video.js](https://github.com/videojs/video.js)
* [hls.js](https://github.com/video-dev/hls.js)
* [Shaka Player](https://github.com/google/shaka-player)

To use MSE, the player will create one [MediaSource object](https://www.w3.org/TR/media-source/#mediasource), which you can read as a source of media data, and use that as the source of the `<video>` element:

```javascript
const mediaSource = new MediaSource();
// videoElement is the <video> tag object
const videoElement.src = URL.createObjectURL(mediaSource);
```

Once the mediaSource object is ready, [SourceBuffer objects](https://www.w3.org/TR/media-source/#sourcebuffer) can be added:

```javascript
const audioBuffer = mediaSource.addSourceBuffer('audio/mp4; codecs="mp4a.40.2"');
const videoBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.4d400d"');
```

Now that audio and video buffers have been created, MP4 segments can be appended to them:

```javascript
// Here segmentData is an ArrayBuffer of an MP4 segment, say segment0.mp4 from the examples
videoBuffer.appendBuffer(segmentData).
```

The APIs are a bit more involved, but those are the basics. Once an append of `segment0.mp4` completes, the `<video>` element will have 10 seconds of buffered content (from 0 seconds to 10 seconds).

Note that different browsers support different MIME types. If the browser doesn't support the MIME type when creating the buffer, a [NotSupportedError](https://webidl.spec.whatwg.org/#notsupportederror) will be thrown.

Note also that different container formats are supported by different browsers.

## Container Formats

For the guide thus far, we've been using MP4 files. But there are also other file types. The most common you will see in streaming media are MP4 and TS.

[Container formats](https://en.wikipedia.org/wiki/Container_format_(computing)) provide a way of wrapping media data with metadata into a single file. In the examples above, we split a video file into metadata and video data. But what if there's also audio data? And what if there are captions too? Container formats provide well defined ways of combining different streams together, and describing them (via metadata), to make the files easy for players (and us) to read and understand.

For more detailed discussions of container formats, please see some of the links to at the top of this page, but for a very quick introduction to the primary ones, MP4 and TS, here's a very high level overview of what they are.

### MP4

MP4 files are very easy to read. They're composed of a sequential list of boxes (which used to be called atoms). Each box has 3 sections: 4 bytes describing the length of the box (in bytes), 4 bytes describing the type of box, then the box contents. For browser-based media streaming, you can refer to the [ISO BMFF MSE bytestream format specification](https://www.w3.org/TR/mse-byte-stream-format-isobmff/) for a listing of the boxes that MSE expects, and the ISO BMFF specification (ISO/IEC 14996-12), for the box definitions.

If you run [xxd](segment-issues#xxd) or [mp4dump](segment-issues#xxd) on an MP4 segment, you can see the boxes listed.

### TS

TS files are a sequential series of 188 byte "sections," where each section starts with a "sync byte" (ASCII character 'G') followed by metadata information and the media data. The bitstream specification for a packet can be found at the [wiki article](https://en.wikipedia.org/wiki/MPEG_transport_stream#Packet).

If you run [xxd](segment-issues#xxd) on a TS segment, you can see the sync bytes representing the packets (every 188 bytes).

[^1]: Note that metadata may also be found in more places than just the beginning of the video file. To keep things simple, we'll only discuss metadata at the beginning.
