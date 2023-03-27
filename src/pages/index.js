import * as React from 'react'
import Layout from "../components/layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { graphql } from "gatsby";
import styled from "styled-components";

const IndexPage = ({data, pageContext}) => {
    const homepageSlider = data?.datoCmsHomePage?.slider;
    
    const logo = data.datoCmsSiteSetting.logo
    const mainNavigation = data.datoCmsSiteSetting.mainNavigation
    const languages = data.allDatoCmsSite.nodes[0].locales;
    const currentLanguage = pageContext.hasOwnProperty('language') ? pageContext.language : languages[0];
    
    const SlideBgWrapper = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f4f5f7;
      height: calc(100vh - 90px);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center bottom;
      text-align: center;
    `

    const ContainerWrapper = styled.div`
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 12px;
    `
    
    const SliderTitleWrapper = styled.h2`
      font-size: 60px;
      line-height: 1.1;
      color: #111;
      margin-bottom: 30px;
    `

    const SliderSubtitleWrapper = styled.h2`
      font-size: 16px;
      line-height: 28px;
      display: inline-block;
      max-width: 550px;
      margin: 0 auto 60px;
    `

    return (
        <Layout 
            languages={languages}
            language={currentLanguage}
            logo={logo}
            mainNavigation={mainNavigation}
        >
            <main>
                {
                    homepageSlider && <Swiper>
                        {homepageSlider.map((slide) => {
                            return (
                                <SwiperSlide key={slide.id}>
                                    <SlideBgWrapper
                                         style={{backgroundImage: `url(${slide.backgroundImage.url})`}}>
                                        <ContainerWrapper>
                                            <SliderTitleWrapper>{slide.title}</SliderTitleWrapper>
                                            <SliderSubtitleWrapper>{slide.subtitle}</SliderSubtitleWrapper>
                                        </ContainerWrapper>
                                    </SlideBgWrapper>
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