# Adressing new tickets

This section isn't entirely specific to video, but provides a general approach for addressing new tickets.

1. **Read the ticket**<br />
People submitting tickets generally want to provide all of the helpful information they can. If there's not enough, reach out to the ticket creator. Try to ask questions that are as specific as possible, for example:
* What browser and OS are you using?
* Are you using any browser extensions or add-ons?
* Does this issue happen every time you try to play the video? In the same way?
* Are you interacting with the video player's UI at all?
2. **Identify the type of problem**<br />
Is the player buffering? Did it throw an error on the screen? Is it flashing green frames? Knowing what issue must be solved is critical to finding a cause.
3. **Reproduce**<br />
Without a reproducible test case, you can never be sure if any changes you make solved the problem. If you really can't reproduce, try to get as much information from the ticket reporter as possible and do you best to replicate their conditions. We'll discuss some tools for this [here](what-if-you-cant-reproduce).
4. **Look for useful debugging information**<br />
Whether or not an error came up on screen, open the browser console and look for any obvious errors that are thrown. Check the [devtools network panel](devtools-network) to see if any requests failed. If the issue occurs in Chrome, check the [devtools media panel](devtools-media) for any messages.
5. **Ensure there's a communication channel**<br />
If you're on a team, your teammates may be looking at the issue too. It's useful to work together, or at least share information and findings, to prevent overlap of work and to take advantage of thought diversity.
