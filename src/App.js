import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import Tester from "./Tester";
import FlightSearch from "./FlightSearch";
import "./App.css";
import LocationSearch from "./LocationSearch";
import DateP from "./Date";
import FlightForm from "./FlightForm";

class App extends Component {
  constructor() {
    super();
    this.state = {
      airports: []
    };
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    console.log("App mounted boi");
    const config = {
      headers: {
        accept: "text/html"
      }
    };
    axios.get("http://localhost:8000/airports/search", config).then(list => {
      this.setState({
        airports: list.data
      });
    });
  }


  render() {
    console.log("App rendered boi");
    return (
      <div>
        <FlightForm {...this.props}{...this.state}/>
      </div>
    );
  }
}

export default App;

{
  /* <div>
<LocationSearch
  {...this.props}
  {...this.state}
  name={["city", "faa", "name"]}
  field="originPlace"
  handleChange={this.handleChange}
/>
<LocationSearch
  {...this.props}
  {...this.state}
  name={["city", "faa", "name"]}
  field="destinationPlace"
  handleChange={this.handleChange}
/>
</div> */
}

{
  /* <div className="inputBox">
              <label>Travel Tier</label>
              <input
                type="text"
                name="cabinClass"
                defaultValue={this.state.cabinClass}
                onChange={this.handleChange}
              />
            </div>
            <div className="inputBox">
              <label>Passenger Count</label>
              <input
                type="text"
                name="adults"
                defaultValue={this.state.adults}
                onChange={this.handleChange}
              />
            </div> */
}
