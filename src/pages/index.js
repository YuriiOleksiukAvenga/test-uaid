import * as React from 'react'
import Layout from "../components/layout";
import { Swiper, SwiperSlide } from "swiper/react";
import CustomLink from "../components/custom-link";
import { graphql } from "gatsby";

const IndexPage = ({data, pageContext}) => {
    const homepageSlider = data?.datoCmsHomePage?.slider;
    
    const logo = data.datoCmsSiteSetting.logo
    const mainNavigation = data.datoCmsSiteSetting.mainNavigation
    const languages = data.allDatoCmsSite.nodes[0].locales;
    const currentLanguage = pageContext.hasOwnProperty('language') ? pageContext.language : languages[0]

    return (
        <Layout 
            languages={languages}
            language={currentLanguage}
            logo={logo}
            mainNavigation={mainNavigation}
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
      datoCmsSiteSetting {
        logo {
          alt
          url
        }
        mainNavigation(locale: $language) {
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
`

export default IndexPage