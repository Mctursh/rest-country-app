import React, { Component } from 'react' //eslint-disable-line

export default class cancelIcon extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div onClick={() => this.props.handleClear()} className={`cancel`}>
                <i className={`fas fa-times fa-times-${this.props.theme}`}></i>
            </div>
        )
    }
}
