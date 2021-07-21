import React, { Component } from 'react' //eslint-disable-line
import ThemeContext from "./ThemeContext"

export default class Country extends Component {
    constructor(props){
        super(props)

    }

    static contextType = ThemeContext

    render() {
        let theme = this.context
        const { name, flag, region, population, capital } = this.props
        return (
            <div className={`country-info country-info-${theme}`}>
                <div className="img-parent">
                    <img src={flag} alt={`${name}'s flag`} />
                </div>        
                <div className={`country-metadata metadata-${theme}`}>
                    <p id="country-name">{name}</p>
                    <p id="rest">Population: <span id="value">{population}</span></p>
                    <p id="rest">Region: <span id="value">{region}</span></p>
                    <p id="rest">Capital: <span id="value">{capital}</span></p>
                </div>
            </div>
        )
    }
}
