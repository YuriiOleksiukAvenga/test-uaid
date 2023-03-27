import * as React from "react"
import CustomLink from "./custom-link";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";

const ProductCardWrapper = styled.div`
    text-align: center;
`

const ProductThumbWrapper = styled(GatsbyImage)`
  width: 100%;
  height: auto;
`

const ProductPriceWrapper = styled.span`
  color: #666;
  font-size: 18px;
`

const ProductCardTemplate = ({product}) => {
    const productThumb = product.hasOwnProperty('gallery') && product?.gallery?.length ? getImage(product.gallery[0]) : null
    const productAlt = productThumb && productThumb.hasOwnProperty('alt') && productThumb.alt.length ? productThumb.alt : ""
    
    return (
        <ProductCardWrapper>
            <CustomLink margin={'0 0 20px'} to={`/${product.slug}`}>
                {productThumb && <ProductThumbWrapper image={productThumb} alt={productAlt}/>}
            </CustomLink>
            <CustomLink margin={'0 0 5px'} to={`/${product.slug}`}>{product.title}</CustomLink>
            <ProductPriceWrapper>{product.price}</ProductPriceWrapper>
        </ProductCardWrapper>
    )
}

export default ProductCardTemplate;