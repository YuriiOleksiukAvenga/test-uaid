import * as React from "react"
import {createContext, useEffect, useState} from "react";

const deffaultState = {
    languages: [],
    currentLanguage: '',
    defaultLanguage: '',
    updateLanguages: () => {},
    updateCurrentLanguage: () => {},
    formatCurrency: () => {},
    updateDefaultLanguage: () => {},
}

const ThemeContext =  createContext(deffaultState)

function ThemeProvider({ children }) {
    const [languages, setLanguages] = useState([])
    const [currentLanguage, setCurrentLanguage] = useState(null)
    const [defaultLanguage, setDefaultLanguage] = useState(null);
    
    const valueToShare = {
        languages,
        updateLanguages: (languagesArr) => {
            setLanguages(languagesArr);
        },
        currentLanguage,
        updateCurrentLanguage: (newLanguage) => {
            setCurrentLanguage(newLanguage);
        },
        formatCurrency: (productPrice) => {
            if (currentLanguage === 'uk') {
                return `${ Math.floor(productPrice * 40) } грн.`
            } else if (currentLanguage === 'es') {
                return `${ Math.floor(productPrice * 0.93) } €.`
            } else {
                return `${productPrice} $`
            }
        },
        defaultLanguage,
        updateDefaultLanguage: (defaultLanguage) => {
            setDefaultLanguage(defaultLanguage);
        }
    }
    
    return (
        <ThemeContext.Provider value={valueToShare}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeProvider}
export default ThemeContext