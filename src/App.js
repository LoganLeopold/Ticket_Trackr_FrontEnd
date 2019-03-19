import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import Tester from "./Tester";
import FlightSearch from "./FlightSearch";
import "./App.css";
import LocationSearch from "./LocationSearch";
import DateP from "./Date"

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
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    // axios.get("https://api.flightstats.com/flex/airports/rest/v1/json/active?")
    const config = {
      headers: {
        accept: 'text/html',
      }
    };
    axios.get('http://localhost:8000/airports/search', config)
    .then( list => {
      console.log(list)
      this.setState({  
        airports: list.data 
      })
    })
    //   () =>
    //   {
    //     let destinationNamesArr = this.state.airports.map( (airport, i, arr) => {
    //       return airport['faa'], airport['city'], airport['name']
    //     })
    //     this.setState({
    //       destinationNames: destinationNamesArr.sort()
    //     })
    //   });
    // });
    // this.setState({
    //   airports: ['Hello']
    // })
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
      <div className='App'>
        <main>
          <form action="">
            {/* <div className="inputBox">
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
            </div> */}
            <div className="inputBox ddate">
              <label>Departure Date</label>
              <DateP className='departDate' {...this.state}/>
            </div>
            <div className="inputBox rdate">
              <label>Return Date</label>
              <DateP className='returnDate' {...this.state}/>
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
            {/* <button onClick={this.handleClick}>
              May Need A Submit Eventually
            </button> */}
          </form>
        </main>
        <Route path='/search' render={(routerProps) => <LocationSearch handleChange={this.handleChange} {...routerProps}{...this.state}/>} />
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
