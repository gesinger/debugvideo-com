# Segment Issues

Now it's time to get deep into the streams. Here we're looking at the video content itself, rather than just the manifest.

:::note Downloading Segments
To work with segments, you first need to download, and sometimes reconstruct, the segments you want to look into.

Most of the time, the process is simple. Go to the [devtools network panel](devtools-network), find the relevant segment, and double click it. If you're dealing with range requests though, you may find yourself downloading a much larger file than expected. In this case, in Chrome, right click the segment and go to Copy => Copy as cURL:

![Image of option for Copy as cURL](/img/copy-as-curl.png)

After that, paste it into a terminal, and add an output with the segment name and extension:

```bash
[pasted curl command] --output [some-segment-name].[ts|mp4|m4f|etc]
```

This will ensure you download only the byterange you're looking for, rather than the whole file.

Some segments require the prepending of an initialization segment for some tools to read it (e.g., ffprobe). An initialization segment is a segment that provides media metadata, and is often shared between many different segments. To retrieve the initialization segments:

**HLS**: Look for the segment's closest preceding [EXT-X-MAP](https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-10#section-4.4.4.5) tag. If you can't find one, the segment is self initializing.

**DASH**: For `SegmentBase`, `SegmentList`, and `SegmentTemplate` elements, check for an `<Initialization>` element. For `SegmentTemplate`, also check for an `initialization` property. If none exist, segments are self initializing.

Once you've downloaded the initialization segment, and the segment you're looking to work with, concatenate them together:

```bash
cat init-segment.mp4 segment3.mp4 > segment3-with-init.mp4
```

Then you can use `ffprobe` and other utilities on `segment3-with-init.mp4`.
:::

## Playing a segment independently

Often, problems occur when playback reaches a specific segment. Once you've downloaded it, try to play it in a desktop video player (e.g., QuickTime or VLC). *Note*: VLC is robust enough to successfully interpret and play video if run on a slice of toast, so successful playback in VLC doesn't necessarily mean the segment is perfectly valid.

If the segment plays without issue, try playing it in a browser's video element directly. If it's an MP4, create a `<video>` tag on the page and use the segment as the `<source>`. If it's a TS, try creating a very basic HLS VOD playlist with that single segment, and run it through the video player you're using. For instance:

```
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-PLAYLIST-TYPE:VOD
#EXT-X-TARGETDURATION:10
#EXTINF:10,
some-segment.ts
#EXT-X-ENDLIST
```

:::tip Try it yourself
Try to make a single segment VOD HLS manifest and play it back in a browser's video player. If you need a segment, you can take an MP4 and convert it to TS while preserving the codecs via ffmpeg:

```bash
ffmpeg -i some-mp4.mp4 -c copy some-segment.ts
```

To serve the segment and manifest, you'll have to run a local server. Some popular local servers are [http-server](https://github.com/http-party/http-server) and Python's `SimpleHTTPServer`.
:::

## ffprobe

`ffprobe` is an incredibly handy tool when debugging segments. It can be run on locally downloaded segments or on segment URLs. There are a few key commands to use with ffprobe.

### ffprobe [segment]

Running `ffprobe` alone, with no options, provides a high level view of the segment. It includes the duration, start time, bitrate, and a list of programs. Within each program you'll see streams. If the streams are muxed, then in one segment you will see at least two streams, one for audio, and one for video, with each listing the stream ID, codecs, and profiles. In addition, you may see metadata streams, e.g., ID3 streams.

A basic `ffprobe` of a segment can highlight a few issues:

* **Mismatching stream IDs**: If you are comparing the `ffprobe` results of two segments without a discontinuity between them, it can be important to check that the stream IDs remain consistent, otherwise, MEDIA\_ERR\_DECODE or other similar errors may be thrown.
* **Missing audio/video**: If the stream is muxed, and you only notice a segment containing one stream (either audio or video, but not both), then there may be gaps in the stream. One case where this happens is when there are segments with no audio, and the encoder doesn't include the audio stream for those segments. This is against spec, and must be fixed by the encoder.
* **Wrong or mismatched codecs**: If the manifest advertises that a stream has one type of codec, and a single segment has a codec that isn't compatible with the advertised one, then the browser may throw a MEDIA\_ERR\_DECODE.
* **Too many streams for a given media**: Segments may have multiple programs, and multiple streams of each type (e.g., a segment may have one video stream and two audio streams, to provide audio for two languages). This is common for closed captions and metadata. However, this is not common for video on the web, as it wastes bandwidth and processing resources. HLS and DASH provide ways to signal alternate media streams in the manifest, so players need only download the track being used. Many browser-based players are unable to handle multiple audio and video streams in the same segment. If you notice multiple in a segment, check with the stream provider to see if they can split the extra streams into separate manifest signaled renditions.

:::tip Try it yourself
Find any segment you have downloaded (or a URL to one) and run `ffprobe [segment]`.

* Can you determine if the content is muxed?
* Is there a metadata stream?
* What is the codec and profile of each stream?
:::

### ffprobe -show_streams [segment]

One of the most important pieces of information `-show_streams` surfaces is timing information: the start times and durations of each stream.

:::info PTS and DTS Times in Segments
Timing information in segments is relative to the program's clock. When looking at timestamps for segments and frames, there are two times you'll see:

* **Presentation Timestamp (PTS)**: The program clock time at which a frame should be shown (or, in the case of a segment, generally the earliest frame's PTS).
* **Decode Timestamp (DTS)**: The program clock time at which a frame should be decoded. This is important for frames which are referenced by other frames.

In addition, `-show_streams` will show the `time_base`. For many video streams, it's a 90kHz clock, meaning in the `ffprobe -show_streams` results you will see:

```
time_base=1/90000
```

`time_base` allows you to convert between program clock time to seconds, and vice versa. So if a segment has a `start_pts` of 900,000, and a `time_base` of 1/90,000, then you can get the `start_time` in seconds by dividing 900,000 by 90,000, resulting in a `start_time` of 10 seconds.
:::

What to check for in `-show_streams`:

* **Timing Mismatch Between Audio and Video**: If the segment is muxed, and the audio and video timing values are mismatched, that *may* indicate a problem, or at least provides an avenue of exploration. Streams within a segment *usually* have relatively consistent timing values, maybe off by a few frames, up to a few seconds. If they are more offset than that, then it could be a reason for playback problems. If the segment is the first in a stream, and there are differing offsets, it may mean that, depending on the player's configuration, some audio or video may be cut off, or there's a gap at the start of playback.
* **Gaps Between Segments**: When comparing multiple segments, check to see that their start times and end times between streams line up without gaps (add the `start_time` and `duration` values to get end times).

:::tip Try it Yourself
Find any segment you have downloaded (or a URL to one) and run `ffprobe -show_streams [segment]`.

* What is the time base?
* What is the start time and end time of the segment?
* If this segment is muxed, how far apart are audio and video streams?
* Try running ffprobe on two consecutive segments, do the audio and video stream timings line up?
* What's the clock duration of a frame for each stream? What's the duration in seconds?
* If this is the first segment in a manifest, do the streams both start at 0? If not, do they start at the same time?
:::

### ffprobe -show_frames [segment]

When you don't see any issues with `-show_streams` and want to dig deeper into the segment, it's time to run `-show_frames`. `-show_frames` will show information for each frame in the segment. Although this can often be overboard, there are a few pieces of information in `-show_frames` that may be particularly useful:

* **(for video) key_frame**: If `key_frame` is 1, then it's a key frame, otherwise it's not. If you don't see any `key_frames` in a stream, then there may be playback issues. It's also common, but not entirely necessary, for the first frame of the first segment in a VOD manifest to be a key frame.
* **PTS gaps**: If you look at the first few and last few frames of the audio and video streams, check for gaps in PTS times between frames (within the same media type). The PTS times should be consistently one frame in duration. Occasionally, there are large gaps between the second to last and last frame of each media type, leading to gaps in playback that aren't visible when looking at stream info alone.

:::tip Try it Yourself
Find any segment you have downloaded (or a URL to one) and run `ffprobe -show_frames [segment]`.

* Does the video start with a key frame (note that you'll have to find the video frame with the earliest time values, which is sometimes, but not always, the first listed frame)?
* Do the first two and last two frames within each media type have durations of a single frame?
:::

## thumb.co.il

A browser-based video inspector that accepts MP4, FLV, or TS files (at [thumb.co.il](http://thumb.co.il)), or HLS manifests and TS files with a different UI (at [beta.thumb.co.il](http://beta.thumb.co.il)).

Many of the command line tools provide similar functionality, but beta.thumb.co.il provides manifest navigation UI and shows a graphic of the GOP structure of each segment.

![Image of GOP structure of a segment from beta.thumb.co.il](/img/thumbcoil-gop-structure.png)

In addition, beta.thumb.co.il will provide some quick tests for segment validity, reporting errors and warnings, e.g., a warning if the segment doesn't start with an I-frame (which may not be an issue, but as mentioned previously, can be a useful diagnostic tool).

## xxd

`xxd` is a great tool for viewing hexdumps of segments. Why would you want to do this? To feel like you're in the matrix, of course.

![Image of TS xxd hexdump](/img/xxd-hexdump-ts.png)

When you start to learn the bitstream of different container formats (e.g., TS and MP4), you start to appreciate viewing hexdumps. You can see certain patterns. For instance, in TS streams, the stream is cut up into 188 byte packets starting with the sync byte (0x47, ASCII 'G'). In the above image you can see those sync bytes, and start to make some sense of what's going on. For MP4 files the hexdump is even better, as it shows a quick view of the different MP4 boxes, e.g., the "ftyp" box is the first box of the hexdump shown below.

![Image of MP4 xxd hexdump](/img/xxd-hexdump-mp4.png)

As an example of how this is useful, if the MP4 file above complies with the [ISO Base Media File Format](https://www.w3.org/TR/mse-byte-stream-format-isobmff) specification, then the presence of the "ftyp" box tells us it's either an init segment or has an init segment prepending it (see [the Initialization Segment Section](https://www.w3.org/TR/mse-byte-stream-format-isobmff/#iso-init-segments)).

## Other Tools

There are some other fantastic tools out there which you may find useful, but this guide will not discuss them in detail. Here are a couple that are worth checking out:

* [Bento4](https://github.com/axiomatic-systems/Bento4): A suite of tools, with some useful MP4 probing command line programs such as `mp4info` (well organized and high level MP4 info) and `mp4dump` (useful for viewing MP4 boxes).
* [mediainfo](https://github.com/MediaArea/MediaInfo): Another tool for viewing high level media info. Covers MP4, TS, and more.
