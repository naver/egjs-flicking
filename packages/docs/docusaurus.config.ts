import path from "node:path";
import type { Config } from "@docusaurus/types";
import { themes } from "prism-react-renderer";
import remarkBreaks from "remark-breaks";

export default {
  title: "Flicking",
  tagline: "Everyday 30 million people experience. It's reliable, flexible and extendable carousel.",
  onBrokenLinks: process.env.STRICT_LINKS ? "throw" : "warn",
  favicon: "img/favicon.ico",
  url: "https://naver.github.io",
  baseUrl: "/egjs-flicking/",
  projectName: "naver.github.io",
  trailingSlash: false,
  organizationName: "naver",
  plugins: [
    "docusaurus-plugin-sass",
    () => {
      // Recursively add resourceQuery exclusion so that ?raw imports
      // bypass Babel / CSS / other loaders and are returned as plain text.
      const excludeRawFromRule = (rule: Record<string, unknown>) => {
        if (Array.isArray(rule.oneOf)) {
          (rule.oneOf as Record<string, unknown>[]).forEach(excludeRawFromRule);
          return;
        }
        if (rule.use || rule.loader) {
          const rq = rule.resourceQuery;
          if (!rq) {
            rule.resourceQuery = { not: [/raw/] };
          } else if (typeof rq === "object" && !(rq instanceof RegExp)) {
            (rq as Record<string, unknown[]>).not = [...((rq as Record<string, unknown[]>).not || []), /raw/];
          }
        }
      };

      return {
        name: "custom-webpack-alias",
        configureWebpack: (config: { module?: { rules?: unknown[] } }) => {
          for (const rule of config.module?.rules ?? []) {
            if (rule && typeof rule === "object") {
              excludeRawFromRule(rule as Record<string, unknown>);
            }
          }

          return {
            resolve: {
              alias: {
                react: path.resolve(__dirname, "./node_modules/react"),
                "react-dom": path.resolve(__dirname, "./node_modules/react-dom")
              }
            },
            module: {
              rules: [
                {
                  resourceQuery: /raw/,
                  type: "asset/source"
                }
              ]
            }
          };
        }
      };
    }
  ],
  themeConfig: {
    navbar: {
      logo: {
        alt: "egjs",
        src: "img/flicking_textonly.svg"
      },
      items: [
        {
          type: "doc",
          docId: "guide/quickstart",
          label: "Guide",
          position: "left"
        },
        {
          type: "doc",
          docId: "api/classes/Flicking",
          label: "API",
          position: "left"
        },
        {
          type: "doc",
          docId: "demos/basic/default",
          label: "Demos",
          position: "left"
        },
        {
          to: "/releases",
          label: "Releases",
          position: "right"
        },
        {
          type: "dropdown",
          label: "Version",
          position: "right",
          items: [
            { label: "Current", to: "/docs/guide/quickstart" },
            { label: "3.x", href: "https://naver.github.io/egjs-flicking/release/3.8.2/doc/index.html" }
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
              to: "docs/guide/quickstart"
            },
            {
              label: "API",
              to: "docs/api/classes/Flicking"
            },
            {
              label: "Demos",
              to: "docs/demos/basic/default"
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
      theme: themes.oceanicNext,
      darkTheme: themes.palenight
    },
    algolia: {
      appId: "W8GGTHANE5",
      apiKey: "09861571e55f3970cffd575869f607d6",
      indexName: "egjs-flicking"
    }
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl: "https://github.com/naver/egjs-flicking/edit/master/docs/",
          remarkPlugins: [remarkBreaks],
          breadcrumbs: false
        },
        blog: {
          blogTitle: "Releases",
          blogSidebarTitle: "All Releases",
          blogSidebarCount: "ALL",
          postsPerPage: "ALL",
          routeBasePath: "releases"
        },
        pages: {
          remarkPlugins: [remarkBreaks]
        },
        theme: {
          customCss: [
            "./src/css/custom.css",
            "./node_modules/@egjs/react-flicking/dist/flicking.css",
            "./node_modules/@egjs/flicking-plugins/dist/flicking-plugins.css",
            "./src/css/bulma-override.sass"
          ]
        },
        gtag: {
          trackingID: "G-LWLTCXMENE",
          anonymizeIP: true
        }
      }
    ]
  ],
  future: {
    v4: true,
    experimental_faster: true
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ko"],
    localeConfigs: {
      ko: {
        label: "한국어",
        direction: "ltr"
      }
    }
  }
} satisfies Config;
