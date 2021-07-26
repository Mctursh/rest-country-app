import React, { Component } from 'react' //eslint-disable-line
import ThemeContext from "./ThemeContext"

export default class Loader extends Component {

    static contextType = ThemeContext
    render() {
        const theme = this.context
        return (
            <div className="loader pad">
                <div className={`lds-ripple lds-ripple-${theme}`}><div></div><div></div></div>
            </div>
        )
    }
}
