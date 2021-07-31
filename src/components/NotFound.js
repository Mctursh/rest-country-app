import React from 'react'

export default class NotFound extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className={`not-found not-found-${this.props.theme}`}>
                <p>{this.props.value ? this.props.value : "404 Page Not Found"}</p>
                {this.props.children}
            </div>
        )
    }
}
