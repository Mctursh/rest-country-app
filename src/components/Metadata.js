/*eslint-disable no-unused-vars */
import React, { Component } from 'react'
import ThemeContext from "./ThemeContext"
import Button from "./Button"
import { Link } from 'react-router-dom'

export default class Metadata extends Component {
    constructor (props) {
        super(props)
        
    }  

    static contextType = ThemeContext
    render() {
        console.log(this.props)
        const theme =  this.context
        const { flag, name, population, region, nativeName, subregion, capital, topLevelDomain, currencies, languages, borders, countryNames,fetchNewCountry } = this.props

        //Extracting the FullNames from the alpha3Codes    
        const extract = () => {
            const names = []
            countryNames.filter(item => {
                const [ key ] = Object.keys(item)
                borders.includes(key) ? names.push(item[key]) :  null
            })
            return names
        }
        const borderNames = borders ? extract() : []

        return (
            <div className="info-parent">
                <div className="info-image-parent">
                    <img src={flag} alt={`${name}'s flag`} />
                </div>
                <div className={`info-metadata-parent info-${theme}`}>
                    <p className="country-name" >{name}</p>
                    <div className="info-metadata-child">
                        <div>
                            <p className="rest">Native Name: <span className="value">{nativeName}</span></p>
                            <p className="rest">Population: <span className="value">{population}</span></p>
                            <p className="rest">Region: <span className="value">{region}</span></p>
                            <p className="rest">Sub Region: <span className="value">{subregion}</span></p>
                            <p className="rest">Capital: <span className="value">{capital}</span></p>
                        </div>                    
                        <div>
                            <p className="rest">Top Level Domain: <span className="value">{topLevelDomain}</span></p>
                            <p className="rest">Currencies: {currencies.map((c, idx) => <span key={idx} className="value">{idx == 0 || idx == (currencies.length - 1) ? c.name : `, ${c.name}, `}</span>)}</p>
                            <p className="rest">Languages: {languages.map((c, idx) => <span key={idx} className="value">{idx == 0 || idx == (languages.length - 1) ? c.name : `, ${c.name}, `}</span>)}</p>
                        </div>                 
                    </div>
                    {borders && <div className="border-countries">
                        <p className="rest">Border Countries:</p>
                        {borderNames.map((borderCountry, idx) => <Link onClick={() => fetchNewCountry(borderCountry.toLowerCase())} key={idx} to={`/countries/${borderCountry.toLowerCase()}`}><Button class="border" value={borderCountry} /></Link>)}
                    </div>}            
                </div>
            </div>
        )
    }
}
