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

    axios.get('http://127.0.0.1:8000/api/countries/search/')
    .then( (res) => {
      this.setState({
        markets: res.data,
      })
    })
    .catch(function(response) {
      console.log(response);
    })
    // .then(

    //   () => {
    //     axios.get("http://localhost:8000/airports/search", configAir)
    //     .then(list => {
    //     this.setState({
    //       airports: list.data
    //     })
    //   })
    // .catch(function(response) {
    //   console.log(response);
    // })
    //   }
    // );
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

 

