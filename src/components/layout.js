import * as React from 'react'
import Header from "./header";

const Layout = ({ children, languages = [], language, logo, mainNavigation }) => {

    /*useEffect(() => {
        if (languages) {
            // updateLanguages(languages)
            // updateDefaultLanguage(languages[0])
            // updateCurrentLanguage(language)
        }
    })*/

    return (
        <div>
            <Header logo={logo} mainNavigation={mainNavigation}/>
            {children}
        </div>
    )
}

export default Layout