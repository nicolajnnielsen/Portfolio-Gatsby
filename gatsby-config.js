module.exports = {
  siteMetadata: {
    title: "Nicolaj N. Nielsen Portfolio",
    titleTemplate: "%s | Nicolaj N. Nielsen",
    description: "My personal web development portfolio.",
    author: "Nicolaj N. Nielsen",
    url: "https://nicolajnielsen.dev"
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: 'Nicolaj N. Nielsen Portfolio',
        short_name: 'N.N. Portfolio',
        description: 'Personal portfolio of Nicolaj N. Nielsen, front-end developer.',
        lang: 'en',
        start_url: '/',
        background_color: '#171717',
        theme_color: '#171717',
        display: 'minimal-ui',

        icon: "src/images/logo.svg",
      },
    },
    "gatsby-transformer-remark",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "projects",
        path: `${__dirname}/src/projects/`,
      },
      __key: "projects",
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/,
        }
      }
    },
    {
      resolve: `gatsby-plugin-transition-link`,
      options: {
        layout: require.resolve(`./src/components/layout.js`)
      }
    }
  ],
};
