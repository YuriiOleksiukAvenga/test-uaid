import * as React from "react"
import { Link } from "gatsby";
import ThemeContext from '../context/ThemeContext'

const CustomLink = ({ to, children, className = 'link' }) => {
    return (
        <ThemeContext.Consumer>
            {theme => {
                const getTranslatedPath = (link) => {
                    if (theme.currentLanguage === theme.defaultLanguage) {
                        return link
                    } else {
                        return `/${theme.currentLanguage}${link}`
                    }
                }
                
                return (
                    <Link className={className} to={getTranslatedPath(to)}>{children}</Link>
                )
            }}
        </ThemeContext.Consumer>
    )
}

export default CustomLink