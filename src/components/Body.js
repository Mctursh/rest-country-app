/*eslint-disable no-unused-vars */
import React from "react"
import Country from "./Country" 
import FilterBox from "./FilterBox" 
import Loader from "./Loader"
import SearchBox from "./SearchBox"
import { fetchCountry, loadMore, search, filter } from "./helper"
import Button from "./Button" 
import NotFound from "./NotFound"

class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chunksFormed : Infinity,
            fetched : false,
            error: false,
            errorMsg: "",
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
        this.retry = this.retry.bind(this)
    }

    getCountries () {
        fetchCountry(this)    
    }

    retry() {
        this.setState({error: false})
        fetchCountry(this)
    }

    handleLoad() {
        loadMore(this)
    }

    handleSearch (str) {
        search(str, this)    
    }

    handleFilter (region) {
        filter(region, this)
    }

    componentDidMount() {
        this.getCountries()
    }

    render() {
        const { errorMsg, error, chunksFormed, displayedChunk, fetched, displaying, isSearching, isFiltered, filteredChunksFormed, currentRegion, notFound } = this.state //eslint-disable-line

        return(
            <div  >
                    <div className="pad body">
                        <SearchBox handleSearch={this.handleSearch}/>
                        <FilterBox handleFilter={this.handleFilter} currentRegion={currentRegion}/>
                    </div>
                    {error && <NotFound value={errorMsg} theme={this.props.theme} >
                        <Button value="Try Again" handleClick={this.retry}/>
                        </NotFound>}
                    <div className="pad country-parent ">
                        {fetched || isSearching && !notFound || isFiltered  ?  displaying.map(({ flag, name, population, region, capital, nativeName }, index) => <Country key={index} nativeName={nativeName} flag={flag} name={name} population={population} region={region} capital={capital} />) : null}
                    </div>
                    {!fetched && !isSearching && !isFiltered && !error && <Loader />}
                    {fetched && !isSearching && displayedChunk < chunksFormed && <Button value="Load More" handleClick={this.handleLoad} /> }
                    {isFiltered && displayedChunk < filteredChunksFormed && <Button value="Load More" handleClick={this.handleLoad} />}
                    {notFound && <NotFound value="No Country Match" theme={this.props.theme}/>}
                </div>
            
            
        )
    }
}


export default Body;