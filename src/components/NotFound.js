import React from 'react'
export default class NotFound extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className={`not-found not-found-${this.props.theme}`}>
                <p>No Country Match</p>
            </div>
        )
    }
}
