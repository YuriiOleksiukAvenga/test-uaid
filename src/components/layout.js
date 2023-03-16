import * as React from 'react'
import Header from "./header";
import {useContext, useEffect} from "react";
import ThemeContext from "../context/ThemeContext";

const Layout = ({ children, languages = [], language, logo, mainNavigation }) => {
    // const { updateLanguages, updateCurrentLanguage, updateDefaultLanguage } = useContext(ThemeContext);

    useEffect(() => {
        if (languages) {
            // updateLanguages(languages)
            // updateDefaultLanguage(languages[0])
            // updateCurrentLanguage(language)
        }
    })

    return (
        <div>
            <Header logo={logo} mainNavigation={mainNavigation}/>
            {children}
        </div>
    )
}

export default Layout