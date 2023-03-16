import * as React from "react"
import { Link } from "gatsby";

const CustomLink = ({ to, children, className = 'link' }) => {
    
    /*const getTranslatedPath = (link) => {
        if (currentLanguage === defaultLanguage) {
            return link
        } else {
            return `/${currentLanguage}${link}`
        }
    }*/
    
    return (
        <Link className={className} to={to}>{children}</Link>
    )
}

export default CustomLink