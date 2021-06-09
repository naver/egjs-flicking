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
  plugins: ['docusaurus-plugin-sass'],
  themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig: {
    hideableSidebar: false,
    navbar: {
      logo: {
        alt: 'egjs',
        src: 'img/flicking_textonly.svg'
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
          docId: "api/Flicking",
          label: "API",
          position: "left"
        },
        {
          to: "Options",
          label: "Options",
          position: "left"
        },
        {
          to: "Plugins",
          label: "Plugins",
          position: "left"
        },
        {
          to: "Demos",
          label: "Demos",
          position: "left"
        },
        {
          to: "Showcases",
          label: "Showcases",
          position: "left"
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              to: 'https://naver.github.io/egjs-flicking/release/3.8.2/doc/index.html',
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
            },
            {
              label: 'API',
              to: 'docs/api/Flicking'
            },
            {
              label: 'Options',
              to: 'Options/'
            }
          ]
        },
        {
          title: 'Demo',
          items: [
            {
              label: 'Demos',
              to: 'Demos/'
            },
            {
              label: 'Showcases',
              to: 'Showcases/'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/naver/egjs-flicking'
            },
            {
              label: 'Issues',
              href: 'https://github.com/naver/egjs-flicking/issues'
            },
            {
              label: 'egjs',
              href: 'https://naver.github.io/egjs/'
            }
          ]
        }
      ],
      logo: {
        alt: 'Naver Open Source Logo',
        src: 'img/naver_opensource.svg',
        href: 'https://naver.github.io/'
      },
      copyright: `Copyright © ${new Date().getFullYear()} NAVER, Inc. Built with Docusaurus & Bulma.`
    },
    prism: {
      theme: require('prism-react-renderer/themes/oceanicNext')
    },
    googleAnalytics: {
      trackingID: 'UA-70842526-17',
      anonymizeIP: true
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
          },
          editCurrentVersion: true
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/naver/egjs-flicking/edit/master/docs/blog/"
        },
        pages: {
          remarkPlugins: [require("remark-breaks")]
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./node_modules/@egjs/flicking/dist/flicking.css'),
            require.resolve('./src/css/bulma-override.sass')
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
