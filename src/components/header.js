import * as React from "react"
import CustomLink from "./custom-link";
import ThemeContext from "../context/ThemeContext";
import { Link } from "gatsby";
import styled from "styled-components"

const HeaderWrapper = styled.header`
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 1px 1px 0 #f0f0f0;
`

const HeaderContainerWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderNavWrapper = styled.nav`
  display: flex;
`

const LangSwitcherBtnWrapper = styled.button`
  padding: 12px 15px;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${props => props.active ? 'rgba(0,0,0,0.1)' : 'transparent' };
  cursor: ${props => props.active ? 'default' : 'pointer' };
  text-decoration: none;
  color: #111;

  &:not(:last-child) {
    margin-right: 4px;
  }
`
const Header = ({ logo, mainNavigation }) => {
    return (
        <ThemeContext.Consumer>
            {(theme) => {

                const getTranslatedLangSwitcherUrl = (path, language) => {
                    path = path.replace(`/${theme.currentLanguage}`, '')
            
                    if (language === theme.defaultLanguage) {
                        return path
                    }
            
                    return `/${language}${path}`
                }
                
                return (
                    <HeaderWrapper>
                        <HeaderContainerWrapper>
                            <CustomLink to="/">
                                {logo && <img src={logo.url} alt={logo.alt}/>}
                            </CustomLink>
                            <HeaderNavWrapper>
                                {mainNavigation && mainNavigation.map((navLink) => {
                                    return (
                                        <CustomLink margin={'0 32px 0 0'} key={navLink.title} to={navLink.link}>{navLink.title}</CustomLink>
                                    )
                                })}
                            </HeaderNavWrapper>
                            <div>
                                {theme.languages && theme.languages.map((language) => {
                                    if (language === theme.currentLanguage) {
                                        return <LangSwitcherBtnWrapper active key={language}>{language}</LangSwitcherBtnWrapper>
                                    } else {
                                        return <LangSwitcherBtnWrapper
                                            as={Link}
                                            hrefLang={language}
                                            key={language}
                                            to={getTranslatedLangSwitcherUrl(window.location.pathname, language)}
                                        >
                                            {language}
                                        </LangSwitcherBtnWrapper>
                                    }
                                })}
                            </div>
                        </HeaderContainerWrapper>
                    </HeaderWrapper>
                )
            }}
        </ThemeContext.Consumer>
        
    )
    
}

export default Header;