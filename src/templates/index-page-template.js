import * as React from 'react'
import Layout from "../components/layout";
import { Swiper, SwiperSlide } from "swiper/react";
import CustomLink from "../components/custom-link";
import {graphql} from "gatsby";

const IndexPage = ({ pageContext, data }) => {
    const homepageSlider = data?.datoCmsHomePage?.slider;

    return (
        <Layout 
            languages={pageContext.languages} 
            language={pageContext.language}
            logo={pageContext.logo}
            mainNavigation={pageContext.mainNavigation}
        >
            <main>
                {
                    homepageSlider && <Swiper className="home-slider">
                        {homepageSlider.map((slide) => {
                            return (
                                <SwiperSlide key={slide.id}>
                                    <div className="home-slider__bg"
                                         style={{backgroundImage: `url(${slide.backgroundImage.url})`}}>
                                        <div className="container">
                                            <h2 className="home-slider__title">{slide.title}</h2>
                                            <p className="home-slider__subtitle">{slide.subtitle}</p>
                                            <CustomLink className="home-slider__action" to={`/${slide.link.slug}`}>
                                                {/*{getTranslatedText(currentLanguage, 'discoverNow')}*/}
                                            </CustomLink>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                }
            </main>
        </Layout>
    )
}

export const query = graphql`
    query HomePage($language: String) {
      datoCmsHomePage(locale: $language) {
        slider {
          id
          title
          subtitle
          backgroundImage {
            alt
            url
          }
          link {
            title
            slug
          }
        }
      }
    }
`

export default IndexPage