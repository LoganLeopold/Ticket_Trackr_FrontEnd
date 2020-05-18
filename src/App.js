import React, { Component } from "react";
import {Route, Link} from "react-router-dom"
import "./App.css";
import FlightForm from "./FlightForm";
import Login from "./Login"
import CreateUser from "./CreateUser";
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

    axios.get('https://tickettrackr.herokuapp.com/api/countries/db/search')
    .then( (res) => {
      this.setState({
        markets: res.data,
      })
    })
    .catch(function(response) {
      console.log(response);
    })
  }

  render() {
    console.log("App rendered boi");
    return (
      <div className="App">
        <header>
          <div className='appHeader'>
            <a href="/">Ticket Trackr</a>
          </div>
          <div className='instructions'>
            Immediately see the cheapest flight to anywhere! 
          </div>
          {/* <Link to='/login'><div class="navLinks">Login</div></Link>
          <Link to='/new-user'><div class="navLinks">Create Account</div></Link> */}
        </header>
        {/* <FlightForm {...this.props}{...this.state}/> */}
        <div>
          <Route path="/" exact render={ (routerProps) =>  <FlightForm {...routerProps}{...this.props}{...this.state}/> }></Route>
          {/* <Route path="/login" exact render={(routerProps) => <Login {...routerProps}{...this.state} />}></Route>
          <Route path="/new-user" exact render={(routerProps) => <CreateUser {...routerProps}{...this.state} />}></Route> */}
        </div>
      </div>
    );
  }
}

export default App;

 

