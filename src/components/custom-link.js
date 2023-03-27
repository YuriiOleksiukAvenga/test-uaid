import * as React from "react"
import { Link } from "gatsby";
import ThemeContext from '../context/ThemeContext'
import styled from "styled-components"

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  color: #111;
  transition: color 0.3s;
  margin: ${props => props.margin || '0'};

  &:hover {
    color: #dcb14a;
  }
`

const CustomLink = ({ to, children, margin}) => {
    
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
                    <StyledLink to={getTranslatedPath(to)} margin={margin}>{children}</StyledLink>
                )
            }}
        </ThemeContext.Consumer>
    )
}

export default CustomLink