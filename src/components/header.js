import * as React from "react"
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import CustomLink from "./custom-link";
import { Link } from "gatsby";

const Header = ({ logo, mainNavigation }) => {
    const { languages, currentLanguage, updateCurrentLanguage, defaultLanguage } = useContext(ThemeContext);

    const handleLanguageChange = (language) => {
        updateCurrentLanguage(language)
    }
    
    const getTranslatedLangSwitcherUrl = (path, language) => {
        path = path.replace(`/${currentLanguage}`, '')
        
        if (language === defaultLanguage) {
            return path
        }
        
        return `/${language}${path}`
    }
    
    return (
        <header className="header">
            <div className="header__container">
                <CustomLink to="/" className="header__logo">
                    {logo && <img src={logo.url} alt={logo.alt}/>}
                </CustomLink>
                <nav className="header__nav">
                    {mainNavigation && mainNavigation.map((navLink) => {
                        return (
                            <CustomLink className="header__nav-link" key={navLink.title} to={navLink.link}>{navLink.title}</CustomLink>
                        )
                    })}
                </nav>
                <div className="lang-switcher">
                    {languages.map((language) => {
                        if (language === currentLanguage) {
                            return <button key={language} className="lang-switcher__btn active">{language}</button>
                        } else {
                            return <Link
                                    hrefLang={language}
                                    key={language} 
                                    to={getTranslatedLangSwitcherUrl(window.location.pathname, language)}
                                    onClick={() => {handleLanguageChange(language)}}
                                    className="lang-switcher__btn"
                                    >
                                        {language}
                                    </Link>
                        }
                    })}
                </div>
            </div>
        </header>
    )
    
}

export default Header;