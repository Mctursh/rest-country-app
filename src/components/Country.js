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
                    <p className="country-name">{name}</p>
                    <p className="rest">Population: <span className="value">{population}</span></p>
                    <p className="rest">Region: <span className="value">{region}</span></p>
                    <p className="rest">Capital: <span className="value">{capital}</span></p>
                </div>
            </div>
        )
    }
}
