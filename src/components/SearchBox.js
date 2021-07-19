//eslint-disable-next-line no-unused-vars
import React, { Component } from 'react' 
import ThemeContext from "./ThemeContext"

 class SearchBox extends Component {
     constructor(props) {
        super(props)
    }
    
    static contextType = ThemeContext;
    
    render() {       
        let theme = this.context
        return (
            <div className={`search-parent search-parent-${theme}`} >
                <i className={`fas fa-search fa-search-${theme}`}></i>
                <input type="search" name="" id={`search-${theme}`} placeholder="Search for a country..." />
            </div>
        )
    }
}

export default SearchBox;