"use strict";(self.webpackChunkdebugvideo_com=self.webpackChunkdebugvideo_com||[]).push([[3],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),f=a,m=p["".concat(l,".").concat(f)]||p[f]||d[f]||o;return n?r.createElement(m,i(i({ref:t},u),{},{components:n})):r.createElement(m,i({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},7788:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return u},default:function(){return p}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],s={},l="Media",c={unversionedId:"devtools-media",id:"devtools-media",title:"Media",description:"The media panel is a Chrome devtools specific panel that defaults to hidden. It can be enabled following this guide, or using the image below.",source:"@site/docs/devtools-media.md",sourceDirName:".",slug:"/devtools-media",permalink:"/devtools-media",tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Network",permalink:"/devtools-network"},next:{title:"Stream Issues",permalink:"/stream-issues"}},u=[],d={toc:u};function p(e){var t=e.components,s=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},d,s,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"media"},"Media"),(0,o.kt)("p",null,"The media panel is a Chrome devtools specific panel that defaults to hidden. It can be enabled following ",(0,o.kt)("a",{parentName:"p",href:"https://developer.chrome.com/docs/devtools/media-panel/"},"this guide"),", or using the image below."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Image of enabling devtools Media panel in Chrome",src:n(4401).Z})),(0,o.kt)("p",null,"Once you've selected the player you want to examine from the list of available players in the media panel, you will find the following tabs: Properties, Events, Messages, and Timeline."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Image of devtools Media panel tabs",src:n(6781).Z})),(0,o.kt)("p",null,"Of these, Messages is often the most useful. If your player encounters ",(0,o.kt)("a",{parentName:"p",href:"devtools-console#media_err_decode"},"MEDIA","_","ERR","_","DECODE"),", then you can sometimes find the cause of the error just above where the error is logged. For instance, after scrambling some of the video data in an MP4, you might see:"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Image of devtools Media panel with error message",src:n(79).Z})),(0,o.kt)("p",null,"As a practical matter, there are often many messages that are relatively frequent, and do not necessarily indicate a critical issue (i.e., playback failure). For instance, audio splice trimming, e.g.:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"Skipping audio splice trimming at PTS=1117390612us.\nFound only 44us of overlap, need at least 1000us.\nMultiple occurrences may result in loss of A/V sync.\n")),(0,o.kt)("p",null,"These messages are useful, in particular if you've seen, as the message says, a loss of audio and video sync, but often these are handled without issue, and are not prone to triggering errors."),(0,o.kt)("p",null,"The media panel used to only be accessible via chrome://media-internals. That is still available, though the media panel is often more convenient for finding players within a specific tab."))}p.isMDXComponent=!0},79:function(e,t,n){t.Z=n.p+"assets/images/devtools-media-error-ea01fd1395a270d6aed502ff8c1dda0f.png"},6781:function(e,t,n){t.Z=n.p+"assets/images/devtools-media-tabs-5c596ebfe846bcef5f3f50c73d99472d.png"},4401:function(e,t,n){t.Z=n.p+"assets/images/enable-devtools-media-7ed7055cad9fc7017ca421917f492520.png"}}]);