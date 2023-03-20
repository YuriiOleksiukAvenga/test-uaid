import * as React from "react"
import ProductCardTemplate from "../components/product-card-template";
import Breadcrumbs from "../components/breadcrumbs";
import Layout from "../components/layout";
import { graphql } from "gatsby";

const ProductsPage = ({ pageContext, data }) => {
    
    return (
        <Layout
            languages={pageContext.languages}
            language={pageContext.language}
            logo={pageContext.logo}
            mainNavigation={pageContext.mainNavigation}
        >
            <Breadcrumbs/>
            <div className="container product-list">
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
