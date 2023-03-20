const path = require("path");

exports.createPages = async ({actions, graphql}) => {
    const {createPage, createRedirect} = actions;
    const indexPageTemplate = path.resolve('./src/pages/index.js');
    const productsPageTemplate = path.resolve('./src/templates/products-page-template.js');
    const singleProductPageTemplate = path.resolve('./src/templates/single-product-page-template.js');

    const websiteLocales = await graphql(`
    {
        allDatoCmsSite {
            nodes {
                locales
            }
        }
    }
    `)

    const languages = websiteLocales.data.allDatoCmsSite['nodes'][0].locales
    const defaultLanguage = languages[0]

    const promises = languages.map(async (language) => {
        const websiteSettings = await graphql(`
                {
                    datoCmsSiteSetting {
                      logo {
                        alt
                        url
                      }
                      mainNavigation(locale: "${language}") {
                        link
                        title
                      }
                    }
                }
            `)

        const logo = websiteSettings.data.datoCmsSiteSetting.logo;
        const mainNavigation = websiteSettings.data.datoCmsSiteSetting.mainNavigation;
        
        
        // Create index page
        let indexPagePath = '/'

        if (language !== defaultLanguage) {
            indexPagePath = `/${language}`
        }

        createPage({
            path: indexPagePath,
            component: indexPageTemplate,
            context: {
                language: language,
                languages,
                logo,
                mainNavigation
            },
            defer: true
        });

        // Create products page
        let productPagePath = 'products';

        if (language !== defaultLanguage) {
            productPagePath = `${language}/${productPagePath}`
        }

        createPage({
            path: productPagePath,
            component: productsPageTemplate,
            context: {
                language: language,
                languages,
                logo,
                mainNavigation
            },
            defer: true
        });
        
        const products = await graphql(`
            {
                allDatoCmsProduct(locale: "${language}") {
                    nodes {
                        id
                        slug
                    }
                }
            }
        `)

        const productsPromises = products.data.allDatoCmsProduct.nodes.map((productPage) => {
            let path = productPage.slug;

            if (language !== defaultLanguage) {
                path = `${language}/${path}`
            }

            createPage({
                path,
                component: singleProductPageTemplate,
                context: {
                    id: productPage.id,
                    language: language,
                    languages,
                    logo,
                    mainNavigation
                },
                defer: true
            });
        })
        
        await Promise.all(productsPromises)
    })

    await Promise.all(promises)
    
}