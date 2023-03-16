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
        "gatsby-plugin-sass"
    ]
};