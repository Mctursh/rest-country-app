/*eslint-disable no-unused-vars*/
import React, { Component } from 'react' 
import CancelIcon from './CancelIcon'
import ThemeContext from "./ThemeContext"

 class SearchBox extends Component {
     constructor(props) {
        super(props)
        this.state = {
            searchText: "",
            active: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }    
    static contextType = ThemeContext;

    handleChange (e) {
        this.props.handleSearch(e.target.value)
        this.setState(() => {
           return {searchText: e.target.value}
        })

        e.target.value.length > 0 ? this.setState({active: true}) : this.setState({active: false})
        
    }

    handleClear() {
        this.props.handleSearch("")
        this.setState({searchText: "", active: false})
    }

    render() {       
        let theme = this.context
        const { searchText, active } = this.state
        return (
            <div className={`search-parent search-parent-${theme}`} >
                <i className={`fas fa-search fa-search-${theme}`}></i>
                <input onChange={this.handleChange} value={searchText} type="search" id={`search-${theme}`} placeholder="Search for a country..." />
                {active && <CancelIcon theme={theme} handleClear={this.handleClear} />}
            </div>
        )
    }
}

export default SearchBox;