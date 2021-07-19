import React, { Component } from 'react'  //eslint-disable-line

class FilterBox extends Component {
    render() {
        return (
            <div>       
                <div className="filter filter-light">
                    <p>FIlter by Region</p>
                    <i class="fas fa-angle-down dd-btn"></i>            
                </div>
                <div className="region-parent region-parent-light">
                    <ul className=" country-list-light" >
                        <li className="li li-light">Africa</li>
                        <li className="li li-light">Africa</li>
                        <li className="li li-light">Africa</li>
                        <li className="li li-light">Africa</li>
                        <li className="li li-light">Africa</li>
                    </ul>
                </div>
            </div>    
        )
    }
}

export default FilterBox;