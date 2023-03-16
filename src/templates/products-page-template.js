import * as React from "react"
import ProductCardTemplate from "../components/product-card-template";
import Breadcrumbs from "../components/breadcrumbs";
import Layout from "../components/layout";
import { getTranslatedText } from "../i18n";
import {graphql} from "gatsby";

const ProductsPage = ({ pageContext, data }) => {
    
    const productsListStyles = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridColumnGap: "24px",
        gridRowGap: "24px",
        padding: "120px 12px"
    }
    
    return (
        <Layout
            languages={pageContext.languages}
            language={pageContext.language}
            logo={pageContext.logo}
            mainNavigation={pageContext.mainNavigation}
        >
            <Breadcrumbs title={getTranslatedText(pageContext.language, 'products')}/>
            <div style={productsListStyles} className="container">
                {data.allDatoCmsProduct.nodes.map(product => <ProductCardTemplate key={product.id} product={product}/>)}
            </div>
        </Layout>
    )
}

export default ProductsPage

export const query = graphql`
    query getAllProducts($language: String) {
      allDatoCmsProduct(locale: $language) {
        nodes {
          price
          title
          id
          slug
          gallery {
            gatsbyImageData
            alt
          }
        }
      }
    }
`

export const Head = () => <title>Products Page</title>
