/*eslint-disable no-unused-vars*/
import React, { useContext } from 'react'
import Body from './Body'
import Header from './Header'
import ThemeContext from "./ThemeContext"

export default function Main({ handleToggle }) {

    const theme = useContext(ThemeContext)
    
    return (
        <div className={`App App-${theme}`}>
            <Header handleToggle={handleToggle}/>
            <Body theme={theme}/>
        </div>
    )
}
