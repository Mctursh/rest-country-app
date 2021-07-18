import React, { Component } from 'react'  //eslint-disable-line

class FilterBox extends Component {
    render() {
        return (
            <div>       
                <div className="filter">
                    <p>FIlter by Region</p>
                    <i class="fas fa-angle-down dd-btn"></i>            
                </div>
                <div className="region-parent">
                    <ul className="country-list" >
                        <li>Africa</li>
                        <li>Africa</li>
                        <li>Africa</li>
                        <li>Africa</li>
                        <li>Africa</li>
                    </ul>
                </div>
            </div>    
        )
    }
}

export default FilterBox;