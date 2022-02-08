"use strict";(self.webpackChunkdebug_video=self.webpackChunkdebug_video||[]).push([[883],{3905:function(e,t,a){a.d(t,{Zo:function(){return p},kt:function(){return c}});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function r(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var m=n.createContext({}),l=function(e){var t=n.useContext(m),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},p=function(e){var t=l(e.components);return n.createElement(m.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,o=e.originalType,m=e.parentName,p=r(e,["components","mdxType","originalType","parentName"]),h=l(a),c=i,f=h["".concat(m,".").concat(c)]||h[c]||d[c]||o;return a?n.createElement(f,s(s({ref:t},p),{},{components:a})):n.createElement(f,s({ref:t},p))}));function c(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=a.length,s=new Array(o);s[0]=h;var r={};for(var m in t)hasOwnProperty.call(t,m)&&(r[m]=t[m]);r.originalType=e,r.mdxType="string"==typeof e?e:i,s[1]=r;for(var l=2;l<o;l++)s[l]=a[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},5813:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return r},contentTitle:function(){return m},metadata:function(){return l},toc:function(){return p},default:function(){return h}});var n=a(7462),i=a(3366),o=(a(7294),a(3905)),s=["components"],r={},m="Segment Issues",l={unversionedId:"segment-issues",id:"segment-issues",title:"Segment Issues",description:"Now it's time to get deep into the streams. Here we're looking at the video content itself, rather than just the manifest.",source:"@site/docs/segment-issues.md",sourceDirName:".",slug:"/segment-issues",permalink:"/segment-issues",tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Manifest Issues",permalink:"/manifest-issues"},next:{title:"Player Issues",permalink:"/player-issues"}},p=[{value:"Playing a segment independently",id:"playing-a-segment-independently",children:[],level:2},{value:"ffprobe",id:"ffprobe",children:[{value:"ffprobe segment",id:"ffprobe-segment",children:[],level:3},{value:"ffprobe -show_streams segment",id:"ffprobe--show_streams-segment",children:[],level:3},{value:"ffprobe -show_frames segment",id:"ffprobe--show_frames-segment",children:[],level:3}],level:2},{value:"thumb.co.il",id:"thumbcoil",children:[],level:2},{value:"xxd",id:"xxd",children:[],level:2},{value:"Other Tools",id:"other-tools",children:[],level:2}],d={toc:p};function h(e){var t=e.components,r=(0,i.Z)(e,s);return(0,o.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"segment-issues"},"Segment Issues"),(0,o.kt)("p",null,"Now it's time to get deep into the streams. Here we're looking at the video content itself, rather than just the manifest."),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Downloading Segments")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"To work with segments, you first need to download, and sometimes reconstruct, the segments you want to look into."),(0,o.kt)("p",{parentName:"div"},"Most of the time, the process is simple. Go to the ",(0,o.kt)("a",{parentName:"p",href:"devtools-network"},"devtools network panel"),", find the relevant segment, and double click it. If you're dealing with range requests though, you may find yourself downloading a much larger file than expected. In this case, in Chrome, right click the segment and go to Copy => Copy as cURL:"),(0,o.kt)("p",{parentName:"div"},(0,o.kt)("img",{alt:"Image of option for Copy as cURL",src:a(7275).Z})),(0,o.kt)("p",{parentName:"div"},"After that, paste it into a terminal, and add an output with the segment name and extension:"),(0,o.kt)("pre",{parentName:"div"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"[pasted curl command] --output [some-segment-name].[ts|mp4|m4f|etc]\n")),(0,o.kt)("p",{parentName:"div"},"This will ensure you download only the byterange you're looking for, rather than the whole file."),(0,o.kt)("p",{parentName:"div"},"Some segments require the prepending of an initialization segment for some tools to read it (e.g., ffprobe). An initialization segment is a segment that provides media metadata, and is often shared between many different segments. To retrieve the initialization segments:"),(0,o.kt)("p",{parentName:"div"},(0,o.kt)("strong",{parentName:"p"},"HLS"),": Look for the segment's closest preceding ",(0,o.kt)("a",{parentName:"p",href:"https://datatracker.ietf.org/doc/html/draft-pantos-hls-rfc8216bis-10#section-4.4.4.5"},"EXT-X-MAP")," tag. If you can't find one, the segment is self initializing."),(0,o.kt)("p",{parentName:"div"},(0,o.kt)("strong",{parentName:"p"},"DASH"),": For ",(0,o.kt)("inlineCode",{parentName:"p"},"SegmentBase"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"SegmentList"),", and ",(0,o.kt)("inlineCode",{parentName:"p"},"SegmentTemplate")," elements, check for an ",(0,o.kt)("inlineCode",{parentName:"p"},"<Initialization>")," element. For ",(0,o.kt)("inlineCode",{parentName:"p"},"SegmentTemplate"),", also check for an ",(0,o.kt)("inlineCode",{parentName:"p"},"initialization")," property. If none exist, segments are self initializing."),(0,o.kt)("p",{parentName:"div"},"Once you've downloaded the initialization segment, and the segment you're looking to work with, concatenate them together:"),(0,o.kt)("pre",{parentName:"div"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"cat init-segment.mp4 segment3.mp4 > segment3-with-init.mp4\n")),(0,o.kt)("p",{parentName:"div"},"Then you can use ",(0,o.kt)("inlineCode",{parentName:"p"},"ffprobe")," and other utilities on ",(0,o.kt)("inlineCode",{parentName:"p"},"segment3-with-init.mp4"),"."))),(0,o.kt)("h2",{id:"playing-a-segment-independently"},"Playing a segment independently"),(0,o.kt)("p",null,"Often, problems occur when playback reaches a specific segment. Once you've downloaded it, try to play it in a desktop video player (e.g., QuickTime or VLC). ",(0,o.kt)("em",{parentName:"p"},"Note"),": VLC is robust enough to successfully interpret and play video if run on a slice of toast, so successful playback in VLC doesn't necessarily mean the segment is perfectly valid."),(0,o.kt)("p",null,"If the segment plays without issue, try playing it in a browser's video element directly. If it's an MP4, create a ",(0,o.kt)("inlineCode",{parentName:"p"},"<video>")," tag on the page and use the segment as the ",(0,o.kt)("inlineCode",{parentName:"p"},"<source>"),". If it's a TS, try creating a very basic HLS VOD playlist with that single segment, and run it through the video player you're using. For instance:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-PLAYLIST-TYPE:VOD\n#EXT-X-TARGETDURATION:10\n#EXTINF:10,\nsome-segment.ts\n#EXT-X-ENDLIST\n")),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Try it yourself")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Try to make a single segment VOD HLS manifest and play it back in a browser's video player. If you need a segment, you can take an MP4 and convert it to TS while preserving the codecs via ffmpeg:"),(0,o.kt)("pre",{parentName:"div"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"ffmpeg -i some-mp4.mp4 -c copy some-segment.ts\n")),(0,o.kt)("p",{parentName:"div"},"To serve the segment and manifest, you'll have to run a local server. Some popular local servers are ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/http-party/http-server"},"http-server")," and Python's ",(0,o.kt)("inlineCode",{parentName:"p"},"SimpleHTTPServer"),"."))),(0,o.kt)("h2",{id:"ffprobe"},"ffprobe"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"ffprobe")," is an incredibly handy tool when debugging segments. It can be run on locally downloaded segments or on segment URLs. There are a few key commands to use with ffprobe."),(0,o.kt)("h3",{id:"ffprobe-segment"},"ffprobe ","[segment]"),(0,o.kt)("p",null,"Running ",(0,o.kt)("inlineCode",{parentName:"p"},"ffprobe")," alone, with no options, provides a high level view of the segment. It includes the duration, start time, bitrate, and a list of programs. Within each program you'll see streams. If the streams are muxed, then in one segment you will see at least two streams, one for audio, and one for video, with each listing the stream ID, codecs, and profiles. In addition, you may see metadata streams, e.g., ID3 streams."),(0,o.kt)("p",null,"A basic ",(0,o.kt)("inlineCode",{parentName:"p"},"ffprobe")," of a segment can highlight a few issues:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Mismatching stream IDs"),": If you are comparing the ",(0,o.kt)("inlineCode",{parentName:"li"},"ffprobe")," results of two segments without a discontinuity between them, it can be important to check that the stream IDs remain consistent, otherwise, MEDIA","_","ERR","_","DECODE or other similar errors may be thrown."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Missing audio/video"),": If the stream is muxed, and you only notice a segment containing one stream (either audio or video, but not both), then there may be gaps in the stream. One case where this happens is when there are segments with no audio, and the encoder doesn't include the audio stream for those segments. This is against spec, and must be fixed by the encoder."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Wrong or mismatched codecs"),": If the manifest advertises that a stream has one type of codec, and a single segment has a codec that isn't compatible with the advertised one, then the browser may throw a MEDIA","_","ERR","_","DECODE."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Too many streams for a given media"),": Segments may have multiple programs, and multiple streams of each type (e.g., a segment may have one video stream and two audio streams, to provide audio for two languages). This is common for closed captions and metadata. However, this is not common for video on the web, as it wastes bandwidth and processing resources. HLS and DASH provide ways to signal alternate media streams in the manifest, so players need only download the track being used. Many browser-based players are unable to handle multiple audio and video streams in the same segment. If you notice multiple in a segment, check with the stream provider to see if they can split the extra streams into separate manifest signaled renditions.")),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Try it yourself")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Find any segment you have downloaded (or a URL to one) and run ",(0,o.kt)("inlineCode",{parentName:"p"},"ffprobe [segment]"),"."),(0,o.kt)("ul",{parentName:"div"},(0,o.kt)("li",{parentName:"ul"},"Can you determine if the content is muxed?"),(0,o.kt)("li",{parentName:"ul"},"Is there a metadata stream?"),(0,o.kt)("li",{parentName:"ul"},"What is the codec and profile of each stream?")))),(0,o.kt)("h3",{id:"ffprobe--show_streams-segment"},"ffprobe -show_streams ","[segment]"),(0,o.kt)("p",null,"One of the most important pieces of information ",(0,o.kt)("inlineCode",{parentName:"p"},"-show_streams")," surfaces is timing information: the start times and durations of each stream."),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"PTS and DTS Times in Segments")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Timing information in segments is relative to the program's clock. When looking at timestamps for segments and frames, there are two times you'll see:"),(0,o.kt)("ul",{parentName:"div"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Presentation Timestamp (PTS)"),": The program clock time at which a frame should be shown (or, in the case of a segment, generally the earliest frame's PTS)."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Decode Timestamp (DTS)"),": The program clock time at which a frame should be decoded. This is important for frames which are referenced by other frames.")),(0,o.kt)("p",{parentName:"div"},"In addition, ",(0,o.kt)("inlineCode",{parentName:"p"},"-show_streams")," will show the ",(0,o.kt)("inlineCode",{parentName:"p"},"time_base"),". For many video streams, it's a 90kHz clock, meaning in the ",(0,o.kt)("inlineCode",{parentName:"p"},"ffprobe -show_streams")," results you will see:"),(0,o.kt)("pre",{parentName:"div"},(0,o.kt)("code",{parentName:"pre"},"time_base=1/90000\n")),(0,o.kt)("p",{parentName:"div"},(0,o.kt)("inlineCode",{parentName:"p"},"time_base")," allows you to convert between program clock time to seconds, and vice versa. So if a segment has a ",(0,o.kt)("inlineCode",{parentName:"p"},"start_pts")," of 900,000, and a ",(0,o.kt)("inlineCode",{parentName:"p"},"time_base")," of 1/90,000, then you can get the ",(0,o.kt)("inlineCode",{parentName:"p"},"start_time")," in seconds by dividing 900,000 by 90,000, resulting in a ",(0,o.kt)("inlineCode",{parentName:"p"},"start_time")," of 10 seconds."))),(0,o.kt)("p",null,"What to check for in ",(0,o.kt)("inlineCode",{parentName:"p"},"-show_streams"),":"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Timing Mismatch Between Audio and Video"),": If the segment is muxed, and the audio and video timing values are mismatched, that ",(0,o.kt)("em",{parentName:"li"},"may")," indicate a problem, or at least provides an avenue of exploration. Streams within a segment ",(0,o.kt)("em",{parentName:"li"},"usually")," have relatively consistent timing values, maybe off by a few frames, up to a few seconds. If they are more offset than that, then it could be a reason for playback problems. If the segment is the first in a stream, and there are differing offsets, it may mean that, depending on the player's configuration, some audio or video may be cut off, or there's a gap at the start of playback."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Gaps Between Segments"),": When comparing multiple segments, check to see that their start times and end times between streams line up without gaps (add the ",(0,o.kt)("inlineCode",{parentName:"li"},"start_time")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"duration")," values to get end times).")),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Try it Yourself")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Find any segment you have downloaded (or a URL to one) and run ",(0,o.kt)("inlineCode",{parentName:"p"},"ffprobe -show_streams [segment]"),"."),(0,o.kt)("ul",{parentName:"div"},(0,o.kt)("li",{parentName:"ul"},"What is the time base?"),(0,o.kt)("li",{parentName:"ul"},"What is the start time and end time of the segment?"),(0,o.kt)("li",{parentName:"ul"},"If this segment is muxed, how far apart are audio and video streams?"),(0,o.kt)("li",{parentName:"ul"},"Try running ffprobe on two consecutive segments, do the audio and video stream timings line up?"),(0,o.kt)("li",{parentName:"ul"},"What's the clock duration of a frame for each stream? What's the duration in seconds?"),(0,o.kt)("li",{parentName:"ul"},"If this is the first segment in a manifest, do the streams both start at 0? If not, do they start at the same time?")))),(0,o.kt)("h3",{id:"ffprobe--show_frames-segment"},"ffprobe -show_frames ","[segment]"),(0,o.kt)("p",null,"When you don't see any issues with ",(0,o.kt)("inlineCode",{parentName:"p"},"-show_streams")," and want to dig deeper into the segment, it's time to run ",(0,o.kt)("inlineCode",{parentName:"p"},"-show_frames"),". ",(0,o.kt)("inlineCode",{parentName:"p"},"-show_frames")," will show information for each frame in the segment. Although this can often be overboard, there are a few pieces of information in ",(0,o.kt)("inlineCode",{parentName:"p"},"-show_frames")," that may be particularly useful:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"(for video) key_frame"),": If ",(0,o.kt)("inlineCode",{parentName:"li"},"key_frame")," is 1, then it's a key frame, otherwise it's not. If you don't see any ",(0,o.kt)("inlineCode",{parentName:"li"},"key_frames")," in a stream, then there may be playback issues. It's also common, but not entirely necessary, for the first frame of the first segment in a VOD manifest to be a key frame."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"PTS gaps"),": If you look at the first few and last few frames of the audio and video streams, check for gaps in PTS times between frames (within the same media type). The PTS times should be consistently one frame in duration. Occasionally, there are large gaps between the second to last and last frame of each media type, leading to gaps in playback that aren't visible when looking at stream info alone.")),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Try it Yourself")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Find any segment you have downloaded (or a URL to one) and run ",(0,o.kt)("inlineCode",{parentName:"p"},"ffprobe -show_frames [segment]"),"."),(0,o.kt)("ul",{parentName:"div"},(0,o.kt)("li",{parentName:"ul"},"Does the video start with a key frame (note that you'll have to find the video frame with the earliest time values, which is sometimes, but not always, the first listed frame)?"),(0,o.kt)("li",{parentName:"ul"},"Do the first two and last two frames within each media type have durations of a single frame?")))),(0,o.kt)("h2",{id:"thumbcoil"},"thumb.co.il"),(0,o.kt)("p",null,"A browser-based video inspector that accepts MP4, FLV, or TS files (at ",(0,o.kt)("a",{parentName:"p",href:"http://thumb.co.il"},"thumb.co.il"),"), or HLS manifests and TS files with a different UI (at ",(0,o.kt)("a",{parentName:"p",href:"http://beta.thumb.co.il"},"beta.thumb.co.il"),")."),(0,o.kt)("p",null,"Many of the command line tools provide similar functionality, but beta.thumb.co.il provides manifest navigation UI and shows a graphic of the GOP structure of each segment."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Image of GOP structure of a segment from beta.thumb.co.il",src:a(2153).Z})),(0,o.kt)("p",null,"In addition, beta.thumb.co.il will provide some quick tests for segment validity, reporting errors and warnings, e.g., a warning if the segment doesn't start with an I-frame (which may not be an issue, but as mentioned previously, can be a useful diagnostic tool)."),(0,o.kt)("h2",{id:"xxd"},"xxd"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"xxd")," is a great tool for viewing hexdumps of segments. Why would you want to do this? To feel like you're in the matrix, of course."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Image of TS xxd hexdump",src:a(4157).Z})),(0,o.kt)("p",null,"When you start to learn the bitstream of different container formats (e.g., TS and MP4), you start to appreciate viewing hexdumps. You can see certain patterns. For instance, in TS streams, the stream is cut up into 188 byte packets starting with the sync byte (0x47, ASCII 'G'). In the above image you can see those sync bytes, and start to make some sense of what's going on. For MP4 files the hexdump is even better, as it shows a quick view of the different MP4 boxes, e.g., the \"ftyp\" box is the first box of the hexdump shown below."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Image of MP4 xxd hexdump",src:a(9809).Z})),(0,o.kt)("p",null,"As an example of how this is useful, if the MP4 file above complies with the ",(0,o.kt)("a",{parentName:"p",href:"https://www.w3.org/TR/mse-byte-stream-format-isobmff"},"ISO Base Media File Format"),' specification, then the presence of the "ftyp" box tells us it\'s either an init segment or has an init segment prepending it (see ',(0,o.kt)("a",{parentName:"p",href:"https://www.w3.org/TR/mse-byte-stream-format-isobmff/#iso-init-segments"},"the Initialization Segment Section"),")."),(0,o.kt)("h2",{id:"other-tools"},"Other Tools"),(0,o.kt)("p",null,"There are some other fantastic tools out there which you may find useful, but this guide will not discuss them in detail. Here are a couple that are worth checking out:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/axiomatic-systems/Bento4"},"Bento4"),": A suite of tools, with some useful MP4 probing command line programs such as ",(0,o.kt)("inlineCode",{parentName:"li"},"mp4info")," (well organized and high level MP4 info) and ",(0,o.kt)("inlineCode",{parentName:"li"},"mp4dump")," (useful for viewing MP4 boxes)."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/MediaArea/MediaInfo"},"mediainfo"),": Another tool for viewing high level media info. Covers MP4, TS, and more.")))}h.isMDXComponent=!0},7275:function(e,t,a){t.Z=a.p+"assets/images/copy-as-curl-1153f673b995091101f22d89b61271da.png"},2153:function(e,t,a){t.Z=a.p+"assets/images/thumbcoil-gop-structure-16e1d4ea63356fe5640decd36e237225.png"},9809:function(e,t,a){t.Z=a.p+"assets/images/xxd-hexdump-mp4-68170960b6ec7bbec1d23e43930d0612.png"},4157:function(e,t,a){t.Z=a.p+"assets/images/xxd-hexdump-ts-872555904ffe390d0cacb6151098139d.png"}}]);