import React from "react"
import Country from "./Country" //eslint-disable-line no-unused-vars
import FilterBox from "./FilterBox" //eslint-disable-line no-unused-vars
import SearchBox from "./SearchBox" //eslint-disable-line no-unused-vars

class Body extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div  >
                <div className="pad body">
                    <SearchBox />
                    <FilterBox />
                </div>
                <div className="pad country-parent ">
                    <Country /> 
                    <Country /> 
                    <Country /> 
                    <Country /> 
                    <Country /> 
                    <Country /> 
                    <Country /> 
                    <Country />
                </div>
            </div>
        )
    }
}


export default Body;