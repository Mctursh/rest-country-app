import React from "react"

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <header className="header pad" >
                <h3>Where in the world?</h3>
                <div className="dark-container">
                    <i className="fas fa-moon"></i>
                    <h6>Dark Mode</h6>
                </div>                
            </header>
        )
    }
}


export default Header;