import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import {Row, Container, Column} from 'reactstrap'
import "./App.css";
import FlightForm from "./FlightForm";

class App extends Component {
  constructor() {
    super();
    this.state = {
      airports: [],
      markets: []
    };
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    console.log("App mounted boi");
    const configAir = {
      headers: {
        accept: "text/html"
      }
    };

    const configMarkets = {
      headers: {
        'X-RapidAPI-Key': "2598ac1afamshdac98da0b5326d1p1a89a8jsndbb4a4b83763",
        'Content-Type': "application/x-www-form-urlencoded",
      }
    }


    axios.get("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/countries/en-US", configMarkets)
    .then( (res) => {
      this.setState({
        markets: res.data.Countries
      })
    })
    .catch(function(response) {
      console.log(response);
    })
    .then(

      () => {
        axios.get("http://localhost:8000/airports/search", configAir)
        .then(list => {
        this.setState({
          airports: list.data
        })
      })
    .catch(function(response) {
      console.log(response);
    })
      }
    );
  }

  render() {
    console.log("App rendered boi");
    return (
      <div className="App">
        <header>Ticket Trackr</header>
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

 

