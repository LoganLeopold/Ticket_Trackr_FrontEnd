import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Tester from "./Tester";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      inboundDate: "",
      cabinClass: "",
      originPlace: "",
      destinationPlace: "",
      outboundDate: "",
      adults: ""
    };
  }

  handleChange(e) {
      const name = e.target.name
      const value = e.target.value
    this.setState({
      [name]: value
    });
  }

  render() {
    console.log("App rendered boi");
    return (
      <div>
        <main>
          <label>Flight Date</label>
          <input
            type="text"
            name="inboundDate"
            defaultValue={this.state.inboundDate}
            onChange={this.handleChange}
          />
          <label>Title</label>
          <input
            type="text"
            name="cabinClass"
            defaultValue={this.state.cabinClass}
            onChange={this.handleChange}
          />
          <label>Title</label>
          <input
            type="text"
            name="originPlace"
            defaultValue={this.state.originPlace}
            onChange={this.handleChange}
          />
          <label>Title</label>
          <input
            type="text"
            name="destinationPlace"
            defaultValue={this.state.destinationPlace}
            onChange={this.handleChange}
          />
          <label>Title</label>
          <input
            type="text"
            name="outboundDate"
            defaultValue={this.state.outboundDate}
            onChange={this.handleChange}
          />
          <label>Title</label>
          <input
            type="text"
            name="adults"
            defaultValue={this.state.adults}
            onChange={this.handleChange}
          />
        </main>
      </div>
    );
  }
}

export default App;
