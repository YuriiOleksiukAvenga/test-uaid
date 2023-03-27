import * as React from "react"
import ProductCardTemplate from "../components/product-card-template";
import Breadcrumbs from "../components/breadcrumbs";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import styled from "styled-components";

const ProductsListWrapper = styled.div`
  max-width: 1170px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  padding: 120px 12px;
`

const ProductsPage = ({ pageContext, data }) => {
    
    return (
        <Layout
            languages={pageContext.languages}
            language={pageContext.language}
            logo={pageContext.logo}
            mainNavigation={pageContext.mainNavigation}
        >
            <Breadcrumbs/>
            <ProductsListWrapper>
                {data.allDatoCmsProduct.nodes.map(product => <ProductCardTemplate key={product.id} product={product}/>)}
            </ProductsListWrapper>
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
