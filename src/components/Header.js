/*eslint-disable*/
import React from "react"
import ThemeContext from "./ThemeContext"

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.handleToggle = this.props.handleToggle
    }

    static contextType = ThemeContext;

    render() {
        return (
            <header className={`header header-${this.context} pad`} >
                <h3>Where in the world?</h3>
                <div onClick={() => this.handleToggle()} className={`${this.context}-container`}>
                    <i className="fas fa-moon"></i>
                    <h6>{`${this.context} Mode`}</h6>
                </div>                
            </header>
        )
    }
}


export default Header;