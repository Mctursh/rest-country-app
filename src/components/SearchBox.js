//eslint-disable-next-line no-unused-vars
import React, { Component } from 'react' 

 class SearchBox extends Component {
     constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="search-parent" >
                <i className="fas fa-search"></i>
                <input type="search" name="" id="search" placeholder="Search for a country" />
            </div>
        )
    }
}

export default SearchBox;