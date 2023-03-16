import * as React from "react"
import { Link } from "gatsby";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const CustomLink = ({ to, children, className = 'link' }) => {
    const { currentLanguage, defaultLanguage } = useContext(ThemeContext);
    
    const getTranslatedPath = (link) => {
        if (currentLanguage === defaultLanguage) {
            return link
        } else {
            return `/${currentLanguage}${link}`
        }
    }
    
    return (
        <Link className={className} to={getTranslatedPath(to)}>{children}</Link>
    )
}

export default CustomLink