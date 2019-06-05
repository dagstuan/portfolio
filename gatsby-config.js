module.exports = {
  siteMetadata: {
    siteUrl: `https://dagstuan.com`,
  },
  plugins: [
    `gatsby-plugin-layout`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-less',
    {
      resolve: 'gatsby-plugin-material-ui',
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#3e3e3e',
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: '7l8161l82ab8',
        accessToken:
          '6a3d76351127260438e7129b6981988752127f3b28c7da5f12b428f414527b0f',
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: `UA-35576492-1`,
        head: true,
        anonymize: true,
      },
    },
    'gatsby-transformer-remark',
    `gatsby-plugin-force-trailing-slashes`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://dagstuan.com`,
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Cinzel:400,700', 'Lato'],
        },
      },
    },
  ],
};
