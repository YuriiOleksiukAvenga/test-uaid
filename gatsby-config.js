/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: `Test UAID`,
        siteUrl: `https://test-uaid.admin.datocms.com/`
    },
    plugins: [
        {
            resolve: 'gatsby-source-datocms',
            options: {
                "apiToken": "8a223e9a1959db43f320ae5710536e"
            }
        }, 
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp", 
        "gatsby-plugin-styled-components",
        "gatsby-plugin-sass",
        {
            resolve: `gatsby-plugin-netlify`,
            options: {
                headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
                allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
                mergeSecurityHeaders: true, // boolean to turn off the default security headers
                mergeCachingHeaders: true, // boolean to turn off the default caching headers
                transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
                generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
            },
        },
    ]
};