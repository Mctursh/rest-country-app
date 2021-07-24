import React, { Component } from 'react'  //eslint-disable-line
import ThemeContext from "./ThemeContext"

class FilterBox extends Component {
    constructor (props) {
        super(props)
        this.state = {
            dropDown: false,            
        }

        this.showDropDown = this.showDropDown.bind(this)
        this.filter = this.filter.bind(this)
    }

    showDropDown () {
        this.setState((prev) => {return {dropDown: !prev.dropDown}})
    }

    filter (region) {
        this.props.handleFilter(region)
        this.showDropDown()
    }

    static  contextType = ThemeContext
    
    render() {
        let theme = this.context
        let { dropDown } = this.state

        const style = {
            display: dropDown ? "block" : "none"
        }

        return (
            <div>       
                <div className={`filter filter-${theme}`}>
                    <p>{`Filter by Region: ${this.props.currentRegion}`}</p>
                    <i onClick={this.showDropDown} className={`fas fa-angle-${dropDown ? "down" : "up"} dd-btn`}></i>            
                </div>
                <div style={style} className={`region-parent region-parent-${theme}`}>
                    <ul className={`country-list-${theme}`} >
                        <li onClick={() => this.filter("Africa")} className={`li li-${theme}`}>Africa</li>
                        <li onClick={() => this.filter("Americas")} className={`li li-${theme}`}>America</li>
                        <li onClick={() => this.filter("Asia")} className={`li li-${theme}`}>Asia</li>
                        <li onClick={() => this.filter("Europe")} className={`li li-${theme}`}>Europe</li>
                        <li onClick={() => this.filter("Oceania")} className={`li li-${theme}`}>Oceania</li>
                    </ul>
                </div>
            </div>    
        )
    }
}

export default FilterBox;