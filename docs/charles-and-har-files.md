# Charles Proxy and HAR Files 

HAR files are incredibly useful. They can provide a record of a video playback session, often with full manifest and segment responses.

[Charles Proxy](https://www.charlesproxy.com/) is a great tool. It will proxy network requests from the browser. You can use it to look at or modify all requests and responses that the browser makes.

Together, Charles and HAR files make ticket investigation, issue reproduction, and fix testing a lot easier.

Note that Charles has the ability to save [HAR files](what-if-you-cant-reproduce#har), but it's not the only means of saving them. Charles just provides a very good interface for saving and reviewing them, and is often used in the world of web devs.

## Investigation

If a ticket reporter includes a HAR file, there's often enough information to look for [manifest issues](manifest-issues).

In addition, if the HAR file includes the segment bodies, then they can be exported to look for [segment issues](segment-issues)

### Gathering more information

If you need more information but don't have access to certain player properties, you can map the player's javascript with a copy of your own that has more logging. Sometimes it's as simple as saving an object to a global variable (for debugging purposes only). For instance, if you want to gain access to an EME key session object, find where `mediaKeys.createSession()` is called in the code and save it as a global variable or log it. When the page loads you can read properties on the object or add additional event listeners, e.g.:

```javascript
// Find where in the code the key session is created
const keySession = mediaKeys.createSession();

// Add a global reference. You can also console.log it instead, or
// add the event listeners you need in-place, but for the sake of
// debugging, adding it as a global makes later access easy.
window.DEBUGGING_KEY_SESSION = keySession;

...

// Later on during playback you can check properties of the keySession object:
console.log(window.DEBUGGING_KEY_SESSION.keyStatuses);

// or add event listeners:
window.DEBUGGING_KEY_SESSION.addEventListener(
  'keystatuseschange', (event) => {
    // do some debugging here
    debugger;
  }
)
```

## Reproducing

A HAR file provides a great means of reproducing an issue that only happens on occasion. If you export the manifests and segments you can often recreate the playlists as they were during the session.

Even if the HAR file doesn't include the manifest and segment responses, the timing of requests and responses can sometimes help to reproduce the issue.

## Testing fixes

If you have a fix that you want to test on a page that's not owned by you, you can use Charles and map any of the page's network requests. This can be used to modify player code, replace manifest properties, or swap out segments. This is especially useful when the page requires extensive authorization that can't be mimicked locally.
