module.exports = {
  siteMetadata: {
    title: "Fibula d.o.o. | CNC obrada metala i plastike, glodanje, tokarenje",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-30960349-1",
      },
    },
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        useSystemColorMode: false,
        isResettingCSS: true,
        isUsingColorMode: false,
      },
    },
    "gatsby-plugin-react-helmet",
    // "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
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
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
