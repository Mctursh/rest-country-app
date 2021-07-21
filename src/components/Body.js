import React from "react"
import Country from "./Country" //eslint-disable-line no-unused-vars
import FilterBox from "./FilterBox" //eslint-disable-line no-unused-vars
import SearchBox from "./SearchBox" //eslint-disable-line no-unused-vars

class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fetched : false,
            countryList1 : null,
            countryList2 : null,
            countryList3 : null
        }
    }

    getCountries () {
        const fetchCountry = () => {

            const xhr = new XMLHttpRequest()

            xhr.open("GET", "https://restcountries.eu/rest/v2/all", true)
            
            xhr.onload = () => {
                if (xhr.status == 200) {
                    let countries = JSON.parse(xhr.responseText)
                    this.setState({
                        fetched: true,
                        countryList1 : countries.slice(99),
                        countryList2 : countries.slice(100, 200),
                        countryList3 : countries.slice(200, 249)
                    })
                    console.log(countries);
                    
                } else {
                    // Handles server response error
                    console.log("Server responded with an error");
                }
            }

            // Handles network errors
            xhr.onerror = function() {
                console.log("network error");
            }
            
            xhr.send()
        }
        fetchCountry()

    }

    componentDidMount() {
        this.getCountries()        
    }

    render() {

        const { countryList1, fetched } = this.state //eslint-disable-line
        return(
            <div  >
                <div className="pad body">
                    <SearchBox />
                    <FilterBox />
                </div>
                <div className="pad country-parent ">
                    {fetched &&  countryList1.map(({ flag, name, population, region, capital }, index) => <Country key={index} flag={flag} name={name} population={population} region={region} capital={capital} />)}
                </div>
            </div>
        )
    }
}


export default Body;