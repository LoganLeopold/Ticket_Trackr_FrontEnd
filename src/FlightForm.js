import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import FlightSearch from "./FlightSearch";
import LocationSearch from "./LocationSearch";
import DateP from "./Date";
var querystring = require('querystring');

class FlightForm extends Component {
  constructor() {
    super();
    this.state = {
      cabinClass: "",
      adults: "",
      outboundDate: "",
      inboundDate: "",
      originPlace: "LHR-sky",
      destinationPlace: "SFO-sky",
      country: "US",
      currency: "USD",
      locale: "en-US"
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  componentDidMount() {
    console.log("FlightForm mounted boi");
  }

  handleClick(event) {
    event.preventDefault();

    var postConfig = { headers: {
            "X-RapidAPI-Key": "2598ac1afamshdac98da0b5326d1p1a89a8jsndbb4a4b83763",
            "Content-Type": "application/x-www-form-urlencoded",
          }
    }
    

    axios
      .post("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0", querystring.stringify({
        country: this.state.country,
        currency: this.state.currency,
        locale: this.state.locale,
        cabinClass: this.state.cabinClass,
        adults: this.state.adults,
        outboundDate: "2019-04-04",
        // moment(this.state.outboundDate).format('YYYY-MM-DD'),
        inboundDate: "2019-04-15",
        // moment(this.state.inboundDate).format('YYYY-MM-DD'),
        originPlace: this.state.originPlace,
        destinationPlace: this.state.destinationPlace,
        
      }), postConfig)
      .then(function(response) {
        console.log(response.headers.location);
      })
      .catch(function(response) {
        console.log(response);
      });
    //https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index helped me realize I don't need a weird format and then I just reverted to the same update state change stuff and got 'er done!
  }

  handleValueChange = event => {
    const name = event.target.name;
    this.setState(
      {
        value: event.target.value
      },
      () => {
        this.setState({
          [name]: this.state.value
        });
      }
    );
  };

  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  render() {
    console.log("FlightForm rendered boi");
    
    const iterateNames = this.props.markets.sort((a,b) => {
        if (a.Name > b.Name) {return 1}
        else if (a.Name < b.Name) {return -1}
        else return 0
    })

    return (
      <div className="flightForm">
        <main>
          <form action="">
            <div className="inputBox">
              <label>Origin Country</label>
              <select
                type="text"
                name="country"
                value={this.state.country}
                onChange={this.handleValueChange}
              >
                {               
                    iterateNames.map( (country) => {
                          return (<option key={country.Code} value={country.Code}>{country.Name}</option>)
                      })
                }
              </select>
            </div>
            <div className="inputBox">
              <label>Travel Tier</label>
              <select
                type="text"
                name="cabinClass"
                value={this.state.cabinClass}
                onChange={this.handleValueChange}
              >
                <option value="economy"> Economy </option>
                <option value="premiumeconomy"> PremiumEconomy </option>
                <option value="business"> Business </option>
                <option value="first"> First </option>
              </select>
            </div>
            <div className="inputBox">
              <label>Passenger Count</label>
              <select
                type="text"
                name="adults"
                value={this.state.adults}
                onChange={this.handleValueChange}
              >
                <option value="1"> 1 </option>
                <option value="2"> 2 </option>
                <option value="3"> 3 </option>
              </select>
            </div>
            <div className="inputBox ddate">
              <label>Departure Date</label>
              <DateP
                fieldName="outboundDate"
                handleChange={this.handleChange}
                {...this.state}
              />
            </div>
            <div className="inputBox rdate">
              <label>Return Date</label>
              <DateP
                fieldName="inboundDate"
                handleChange={this.handleChange}
                {...this.state}
              />
            </div>
            <div className="inputBox dport">
              <label>Departure Airport</label>
              <input
                type="text"
                name="originPlace"
                defaultValue={this.state.originPlace}
                onChange={this.handleChange}
              />
            </div>
            <div className="inputBox aport">
              <label>Arrival Airport</label>
              <input
                type="text"
                name="destinationPlace"
                defaultValue={this.state.destinationPlace}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" onClick={this.handleClick}>FIND ROUTES
            </button>
          </form>
        </main>
      </div>
    );
  }
}

export default FlightForm;
