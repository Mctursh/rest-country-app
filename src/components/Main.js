/*eslint-disable no-unused-vars*/
import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom"
import Body from './Body'
import CountryPage from './CountryPage'
import Header from './Header'
import ThemeContext from "./ThemeContext"
import NotFound from "./NotFound"

// const BrowserHistory = require('react-router/lib/BrowserHistory').default;

export default function Main({ handleToggle }) {

    const theme = useContext(ThemeContext)
    let history = useHistory();

    // @bobheadxi
        // Add basename configuration for gh-pages
    
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL} history={history}>
            <div className={`App App-${theme}`}>
                <Header handleToggle={handleToggle}/>
                <Switch >
                    <Route exact path="/">
                        <Body theme={theme} />
                    </Route>                    
                    <Route path="/countries/:country" component={CountryPage} />
                    <Route>
                        <NotFound theme={theme} />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}
