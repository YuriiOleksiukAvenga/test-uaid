const path = require("path");

exports.createPages = async ({actions, graphql}) => {
    const {createPage} = actions;
    const indexPageTemplate = path.resolve('./src/templates/index-page-template.js');
    const productsPageTemplate = path.resolve('./src/templates/products-page-template.js');
    const singleProductPageTemplate = path.resolve('./src/templates/single-product-page-template.js');

    /*
    * Query should be like that:
    * query Locales {
    *   _site {
    *       locales
    *   }
    * }
    * 
    * But it's not working for me
    * */
    await graphql(`
    {
        datoCmsSiteSetting {
            logo {
                alt
                url
            }
            mainNavigation {
                link
                title
            }
        }
        allDatoCmsSite {
            nodes {
                locales
            }
        }
    }
    `).then((result) => {
        if (result.errors) {
            reject(result.errors)
        }

        // const datocmsSetting = async 
        
        const languages = result.data.allDatoCmsSite['nodes'][0].locales
        const defaultLanguage = languages[0]

        languages.forEach((language) => {
            
            const websiteSettings = graphql(`
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
            `).then((result) => {
                const logo = result.data.datoCmsSiteSetting.logo;
                const mainNavigation = result.data.datoCmsSiteSetting.mainNavigation;
                
                const productPages = graphql(`
            {
                allDatoCmsProduct(locale: "${language}") {
                    nodes {
                        id
                        slug
                    }
                }
            }
        `)
                    .then((result) => {
                        if (result.errors) {
                            Promise.reject(result.errors);
                        }

                        const products = result.data.allDatoCmsProduct.nodes

                        // Create single product pages
                        products.forEach((productPage) => {
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
                        });
                    })

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

                // Create index page
                /*let indexPagePath = '/'

                if (language !== defaultLanguage) {
                    indexPagePath = `${language}`
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
                });*/
            })

           
        })
    })


}

