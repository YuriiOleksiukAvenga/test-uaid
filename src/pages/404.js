import * as React from "react"
import Layout from "../components/layout";
import CustomLink from "../components/custom-link";
import { useEffect, useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";

const NotFoundPage = () => {
    const ghostEyes = useRef(null)
    
    const data = useStaticQuery(graphql`
        {
            datoCmsSiteSetting {
                logo {
                    alt
                    url
                }
                mainNavigation {
                    link
                    title
                }
            }
        }
    `)
    
    useEffect(() => {
        let pageX = window.innerWidth;
        let pageY = window.innerHeight;
        let mouseY=0;
        let mouseX=0;
        
        const handleMouseMove = (event) => {
            let mouseY = event.pageY;
            let yAxis = (pageY/2-mouseY)/pageY*300;
            //horizontalAxis
            let mouseX = event.pageX / -pageX;
            let xAxis = -mouseX * 100 - 100;

            ghostEyes.current.style.transform = `translate(${xAxis}%, -${yAxis}%)`;
        }
        
        window.addEventListener('mousemove', handleMouseMove)
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
        
        
    }, [])
    
    return (
        <Layout
            languages={[]}
            // language={pageContext.language}
            logo={data.datoCmsSiteSetting.logo}
            mainNavigation={data.datoCmsSiteSetting.mainNavigation}
        >
            <main className="not-found-page">
                <div className="box">
                    <div className="box__ghost">
                        <div className="symbol"></div>
                        <div className="symbol"></div>
                        <div className="symbol"></div>
                        <div className="symbol"></div>
                        <div className="symbol"></div>
                        <div className="symbol"></div>

                        <div className="box__ghost-container">
                            <div ref={ghostEyes} className="box__ghost-eyes">
                                <div className="box__eye-left"></div>
                                <div className="box__eye-right"></div>
                            </div>
                            <div className="box__ghost-bottom">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div className="box__ghost-shadow"></div>
                    </div>

                    <div className="box__description">
                        <div className="box__description-container">
                            <div className="box__description-title">Whoops!</div>
                            <div className="box__description-text">It seems like we couldn't find the page you were looking
                                for
                            </div>
                        </div>
                        
                        <CustomLink to="/" className="box__button">Go Home</CustomLink>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
