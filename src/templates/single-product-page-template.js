import * as React from "react"
import Breadcrumbs from "../components/breadcrumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from 'swiper';
import { useState } from "react";
import { getImage, GatsbyImage} from "gatsby-plugin-image";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import styled from "styled-components";

const ProductSectionWrapper = styled.section`
  padding: 90px 0;
`

const ContainerWrapper = styled.div`
  max-width: 1170px;
  width: 100%;
  padding: 0 12px;
  margin: 0 auto;
`

const ProductHeadContainerWrapper = styled(ContainerWrapper)`
  display: grid;
  grid-template-columns: 60% 40%;
  grid-column-gap: 24px;
`

const ProductGalleryWrapper = styled.div`
  display: flex;
`

const SwiperWrapper = styled(Swiper)`
  max-width: 561px;
  width: 100%;

  img {
    max-width: 100%;
    height: auto;
  }
`

const ThumbsSwiperWrapper = styled(Swiper)`
  flex: 0 0 100px;
  margin-right: 20px;

  .swiper-slide {
    cursor: pointer;
  }
`

const ProductSubtitleWrapper = styled.h2`
  font-size: 24px;
  line-height: 30px;
  font-weight: 500;
  margin-bottom: 10px;
`

const ProductPriceWrapper = styled.h2`
  font-size: 30px;
  line-height: 42px;
  color: #999;
`

const ProductDesctiptionWrapper = styled.p`
  font-size: 16px;
  line-height: 27px;
  border-top: 1px solid #ddd;
  padding: 30px 0 0;
`

const SingleProductPageTemplate = ({ pageContext, data }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    
    const productData = data.datoCmsProduct;
    
    return (
        <Layout
            languages={pageContext.languages}
            language={pageContext.language}
            logo={pageContext.logo}
            mainNavigation={pageContext.mainNavigation}
        >
            <Breadcrumbs title={productData.title}/>
            <ProductSectionWrapper>
                <ProductHeadContainerWrapper>
                    <ProductGalleryWrapper >
                        <ThumbsSwiperWrapper modules={[Thumbs]}
                                watchSlidesProgress
                                onSwiper={setThumbsSwiper} 
                                slidesPerView={4} 
                                spaceBetween={20}
                                direction={'vertical'}
                        >
                            {productData.gallery && productData.gallery.map((slide, key) => {
                                const image = getImage(slide)
                                return (
                                    <SwiperSlide key={`thumb-${key}`}>
                                        <GatsbyImage image={image} alt={slide.alt}/>
                                    </SwiperSlide>
                                )
                            })}
                        </ThumbsSwiperWrapper>
                        <SwiperWrapper slidesPerView={1} spaceBetween={50} modules={[Thumbs]} thumbs={{ swiper: thumbsSwiper }}>
                            {productData.gallery && productData.gallery.map((slide, key) => {
                                const image = getImage(slide)
                                return (
                                    <SwiperSlide key={key}>
                                        <GatsbyImage image={image} alt={slide.alt}/>
                                    </SwiperSlide>
                                )
                            })}
                        </SwiperWrapper>
                    </ProductGalleryWrapper>
                    <div>
                        <ProductSubtitleWrapper>{productData.subtitle}</ProductSubtitleWrapper>
                        <ProductPriceWrapper>{productData.price}</ProductPriceWrapper>
                    </div>
                </ProductHeadContainerWrapper>
            </ProductSectionWrapper>
            
            {
                productData.description && <ProductSectionWrapper>
                    <ContainerWrapper>
                        <ProductDesctiptionWrapper>
                            {productData.description}
                        </ProductDesctiptionWrapper>
                    </ContainerWrapper>
                </ProductSectionWrapper>
            }
        </Layout>
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