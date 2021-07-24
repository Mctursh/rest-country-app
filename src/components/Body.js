/*eslint-disable no-unused-vars */
import React from "react"
import Country from "./Country" 
import FilterBox from "./FilterBox" 
import Loader from "./Loader"
import SearchBox from "./SearchBox"
import chunkArrays, { SearchAlgo } from "./helper"
import Button from "./Button" 
import NotFound from "./NotFound"

class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chunksFormed : Infinity,
            fetched : false,
            displayedChunk : 0,
            displaying: [],
            chunks: null,
            isSearching: false,
            notFound: false,
            isFiltered: false,
            currentRegion: "All",
            filteredChunks: null,
            filteredChunksFormed : Infinity
        }
        this.handleLoad = this.handleLoad.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
    }

    getCountries () {
        const fetchCountry = () => {

            const xhr = new XMLHttpRequest()

            xhr.open("GET", "https://restcountries.eu/rest/v2/all", true)
            
            xhr.onload = () => {
                if (xhr.status == 200) {
                    let countries = JSON.parse(xhr.responseText)

                    //reducing the arrays into smaller chunks
                    const chunks = chunkArrays(countries, 12)

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

            //checking to see if the app is currently been filtered or not
            if (this.state.fetched){
                //getting the array of already displayed countries
                
                return {
                    displayedChunk: prev.displayedChunk + 1,

                    //adding the previous chunks to the next chunk to be displayed
                    displaying :[...curr, ...prev.chunks[prev.displayedChunk + 1]]
                }
                
            } else if (this.state.isFiltered) {
                return {
                    displayedChunk: prev.displayedChunk + 1,

                    //adding the previous chunks to the next chunk to be displayed
                    displaying :[...curr, ...prev.filteredChunks[prev.displayedChunk + 1]]
                }
            }
            
        })
    }

    handleSearch (str) {
        const processSearch = (countryNames) => {            
            const match = SearchAlgo(countryNames, str)
            if (match.length > 0){
                const matchedCountries = [].concat.apply([], this.state.chunks).filter((item) => match.includes(item.name))
                this.setState({displaying: matchedCountries})
            } else {
                this.setState({notFound: true})
                console.log("no match");
            }
            
        }
        //checking the length of the query string to know how to process
        if(str.length == 1) {
            this.setState({isSearching: true, fetched: false, isFiltered: false, notFound: false})
            // this flattens the chunks into a single array
            let nameArray = [].concat.apply([], this.state.chunks).map((item) => item.name) 
            processSearch(nameArray)
        }   else if (str.length > 1) {
            let nameArray = [].concat.apply([], this.state.displaying).map((item) => item.name)
            processSearch(nameArray)
        } else {
            this.setState({fetched: true, isSearching: false, isFiltered: false, displaying: this.state.chunks[0], displayedChunk: 0, notFound: false})
            this.handleFilter("All")
        }

        
    }

    handleFilter (region) {
        const process = () => {
            this.setState({fetched: false, isSearching: false, isFiltered: true})
            const matchedRegions = [].concat.apply([], this.state.chunks).filter((item) => item.region == region)
            const chunkedRegions = chunkArrays(matchedRegions, 12)
            this.setState({filteredChunks: chunkedRegions, displaying: chunkedRegions[0], displayedChunk: 0, filteredChunksFormed: chunkedRegions.length - 1, currentRegion: region})
        }
        region == "All" ? this.setState({currentRegion: "All"}) : process()
    }

    componentDidMount() {
        this.getCountries()
    }

    render() {
        const { chunksFormed, displayedChunk, fetched, displaying, isSearching, isFiltered, filteredChunksFormed, currentRegion, notFound } = this.state //eslint-disable-line

        return(
            <div  >
                <div className="pad body">
                    <SearchBox handleSearch={this.handleSearch}/>
                    <FilterBox handleFilter={this.handleFilter} currentRegion={currentRegion}/>
                </div>
                <div className="pad country-parent ">
                    {fetched || isSearching && !notFound || isFiltered  ?  displaying.map(({ flag, name, population, region, capital }, index) => <Country key={index} flag={flag} name={name} population={population} region={region} capital={capital} />) : null}
                </div>
                {!fetched && !isSearching && !isFiltered && <Loader />}
                {fetched && !isSearching && displayedChunk < chunksFormed && <Button theme={this.props.theme} handleLoad={this.handleLoad} /> }
                {isFiltered && displayedChunk < filteredChunksFormed && <Button theme={this.props.theme} handleLoad={this.handleLoad} />}
                {notFound && <NotFound theme={this.props.theme}/>}
            </div>
        )
    }
}


export default Body;