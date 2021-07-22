import React from "react"
import Country from "./Country" //eslint-disable-line no-unused-vars
import FilterBox from "./FilterBox" //eslint-disable-line no-unused-vars
import Loader from "./Loader" //eslint-disable-line no-unused-vars
import SearchBox from "./SearchBox" //eslint-disable-line no-unused-vars
import chunkCountries from "./helper"
import Button from "./Button" //eslint-disable-line no-unused-vars

class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fetched : false,
            displayedChunk : 0,
            displaying: [],
            chunks: null
        }
        this.handleLoad = this.handleLoad.bind(this)
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

    componentDidMount() {
        this.getCountries()        
    }

    render() {

        const { displayedChunk, chunks, fetched, displaying } = this.state //eslint-disable-line
        return(
            <div  >
                <div className="pad body">
                    <SearchBox />
                    <FilterBox />
                </div>
                <div className="pad country-parent ">
                    {fetched &&  displaying.map(({ flag, name, population, region, capital }, index) => <Country key={index} flag={flag} name={name} population={population} region={region} capital={capital} />)}
                </div>
                {!fetched && <Loader />}
                {fetched && <Button theme={this.props.theme} handleLoad={this.handleLoad} /> }
            </div>
        )
    }
}


export default Body;