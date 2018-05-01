module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-less',
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
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-35576492-1',
        anonymize: false,
      },
    },
  ],
};
