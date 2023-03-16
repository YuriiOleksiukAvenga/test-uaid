import * as React from 'react'
import Header from "./header";
import {useContext, useEffect} from "react";
import ThemeContext from "../context/ThemeContext";

const Layout = ({ children, languages = [], language, logo, mainNavigation }) => {

    /*useEffect(() => {
        if (languages) {
            // updateLanguages(languages)
            // updateDefaultLanguage(languages[0])
            // updateCurrentLanguage(language)
        }
    })*/

    return (
        <ThemeContext.Consumer>
            {theme => {
                theme.updateLanguages(languages)
                theme.updateDefaultLanguage(languages[0])
                theme.updateCurrentLanguage(language)
                
                return (
                    <div>
                        <Header logo={logo} mainNavigation={mainNavigation}/>
                        {children}
                    </div>
                )
            }}
            
        </ThemeContext.Consumer>
    )
}

export default Layout