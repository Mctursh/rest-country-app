import React, { Component } from 'react' //eslint-disable-line
import ThemeContext from "./ThemeContext"

export default class Country extends Component {
    constructor(props){
        super(props)
    }

    static contextType = ThemeContext

    render() {
        let theme = this.context
        return (
            <div className={`country-info country-info-${theme}`}>
                <img src="9ja.PNG" alt="9ja flag" />
                <div className={`country-metadata metadata-${theme}`}>
                    <p id="country-name">Nigeria</p>
                    <p id="rest">Population: <span id="value">333,400</span></p>
                    <p id="rest">Region: <span id="value">Africa</span></p>
                    <p id="rest">Capital: <span id="value">Abuja</span></p>
                </div>
            </div>
        )
    }
}
