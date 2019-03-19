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
      searchResults: [],
      destinationNames: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
   console.log("FlightForm mounted boi")
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
        destinationPlace: this.state.destinationPlace
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(response) {
        console.log(response);
      });
    //https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index helped me realize I don't need a weird format and then I just reverted to the same update state change stuff and got 'er done!
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    //   this.setState((prevState, props) => {
    //     return {[name]: prevState[counter] + props.value};
    //   })
    });
  }

  render() {
    console.log("FlightForm rendered boi")
    return (
      <div className="flightForm">
        <main>
          <form action="">
            <div className="inputBox ddate">
              <label>Departure Date</label>
              <DateP
                className="departDate"
                handleChange={this.handleChange}
                {...this.state}
              />
            </div>
            <div className="inputBox rdate">
              <label>Return Date</label>
              <DateP
                className="returnDate"
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
