/** @type {import('@docusaurus/types').DocusaurusConfig} */

const packageInfo = require("../package.json");
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  title: 'Flicking',
  tagline: "Everyday 30 million people experience. It's reliable, flexible and extendable carousel.",
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  url: 'https://naver.github.io',
  baseUrl: isDev ? '/' : '/egjs-flicking/',
  projectName: 'naver.github.io',
  organizationName: 'naver',
  themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig: {
    navbar: {
      title: 'Flicking',
      logo: {
        alt: 'egjs',
        src: 'img/logo.svg'
      },
      items: [
        {
          type: 'doc',
          docId: 'installation',
          label: 'Docs',
          position: 'left'
        },
        {
          type: "doc",
          docId: "Options",
          label: "Options",
          position: "left"
        },
        {
          type: "doc",
          docId: "api/Flicking",
          label: "API",
          position: "left"
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              to: 'https://naver.github.io/egjs-flicking/3.8.2',
              label: '3.x.x'
            }
          ]
        },
        {
          type: 'localeDropdown',
          position: 'right'
        },
        {
          href: 'https://github.com/naver/egjs-flicking',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus'
            }
          ]
        }
      ],
      logo: {
        alt: 'Naver Open Source Logo',
        src: 'img/naver_opensource.svg',
        href: 'https://naver.github.io/'
      },
      copyright: `Copyright © ${new Date().getFullYear()} NAVER, Inc. Built with Docusaurus.`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: "https://github.com/naver/egjs-flicking/edit/master/docs/",
          remarkPlugins: [require("remark-breaks")],
          lastVersion: isDev ? "current" : undefined,
          versions: {
            current: {
              label: `Next`
            }
          }
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/naver/egjs-flicking/edit/master/docs/blog/"
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/bulma.css'),
            require.resolve('./src/css/flicking.css')
          ]
        }
      }
    ]
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ko"]
  }
};
