import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import FlightSearch from "./FlightSearch";
import LocationSearch from "./LocationSearch";
import DateP from "./Date";

class FlightForm extends Component {
  constructor() {
    super();
    this.state = {
      cabinClass: "",
      adults: "",
      outboundDate: "",
      inboundDate: "",
      originPlace: "",
      destinationPlace: "",
      country: "US",
      currency: "USD",
      locale: "en-US"
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this)
  }

  componentDidMount() {
    console.log("FlightForm mounted boi");
  }

  handleClick(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8000/airports/skyscancollect", {
        cabinClass: this.state.cabinClass,
        adults: this.state.adults,
        outboundDate: this.state.outboundDate,
        inboundDate: this.state.inboundDate,
        originPlace: this.state.originPlace,
        destinationPlace: this.state.destinationPlace,
        country: this.state.country,
        currency: "USD",
        locale: "en-US"
      })
      .then(function(response) {
        console.log(response);
        // location = response.headers['Location'].split('/')
        // key = location[len(location) - 1]
      })
      .catch(function(response) {
        console.log(response);
      });
    //https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index helped me realize I don't need a weird format and then I just reverted to the same update state change stuff and got 'er done!
  }

  handleValueChange = (event) => {
      this.setState({
        value: event.target.value
      }, () => {
          this.setState({
              cabinClass: this.state.value,
          })
      })
  }

  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  render() {
    console.log("FlightForm rendered boi");
    return (
      <div className="flightForm">
        <main>
          <form action="">
            <div className="inputBox">
              <label>Travel Tier</label>
              <select
                type="text"
                name="cabinClass"             value={this.state.cabinClass}
                onChange={this.handleValueChange}
              >
                <option value='economy'> Economy </option>
                <option value='premiumeconomy'> PremiumEconomy </option>
                <option value='business'> Business </option>
                <option value='first'> First </option>
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
                <option value='1'> 1 </option>
                <option value='2'> 2 </option>
                <option value='3'> 3 </option>
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
          </form>
        </main>
        <Route
          path="/search"
          render={routerProps => (
            <LocationSearch
              handleChange={this.handleChange}
              {...routerProps}
              {...this.state}
            />
          )}
        />
      </div>
    );
  }
}

export default FlightForm;
