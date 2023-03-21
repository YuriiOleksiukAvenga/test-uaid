import * as React from 'react'
import Header from "./header";
import ThemeContext from '../context/ThemeContext'
import { useContext, useEffect } from "react";

const Layout = ({ children, languages = [], language, logo, mainNavigation }) => {
    
    const {updateLanguages, updateCurrentLanguage, updateDefaultLanguage} = useContext(ThemeContext)
    
    useEffect(() => {
        updateLanguages(languages)
        updateCurrentLanguage(language)
        updateDefaultLanguage(languages[0])
    }, [languages, language])
    
    return (
        <div>
            <Header logo={logo} mainNavigation={mainNavigation}/>
            {children}
        </div>
        
    )
}

export default Layout