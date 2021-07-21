import React, { Component } from 'react' //eslint-disable-line

export default class Loader extends Component {
    render() {
        return (
            <div className="loader pad">
                <div className="lds-ripple"><div></div><div></div></div>
            </div>
        )
    }
}
