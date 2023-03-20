import React, {useState} from "react"

const defaultState = {
    languages: [],
    currentLanguage: '',
    defaultLanguage: '',
    updateLanguages: () => {},
    updateCurrentLanguage: () => {},
    updateDefaultLanguage: () => {},
}

const ThemeContext = React.createContext(defaultState)


const ThemeProvider = ({ children }) => {
    const [languages, setLanguages] = useState([])
    const [currentLanguage, setCurrentLanguage] = useState('')
    const [defaultLanguage, setDefaultLanguage] = useState('')
    
    const updateLanguages = (languages) => {
        console.log('updateLanguages >>> ', languages)
        setLanguages(languages)
    }

    const updateCurrentLanguage = (language) => {
        setCurrentLanguage(language)
    }

    const updateDefaultLanguage = (language) => {
        setDefaultLanguage(language)
    }
    
    const valueToShare = {
        languages,
        currentLanguage,
        defaultLanguage,
        updateLanguages: updateLanguages,
        updateCurrentLanguage: updateCurrentLanguage,
        updateDefaultLanguage: updateDefaultLanguage,
    }


    return (
        <ThemeContext.Provider
            value={valueToShare}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext

export { ThemeProvider }