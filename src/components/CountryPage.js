/*eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Button from './Button'
import { getCountry } from './helper'
import Loader from './Loader'
import Metadata from './Metadata'
import NotFound from "./NotFound"
import ThemeContext from "./ThemeContext"


export default class CountryPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            fetched: false,
            country: [],
            error: false,
            errorMsg: "",
            countryNames: ""
        }

        this.fetchSelected = this.fetchSelected.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.retry = this.retry.bind(this)  
    }
    
    handleBack() {
        this.props.history.goBack()
    }

    fetchSelected (country){
        getCountry(this, country)
    }

    retry() {
        this.setState({error: false})
        getCountry(this, this.props.match.params.country)
    }

    componentDidMount() {
       this.fetchSelected(this.props.match.params.country)    
    }

    static contextType = ThemeContext
    
    render() {
        const { fetched, country, error, errorMsg, countryNames } = this.state
        const theme = this.context
        return (

            <div className="pad">
                <div className="back">
                    <Button handleClick={this.handleBack} value='Back' class="back-btn" />
                </div>
                {error && <NotFound value={errorMsg} theme={theme} >
                    <Button value="Try Again" handleClick={this.retry}/>
                    </NotFound>}
                {fetched && country.map(({ flag, name, population, region, nativeName, subregion, capital, topLevelDomain, currencies, languages, borders }, idx) => <Metadata key={idx} fetchNewCountry={this.fetchSelected} countryNames={countryNames} flag={flag} name={name} population={population} region={region} nativeName={nativeName} subregion={subregion} capital={capital} topLevelDomain={topLevelDomain} currencies={currencies} languages={languages} borders={borders} /> ) } 
                {!fetched && !error && <Loader />}
            </div>
        )
    }
}
