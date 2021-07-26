const ChunkCountries = (arr, sizePerChunk) => {
    const chunks = []
    for(let i = 0;i < arr.length;) {
        chunks.push(arr.slice(i, (sizePerChunk + i)))
        i += sizePerChunk
    }

    return chunks;
}

export const SearchAlgo = (arr, queryStr) => {
    let match = arr.filter(unit => unit.slice(0, queryStr.length).toLowerCase() == queryStr.toLowerCase())
    return match.sort()
}

export const fetchCountry = (is) => {
    const process = (is, attempt) => {
        fetch("https://restcountries.eu/rest/v2/all/")
            .then(res => {
                //Handling errors 
                if (!res.ok) {             
                    if( attempt < 3) {
                      setTimeout(() => process(is, attempt + 1) ,1000)                      
                    } else {
                       throw Error()
                    }
                } else {
                    return res.json()
                }
                
            })
            .then(data => {
                const chunks = ChunkCountries(data, 12)
                is.setState({
                    chunksFormed: chunks.length - 1,
                    chunks,
                    displaying: chunks[0],
                    fetched: true
                })
            }).catch(() => is.setState({error: true, errorMsg:"Couldn't Fetch Countries"}))
        
          
    }
    process(is, 0)    
} 

export const loadMore = (is) => {
    is.setState((prev) => {
        let curr = prev.displaying

        //checking to see if the app is currently been filtered or not
        if (is.state.fetched){
            //getting the array of already displayed countries
            
            return {
                displayedChunk: prev.displayedChunk + 1,

                //adding the previous chunks to the next chunk to be displayed
                displaying :[...curr, ...prev.chunks[prev.displayedChunk + 1]]
            }
            
        } else if (is.state.isFiltered) {
            return {
                displayedChunk: prev.displayedChunk + 1,

                //adding the previous chunks to the next chunk to be displayed
                displaying :[...curr, ...prev.filteredChunks[prev.displayedChunk + 1]]
            }
        }
        
    })
}

export const search = (str, is) => {
    const processSearch = (countryNames) => {            
        const match = SearchAlgo(countryNames, str)
        if (match.length > 0){
            const matchedCountries = [].concat.apply([], is.state.chunks).filter((item) => match.includes(item.name))
            is.setState({displaying: matchedCountries})
        } else {
            is.setState({notFound: true})
            console.log("no match");
        }
        
    }
    //checking the length of the query string to know how to process
    if(str.length == 1) {
        is.setState({isSearching: true, fetched: false, isFiltered: false, notFound: false})
        // this flattens the chunks into a single array
        let nameArray = [].concat.apply([], is.state.chunks).map((item) => item.name) 
        processSearch(nameArray)
    }   else if (str.length > 1) {
        let nameArray = [].concat.apply([], is.state.displaying).map((item) => item.name)
        processSearch(nameArray)
    } else {
        is.setState({fetched: true, isSearching: false, isFiltered: false, displaying: is.state.chunks[0], displayedChunk: 0, notFound: false})
        is.handleFilter("All")
    }
}

export const filter = (region, is) => {
    const process = () => {
        is.setState({fetched: false, isSearching: false, isFiltered: true})
        const matchedRegions = [].concat.apply([], is.state.chunks).filter((item) => item.region == region)
        const chunkedRegions = ChunkCountries(matchedRegions, 12)
        is.setState({filteredChunks: chunkedRegions, displaying: chunkedRegions[0], displayedChunk: 0, filteredChunksFormed: chunkedRegions.length - 1, currentRegion: region})
    }
    region == "All" ? is.setState({currentRegion: "All"}) : process()
}

export default ChunkCountries;