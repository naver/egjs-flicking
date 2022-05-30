/** @type {import('@docusaurus/types').DocusaurusConfig} */

const isDev = process.env.NODE_ENV === "development";

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: "Flicking",
  tagline: "Everyday 30 million people experience. It's reliable, flexible and extendable carousel.",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  url: "https://naver.github.io",
  baseUrl: "/egjs-flicking/",
  projectName: "naver.github.io",
  trailingSlash: false,
  organizationName: "naver",
  plugins: ["docusaurus-plugin-sass"],
  themeConfig: {
    navbar: {
      logo: {
        alt: "egjs",
        src: "img/flicking_textonly.svg"
      },
      items: [
        {
          type: "doc",
          docId: "tutorials/installation",
          label: "Docs",
          position: "left"
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
          type: "docsVersionDropdown",
          position: "right",
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              to: "https://naver.github.io/egjs-flicking/release/3.8.2/doc/index.html",
              label: "3.x.x"
            }
          ]
        },
        {
          type: "localeDropdown",
          position: "right"
        },
        {
          href: "https://github.com/naver/egjs-flicking",
          label: "GitHub",
          position: "right"
        }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "docs/"
            },
            {
              label: "API",
              to: "docs/api/Flicking"
            },
            {
              label: "Options",
              to: "Options/"
            }
          ]
        },
        {
          title: "Demo",
          items: [
            {
              label: "Demos",
              to: "Demos/"
            },
            {
              label: "Showcases",
              to: "Showcases/"
            }
          ]
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/naver/egjs-flicking"
            },
            {
              label: "Issues",
              href: "https://github.com/naver/egjs-flicking/issues"
            },
            {
              label: "Naver Open Source",
              href: "https://naver.github.io/"
            }
          ]
        }
      ],
      logo: {
        alt: "egjs",
        src: "img/egjs_white.svg",
        href: "https://naver.github.io/egjs/"
      },
      copyright: `Copyright © ${new Date().getFullYear()} NAVER, Inc. Built with Docusaurus & Bulma.`
    },
    prism: {
      theme: require("prism-react-renderer/themes/oceanicNext"),
      darkTheme: require("prism-react-renderer/themes/palenight")
    }
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/naver/egjs-flicking/edit/master/docs/",
          remarkPlugins: [require("remark-breaks")],
          lastVersion: isDev ? "current" : undefined,
          breadcrumbs: false,
          versions: {
            current: {
              label: "Next"
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
            require.resolve("./src/css/custom.css"),
            require.resolve("./node_modules/@egjs/react-flicking/dist/flicking.css"),
            require.resolve("./node_modules/@egjs/flicking-plugins/dist/flicking-plugins.css"),
            require.resolve("./src/css/bulma-override.sass")
          ]
        },
        googleAnalytics: {
          trackingID: "UA-70842526-17",
          anonymizeIP: true
        }
      }
    ]
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ko"]
  }
};
