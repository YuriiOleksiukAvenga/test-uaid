import * as React from "react"
import CustomLink from "./custom-link";
import {useContext} from "react";
import ThemeContext from "../context/ThemeContext";
import { getImage, GatsbyImage } from "gatsby-plugin-image"

const ProductCardTemplate = ({product}) => {
    const { formatCurrency } = useContext(ThemeContext)
    
    const productThumb = product.hasOwnProperty('gallery') && product?.gallery?.length ? getImage(product.gallery[0]) : null
    const productAlt = productThumb && productThumb.hasOwnProperty('alt') && productThumb.alt.length ? productThumb.alt : ""
    
    return (
        <div className="product-card">
            <CustomLink to={`/${product.slug}`} className="product-card__thumb">
                {productThumb && <GatsbyImage image={productThumb} alt={productAlt}/>}
            </CustomLink>
            <h3 className="product-card__title">{product.title}</h3>
            <span className="product-card__price">{formatCurrency(product.price)}</span>
        </div>
    )
}

export default ProductCardTemplate;