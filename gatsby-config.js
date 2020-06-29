/*  eslint-disable @typescript-eslint/no-var-requires */
const postCssPresetEnv = require(`postcss-preset-env`);
const postCSSImports = require("postcss-import");
const postCSSNested = require("postcss-nested");

/* eslint-enable */
module.exports = {
  siteMetadata: {
    siteUrl: `https://dnrsm.dev`,
    title: `dnrsm.dev`,
    description: `dnrsm.devのブログです。個人的な備忘録・ナレッジベースとして使っている技術ブログです。`,
    author: "dnrsm",
    postsPerPage: 3,
    blogTitle: "dnrsm.dev",
    copyrights: "2020 dnrsm.dev",
    defaultTheme: "light",
    headerMenu: [
      {
        title: "Archives",
        path: "/blog",
      },
      {
        title: "About",
        path: "/about",
      },
      {
        title: "Works",
        path: "/works",
      },
      {
        title: "GitHub",
        path: "https://github.com/dnrsm",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `post`,
        path: `${__dirname}/src/post`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve("./src/components/Layout.tsx"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              quality: 100,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow noopener",
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-code-titles`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: true,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          postCSSImports(),
          postCSSNested(),
          postCssPresetEnv({
            importFrom: "src/styles/variables.css",
            stage: 1,
            preserve: false,
          }),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        content: [
          require("path").join(process.cwd(), "src/**/!(*.d).{ts,tsx,md,mdx}"),
        ],
        printRejected: true,
        develop: false,
        tailwind: true,
        whitelist: [],
        ignore: [
          "src/styles/global.css",
          "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-graphql-codegen",
      options: {
        fileName: `types/graphql-types.d.ts`,
        documentPaths: [
          "./src/**/*.{ts,tsx}",
          // "./node_modules/gatsby-*/**/*.js",
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `dnrsm.dev`,
        /* eslint-disable @typescript-eslint/camelcase */
        short_name: `dnrsm.dev`,
        start_url: `/`,
        background_color: `#292a2d`,
        theme_color: `#292a2d`,
        display: `standalone`,
        icon: `static/icon.png`,
        /* eslint-enable */
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-167551385-1",
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://dnrsm.dev`,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://dnrsm.dev",
        sitemap: "https://dnrsm.dev/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
};
