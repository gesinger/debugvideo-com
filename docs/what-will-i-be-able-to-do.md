# What will I be able to do?

By the end of this guide, you will be able to start debugging any reported issue. You will know if a ticket has too little information, or, if it has more information than you know what to do with, where to begin your investigation.

## Sparse tickets

```
Title: Playback not working

Body:
The video at http://example.com/video stops and a timeout error is shown.
```

Given a ticket with this little information, you will know that, if you can't reproduce the issue immediately, you will need to ask for more information. For instance:

1. What browser and device did the reporter use?
2. What type of network speeds did the reporter have?
3. Were there any user interactions (seeks, pauses, plays, manual rendition changes)?
4. How long did the video play before timing out?
5. Were there any console messages?

If, after investigation, the issue is still not replicable, you will know to ask for more details, such as:

5. A HAR file
6. Chrome's (if applicable) Media panel messages

## Tickets with every possible avenue of exploration

(For anyone reporting tickets, this is the dream for ticket asignees.)

```
Title: Playback stops after an hour with MEDIA_ERR_TIMEOUT

Body:
The video at http://example.com/video throws a MEDIA_ERR_TIMEOUT after 60
seconds of buffering when the video is played for 1 hour.

No user interactions are made. This is on MacOS 10.15.7, Chrome 96.0.4664.55
connected to a 100mbps down connection, hardwired via ethernet.

The console only displays MEDIA_ERR_TIMEOUT, no network requests failed.

Attached are videos of the issue happening, the console logs, the HAR file
via Charles Proxy for each occurrence, Chrome's Media tab messages, and a
report of the player's current time and audio and video buffer values at
the time of the timeout error.
```

Given a ticket with all of that information, you will know where to start your investigation.
