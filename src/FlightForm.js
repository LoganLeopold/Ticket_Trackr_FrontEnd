import React, { Component } from "react";
import axios from "axios";
// import { Link, Route } from "react-router-dom";
// import FlightSearch from "./FlightSearch";
// import LocationSearch from "./LocationSearch";
import DateP from "./Date";
var querystring = require("querystring");
var moment = require("moment");

class FlightForm extends Component {
  constructor() {
    super();
    this.state = {
      cabinClass: "economy",
      adults: "1",
      outboundDate: "",
      inboundDate: "",
      originPlace: "LHR",
      destinationPlace: "SFO",
      country: "US",
      currency: "USD",
      locale: "en-US",
      livePrice: "Find Live Prices",
      status: ""
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.pollPrices = this.pollPrices.bind(this);
  }

  componentDidMount() {
    console.log("FlightForm mounted boi");
  }

  pollPrices(interval, timeout, key, config) {
    this.setState({
      status: "Searching..."
    });
    console.log("Poll fired");
    let start = Date.now();
    function startPoll() {
      return axios
        .get(
          `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${key}/?sortType=price&sortOrder=asc&pageIndex=0`,
          config
        )
        .then(res => {
          function delay(t) {
            return new Promise(function(resolve) {
              setTimeout(resolve, t);
            });
          }

          console.log(res);
          if (res.data.Status === "UpdatesPending") {
            if (
              timeout !== 0 &&
              Date.now() - start > timeout &&
              res.data.Itineraries !== undefined
            ) {
              return res;
            } else if (
              timeout !== 0 &&
              Date.now() - start > timeout &&
              res.data.Itineraries === undefined
            ) {
              return new Error("timeout error on pollPrices");
            } else {
              return delay(interval).then(startPoll);
            }
          } else if (res.data.Status === "UpdatesComplete") {
            if (res.data.Itineraries.length > 0) {
              return res;
            } else if (res.data.Itineraries <= 0) {
              alert("You ain't got no routes bruh");
            }
          }

          console.log(res);
        });
    }

    return startPoll();
  }

  handleClick(event) {
    event.preventDefault();

    var postConfig = {
      headers: {
        "X-RapidAPI-Key": "2598ac1afamshdac98da0b5326d1p1a89a8jsndbb4a4b83763",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    axios
      .post(
        "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0",
        querystring.stringify({
          country: this.state.country,
          currency: this.state.currency,
          locale: this.state.locale,
          cabinClass: this.state.cabinClass,
          adults: this.state.adults,
          outboundDate: moment(this.state.outboundDate).format("YYYY-MM-DD"),
          inboundDate: moment(this.state.inboundDate).format("YYYY-MM-DD"),
          originPlace: this.state.originPlace + "-sky",
          destinationPlace: this.state.destinationPlace + "-sky"
        }),
        postConfig
      )
      .catch(function(response) {
        console.log(response);
        return response;
      })
      .then(response => {
        let liveConfig = {
          headers: {
            "X-RapidAPI-Key":
              "2598ac1afamshdac98da0b5326d1p1a89a8jsndbb4a4b83763"
          }
        };
        let session = response.headers.location.split("/").pop(-1);

        this.pollPrices(500, 35000, session, liveConfig)
          .then(res => {
            console.log(res);
            if (res.data.Itineraries.length > 0) {
              this.setState({
                livePrice: res.data.Itineraries[0].PricingOptions[0].Price,
                status: "Price:"
              });
            } else {
              this.setState({
                status: ""
              });
            }
          })
          .catch(function(response) {
            alert(
              "There was an error finding itineraries. If you are attempting to look for same-day flights there may be none available."
            );
            console.log(response);
          });
      });
  }

  handleValueChange = event => {
    const name = event.target.name;
    this.setState(
      {
        value: event.target.value
      },
      () => {
        this.setState({
          [name]: this.state.value
        });
      }
    );
  };

  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  render() {
    console.log("FlightForm rendered boi");

    const iterateNames = this.props.markets.sort((a, b) => {
      if (a.Name > b.Name) {
        return 1;
      } else if (a.Name < b.Name) {
        return -1;
      } else return 0;
    });

    return (
      <div className="flightForm">
        <main>
          <form action="">
            <div className="inputBox country">
              <label>Origin Country</label>
              <select
                type="text"
                name="country"
                value={this.state.country}
                onChange={this.handleValueChange}
              >
                {iterateNames.map(country => {
                  return (
                    <option key={country.Code} value={country.Code}>
                      {country.Name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="inputBox tier">
              <label>Travel Tier</label>
              <select
                type="text"
                name="cabinClass"
                value={this.state.cabinClass}
                onChange={this.handleValueChange}
              >
                <option value="economy"> Economy </option>
                <option value="premiumeconomy"> PremiumEconomy </option>
                <option value="business"> Business </option>
                <option value="first"> First </option>
              </select>
            </div>
            <div className="inputBox passengers">
              <label>Passenger Count</label>
              <select
                type="text"
                name="adults"
                value={this.state.adults}
                onChange={this.handleValueChange}
              >
                <option value="1"> 1 </option>
                <option value="2"> 2 </option>
                <option value="3"> 3 </option>
              </select>
            </div>
            <div className="inputBox ddate">
              <label>Departure Date</label>
              <DateP
                fieldName="outboundDate"
                handleChange={this.handleChange}
                {...this.state}
              />
            </div>
            <div className="inputBox rdate">
              <label>Return Date</label>
              <DateP
                fieldName="inboundDate"
                handleChange={this.handleChange}
                {...this.state}
              />
            </div>
            <div className="inputBox dport">
              <label>Departure Airport Code</label>
              <input
                type="text"
                name="originPlace"
                defaultValue={this.state.originPlace}
                onChange={this.handleChange}
              />
            </div>
            <div className="inputBox aport">
              <label>Arrival Airport Code</label>
              <input
                type="text"
                name="destinationPlace"
                defaultValue={this.state.destinationPlace}
                onChange={this.handleChange}
              />
            </div>
            <div className='subButton'>
              <button type="submit" onClick={this.handleClick}>
                FIND ROUTES
              </button>
            </div>
          </form>
          <h2>{this.state.status}</h2>
          <h2 className="formSubmit">{this.state.livePrice}</h2>
        </main>
      </div>
    );
  }
}

export default FlightForm;
