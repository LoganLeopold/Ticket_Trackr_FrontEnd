import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import Tester from "./Tester";
import FlightSearch from "./FlightSearch";
import "./App.css";
import LocationSearch from "./LocationSearch";

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
      searchResults: [],
      destinationNames: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:8000/airports").then(list => {
      this.setState((prevState) => { return {
        airports: list.data.airports
      }},
      () =>
      {
        let destinationNamesArr = this.state.airports.map( (airport, i, arr) => {
          return airport['faa'], airport['city'], airport['name']
        })
        this.setState({
          destinationNames: destinationNamesArr.sort()
        })
      });
    });
  }

  handleChange(e, name, value) {
    this.setState({
      [name]: value
    // this.setState((prevState, props) => {
    //   return {[name]: prevState[counter] + props.value};
    // })
    });
  }

  render() {
    console.log("App rendered boi");
    return (
      <div>
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
      </div>
    );
  }
}

export default App;

// <div>
//         <main>
//           <form action="">
//             <div className="inputBox">
//               <label>Travel Tier</label>
//               <input
//                 type="text"
//                 name="cabinClass"
//                 defaultValue={this.state.cabinClass}
//                 onChange={this.handleChange}
//               />
//             </div>
//             <div className="inputBox">
//               <label>Passenger Count</label>
//               <input
//                 type="text"
//                 name="adults"
//                 defaultValue={this.state.adults}
//                 onChange={this.handleChange}
//               />
//             </div>
//             <div className="inputBox">
//               <label>Departure Date</label>
//               <input
//                 type="text"
//                 name="outboundDate"
//                 defaultValue={this.state.outboundDate}
//                 onChange={this.handleChange}
//               />
//             </div>
//             <div className="inputBox">
//               <label>Return Date</label>
//               <input
//                 type="text"
//                 name="inboundDate"
//                 defaultValue={this.state.inboundDate}
//                 onChange={this.handleChange}
//               />
//             </div>
//             <div className="inputBox">
//               <label>Departure Airport</label>
//               <input
//                 type="text"
//                 name="originPlace"
//                 defaultValue={this.state.originPlace}
//                 onChange={this.handleChange}
//               />
//             </div>
//             <div className="inputBox">
//               <label>Arrival Airport</label>
//               <input
//                 type="text"
//                 name="destinationPlace"
//                 defaultValue={this.state.destinationPlace}
//                 onChange={this.handleChange}
//               />
//             </div>
//             <button onClick={this.handleClick}>
//               May Need A Submit Eventually
//             </button>
//           </form>
//         </main>
//       </div>
