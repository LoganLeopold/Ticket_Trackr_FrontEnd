import React, { Component } from "react";
import axios from "axios";
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
    console.log("App mounted boi")
    console.log(process.env.REACT_APP_RAPID_API)
    const configAir = {
      headers: {
        accept: "text/html"
      }
    };

    const configMarkets = {
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API,
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
        <header>
          <div className='appHeader'>
            Ticket Trackr
          </div>
          <div className='instructions'>
            Immediately see the cheapest flight to anywhere! 
          </div>
        </header>
        <FlightForm {...this.props}{...this.state}/>
      </div>
    );
  }
}

export default App;

 

