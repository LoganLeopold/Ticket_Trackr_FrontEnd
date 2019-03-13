import React, { Component } from "react";
import axios from 'axios'
import { Link, Route } from "react-router-dom";
import Tester from "./Tester";
import "./App.css";


class App extends Component {
  constructor() {
    super();
    this.state = {
      cabinClass: "",
      adults: "",
      outboundDate: "",
      inboundDate: "",
      originPlace: "",
      destinationPlace: "",
      airports: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // axios.get("https://api.flightstats.com/flex/airports/rest/v1/json/active?")
    axios.get('http://localhost:8000/airports')
    .then( list => {
      console.log(list.json())
      // this.setState({  
      //   airports: list 
      // })
    })
    
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    console.log("App rendered boi");
    return (
      <div>
        <main>
          <form action="">
            <div className="inputBox">
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
            </div>
            <div className="inputBox">
              <label>Departure Date</label>
              <input
                type="text"
                name="outboundDate"
                defaultValue={this.state.outboundDate}
                onChange={this.handleChange}
              />
            </div>
            <div className="inputBox">
              <label>Return Date</label>
              <input
                type="text"
                name="inboundDate"
                defaultValue={this.state.inboundDate}
                onChange={this.handleChange}
              />
            </div>
            <div className="inputBox">
              <label>Departure Airport</label>
              <input
                type="text"
                name="originPlace"
                defaultValue={this.state.originPlace}
                onChange={this.handleChange}
              />
            </div>
            <div className="inputBox">
              <label>Arrival Airport</label>
              <input
                type="text"
                name="destinationPlace"
                defaultValue={this.state.destinationPlace}
                onChange={this.handleChange}
              />
            </div>
            <button onClick={this.handleClick}>
              May Need A Submit Eventually
            </button>
          </form>
        </main>
      </div>
    );
  }
}

export default App;
