/*eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Button from './Button'
import ThemeContext from "./ThemeContext"

export default class CountryPage extends Component {
    static contextType = ThemeContext
    render() {
        const theme = this.context
        return (
            <div className="pad">
                <div className="back">
                    <Button value='Back' class="back-btn" />
                </div>
                <div className="info-parent">
                    <div className="info-image-parent">
                        <img src="9ja.PNG" alt="9ja-flag" />
                    </div>
                    <div className={`info-metadata-parent info-${theme}`}>
                        <p className="country-name" >Nigeria</p>
                        <div className="info-metadata-child">
                            <div>
                                <p className="rest">Native Name: <span className="value">Nigeria</span></p>
                                <p className="rest">Population: <span className="value">11319511</span></p>
                                <p className="rest">Region: <span className="value">Africa</span></p>
                                <p className="rest">Sub Region: <span className="value">West Africa</span></p>
                                <p className="rest">Capital: <span className="value">Abuja</span></p>
                            </div>                    
                            <div>
                                <p className="rest">Top Level Domain: <span className="value">.be</span></p>
                                <p className="rest">Currencies: <span className="value">Euro</span></p>
                                <p className="rest">Languages: <span className="value">Dutch, French, German</span></p>
                            </div>                 
                        </div>
                        <div className="border-countries">
                            <p className="rest">Border Countries:</p>
                            <Button value="France" />
                            <Button value="Germany" />
                            <Button value="Netherlands" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
