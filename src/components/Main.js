/*eslint-disable no-unused-vars*/
import React from 'react'
import Body from './Body'
import Header from './Header'

export default function Main({ handleToggle }) {
    return (
        <div className="App App-light">
        <Header handleToggle={handleToggle}/>
        <Body />
      </div>
    )
}
