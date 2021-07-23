/*eslint-disable no-unused-vars */
import React from "react"
import Country from "./Country" 
import FilterBox from "./FilterBox" 
import Loader from "./Loader"
import SearchBox from "./SearchBox"
import chunkCountries, { SearchAlgo } from "./helper"
import Button from "./Button" 

class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chunksFormed : Infinity,
            fetched : false,
            displayedChunk : 0,
            displaying: [],
            chunks: null,
            isSearching: false
        }
        this.handleLoad = this.handleLoad.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    getCountries () {
        const fetchCountry = () => {

            const xhr = new XMLHttpRequest()

            xhr.open("GET", "https://restcountries.eu/rest/v2/all", true)
            
            xhr.onload = () => {
                if (xhr.status == 200) {
                    let countries = JSON.parse(xhr.responseText)
                    const chunks = chunkCountries(countries, 12)
                    this.setState({
                        chunksFormed: chunks.length - 1,
                        chunks,
                        displaying: chunks[0],
                        fetched: true
                    })
                    
                } else {
                    // Handles server response error
                    console.log("Server responded with an error");
                }
            }

            // Handles network errors
            xhr.onerror = function() {
                console.log("network error");
            }
            
            xhr.send()
        }
        fetchCountry()

    }

    handleLoad() {
        this.setState((prev) => {
            let curr = prev.displaying
            return {
                displayedChunk: prev.displayedChunk + 1,
                displaying :[...curr, ...prev.chunks[prev.displayedChunk + 1]]
            }
        })
    }

    handleSearch (str) {
        const process = (countryNames) => {            
            const match = SearchAlgo(countryNames, str)
            const matchedCountries = [].concat.apply([], this.state.chunks).filter((item) => match.includes(item.name))
            this.setState({displaying: matchedCountries})
        }
        if(str.length == 1) {
            this.setState({isSearching: true, fetched: false})
            let nameArray = [].concat.apply([], this.state.chunks).map((item) => item.name)
            process(nameArray)
        }   else if (str.length > 1) {
            let nameArray = [].concat.apply([], this.state.displaying).map((item) => item.name)
            process(nameArray)
        } else {
            this.setState({fetched: true, isSearching: false, displaying: this.state.chunks[0], displayedChunk: 0})
        }

        
    }

    componentDidMount() {
        this.getCountries()
    }

    render() {
        const { chunksFormed, displayedChunk, fetched, displaying, isSearching } = this.state //eslint-disable-line

        return(
            <div  >
                <div className="pad body">
                    <SearchBox handleSearch={this.handleSearch}/>
                    <FilterBox />
                </div>
                <div className="pad country-parent ">
                    {fetched || isSearching ?  displaying.map(({ flag, name, population, region, capital }, index) => <Country key={index} flag={flag} name={name} population={population} region={region} capital={capital} />) : null}
                </div>
                {!fetched && !isSearching && <Loader />}
                {fetched && !isSearching && displayedChunk < chunksFormed && <Button theme={this.props.theme} handleLoad={this.handleLoad} /> }
            </div>
        )
    }
}


export default Body;