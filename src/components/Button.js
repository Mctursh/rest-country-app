import React, { Component } from 'react' //eslint-disable-line

export default class Button extends Component {
    render() {
        return (
            <div className="load-more-parent">
                <button className={`load-more load-${this.props.theme}`} onClick={this.props.handleLoad}>Load more</button>
            </div>
        )
    }
}
