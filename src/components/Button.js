import React, { Component } from 'react' //eslint-disable-line
import ThemeContext from "./ThemeContext"

export default class Button extends Component {
    constructor(props){
        super(props)
    }

    static contextType = ThemeContext

    render() {
        const theme = this.context
        return (
            <div className="load-more-parent">
                <button className={`load-more load-${theme} ${this.props.class}`} onClick={this.props.handleClick}>{this.props.value == "Back" ? <span><i class="fas fa-arrow-left"></i>Back</span> : this.props.value} </button>
            </div>
        )
    }
}
