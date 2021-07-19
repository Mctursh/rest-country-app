import React, { Component } from 'react'  //eslint-disable-line
import ThemeContext from "./ThemeContext"

class FilterBox extends Component {
    static  contextType = ThemeContext
    render() {
        let theme = this.context
        return (
            <div>       
                <div className={`filter filter-${theme}`}>
                    <p>FIlter by Region</p>
                    <i class="fas fa-angle-down dd-btn"></i>            
                </div>
                <div className={`region-parent region-parent-${theme}`}>
                    <ul className={`country-list-${theme}`} >
                        <li className={`li li-${theme}`}>Africa</li>
                        <li className={`li li-${theme}`}>Africa</li>
                        <li className={`li li-${theme}`}>Africa</li>
                        <li className={`li li-${theme}`}>Africa</li>
                        <li className={`li li-${theme}`}>Africa</li>
                    </ul>
                </div>
            </div>    
        )
    }
}

export default FilterBox;