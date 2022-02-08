// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  sidebar: [
    {
      type: 'doc',
      id: 'what-is-this',
      label: 'What is this?'
    },
    {
      type: 'doc',
      id: 'who-is-this-for',
      label: 'Who is this for?'
    },
    {
      type: 'doc',
      id: 'what-will-i-be-able-to-do',
      label: 'What will I be able to do?'
    },
    {
      type: 'doc',
      id: 'how-is-this-guide-organized',
      label: 'How is this guide organized?'
    },
    {
      type: 'doc',
      id: 'short-guide-streaming-video',
      label: 'A short guide to streaming video'
    },
    {
      type: 'doc',
      id: 'addressing-new-tickets',
      label: 'Addressing new tickets'
    },
    {
      type: 'doc',
      id: 'what-if-you-cant-reproduce',
      label: 'What if you can\'t reproduce?',
    },
    {
      type: 'category',
      link: { type: 'doc', id: 'browser-devtools' },
      label: 'Browser developer tools',
      items: [
        {
          type: 'doc',
          id: 'devtools-console',
          label: 'Console',
        },
        {
          type: 'doc',
          id: 'devtools-network',
          label: 'Network',
        },
        {
          type: 'doc',
          id: 'devtools-media',
          label: 'Media',
        },
      ]
    },
    {
      type: 'category',
      link: { type: 'doc', id: 'stream-issues' },
      label: 'Stream issues',
      items: [
        {
          type: 'doc',
          id: 'manifest-issues',
          label: 'Manifest',
        },
        {
          type: 'doc',
          id: 'segment-issues',
          label: 'Segment',
        },
      ],
    },
    {
      type: 'doc',
      id: 'player-issues',
      label: 'Player issues',
    },
    {
      type: 'doc',
      id: 'browser-issues',
      label: 'Browser issues',
    },
    {
      type: 'doc',
      id: 'drm',
      label: 'DRM',
    },
    {
      type: 'category',
      label: 'Other tools',
      items: [
        {
          type: 'doc',
          id: 'charles-and-har-files',
          label: 'Charles Proxy and HAR files',
        }
      ],
    },
    {
      type: 'doc',
      id: 'exercises',
      label: 'Exercises',
    },
  ],
};

module.exports = sidebars;
