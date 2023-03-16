import * as React from "react"
import Breadcrumbs from "../components/breadcrumbs";
// import Layout from "../components/layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from 'swiper';
import {useContext, useState} from "react";
import ThemeContext from "../context/ThemeContext";
import {getImage, GatsbyImage} from "gatsby-plugin-image";
import {graphql} from "gatsby";

const SingleProductPageTemplate = ({ data }) => {
    const { formatCurrency } = useContext(ThemeContext)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    
    const productData = data.datoCmsProduct;
    
    return (
        <div>
            <Breadcrumbs title={productData.title}/>
            <section className="product__head">
                <div className="container">
                    <div className="product__gallery">
                        <Swiper modules={[Thumbs]}
                                watchSlidesProgress
                                onSwiper={setThumbsSwiper} 
                                slidesPerView={4} 
                                spaceBetween={20}
                                direction={'vertical'}
                                className="product__gallery-thumbs"
                        >
                            {productData.gallery && productData.gallery.map((slide, key) => {
                                const image = getImage(slide)
                                return (
                                    <SwiperSlide key={`thumb-${key}`}>
                                        <GatsbyImage image={image} alt={slide.alt}/>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                        <Swiper slidesPerView={1} spaceBetween={50} modules={[Thumbs]} thumbs={{ swiper: thumbsSwiper }}>
                            {productData.gallery && productData.gallery.map((slide, key) => {
                                const image = getImage(slide)
                                return (
                                    <SwiperSlide key={key}>
                                        <GatsbyImage image={image} alt={slide.alt}/>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                    <div className="product__details">
                        <h2 className="product__subtitle">{productData.subtitle}</h2>
                        <h3 className="product__price">{formatCurrency(productData.price)}</h3>
                    </div>
                </div>
            </section>
            
            {
                productData.description && <section className="product__description">
                    <div className="container">
                        <p className="product__description__text">
                            {productData.description}
                        </p>
                    </div>
                </section>
            }
        </div>
    )
}

export const query = graphql`
  query getSingleProductById($language: String, $id: String) {
    datoCmsProduct(locale: $language, id: {eq: $id}) {
      description
      price
      title
      subtitle
      gallery {
        gatsbyImageData
        alt
      }
    }
  }
`

export default SingleProductPageTemplate;