import * as React from 'react'
import Header from "./header";
import ThemeContext from '../context/ThemeContext'
import { useContext, useEffect } from "react";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, p, ol, ul, li, dl, dt, dd, blockquote, figure, fieldset, legend, textarea, pre, iframe, hr, h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: normal;
  }

  ul {
    list-style: none;
  }

  button, input, select {
    margin: 0;
  }

  html {
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  img, video {
    height: auto;
    max-width: 100%;
  }

  body {
    padding-top: 90px;
  }
`

const Layout = ({ children, languages = [], language, logo, mainNavigation }) => {
    
    const {updateLanguages, updateCurrentLanguage, updateDefaultLanguage} = useContext(ThemeContext)
    
    useEffect(() => {
        updateLanguages(languages)
        updateCurrentLanguage(language)
        updateDefaultLanguage(languages[0])
    }, [languages, language])
    
    return (
        <div>
            <GlobalStyle/>
            <Header logo={logo} mainNavigation={mainNavigation}/>
            {children}
        </div>
        
    )
}

export default Layout