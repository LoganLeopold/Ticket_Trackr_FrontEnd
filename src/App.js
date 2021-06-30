import React, { Component } from "react";
import {Route} from "react-router-dom"
import "./App.css";
import FlightForm from "./FlightForm";
import TestCall from './TestCall'
import axios from "axios";


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
    // Begin API Access - Retrieving Token
    let body = `grant_type=client_credentials&client_id=${process.env.REACT_APP_AMADEUS_KEY}&client_secret=${process.env.REACT_APP_AMADEUS_SECRET}`;
    // let form = this

    let app = this
    
    axios({
      method: 'post',
      url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
      headers: {
        "Content-Type":"application/x-www-form-urlencoded",
      },
      data: body
    }).then( function(response) {
      let token = response.data.access_token
      app.setState({
        oAuth: token
      })
    }).catch( err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className='appHeader'>
            <a href="/">Ticket Trackr</a>
          </div>
          <div className='instructions'>
            Immediately see the cheapest flight to anywhere
          </div>
          <div className='update'>
            <p >Public access to the main 3rd-party API used for this app was recently restricted. Redevelopment with a new partner is under way. Please refer to the github for the <span><a href="https://github.com/LoganLeopold/Ticket_Trackr_FrontEnd">front end</a></span> and <a href="https://github.com/LoganLeopold/Ticket_Trackr_BackEnd">back end</a> in the meantime. -Logan <span className="today"></span></p>
          </div>
        </header>
        <div>
          <Route path="/tester" exact render={ (routerProps) => <TestCall {...routerProps} {...this.props} {...this.state}/> } > </Route>
          <Route path="/" exact render={ (routerProps) =>  <FlightForm {...routerProps}{...this.props}{...this.state}/> } > </Route>
        </div>
      </div>
    );
  }
}

export default App;

 

