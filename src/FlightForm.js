import React, { Component } from "react";
import axios from "axios";
import { Row, Container, Col } from "reactstrap";
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
      originPlace: "IAD",
      destinationPlace: "SFO",
      country: "US",
      currency: "USD",
      locale: "en-US",
      livePrice: "",
      status: ""
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.pollPrices = this.pollPrices.bind(this);
  }

  componentDidMount() {
    console.log("FlightForm mounted");
  }

  pollPrices(interval, timeout, key, config) {
    this.setState({
      status: "Searching"
    });
    var count = 0;
    var searching = setInterval( () => {
      if (count === 0) {
        this.setState({
          status: "Searching."
        })
        count++
      } else if (count===1) {
        this.setState({
          status: "Searching.."
        })
        count++
      } else {
        this.setState({
          status: "Searching..."
        })
        count = 0;
      }
    }, 500)
    function stopSearching () {
      console.log("Stop searching fired")
      clearInterval(searching);
    }
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

          if (res.data.Status === "UpdatesPending") {
            console.log("UPdatespending")

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
          } 
          
            else if (res.data.Status === "UpdatesComplete") {
              stopSearching();
            if (res.data.Itineraries.length > 0) {
              return res;
            } else if (res.data.Itineraries <= 0) {
              alert(
                "Sorry - no routes are available on this itinierary. Try pushing your departure date out a bit further."
              );
            }
          }
        });
    }
    
    return startPoll();
  }

  handleClick(event) {
    event.preventDefault();

    var postConfig = {
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API,
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
        console.log(response, "This is the handleclick error response")
        return response;
      })
      .then(response => {
        let liveConfig = {
          headers: {
            "X-RapidAPI-Key":
            process.env.REACT_APP_RAPID_API
          }
        };
        let session = response.headers.location.split("/").pop(-1);
        console.log(session, "this is the session")

        this.pollPrices(500, 35000, session, liveConfig)
          .then(res => {
            console.log(res, "this is the handle click poll prices response")
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

    const iterateNames = this.props.markets.sort((a, b) => {
      if (a.Name > b.Name) {
        return 1;
      } else if (a.Name < b.Name) {
        return -1;
      } else return 0;
    });

    return (
      <div className="flightForm">
        <form action="">
          <Container>
            <Row>
            <Col sm={12} md={6} lg={6} xl={6} className="inputBox country">
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
              </Col>
              <Col sm={12} md={3} lg={3} xl={3} className="inputBox dport">
                <label>Departure Airport Code</label>
                <input
                  type="text"
                  name="originPlace"
                  defaultValue={this.state.originPlace}
                  onChange={this.handleChange}
                  style={{
                    width: this.state.originPlace.length + 'em'
                  }}
                />
              </Col>
              <Col sm={12} md={3} lg={3} xl={3} className="inputBox aport">
                <label>Arrival Airport Code</label>
                <input
                  type="text"
                  name="destinationPlace"
                  defaultValue={this.state.destinationPlace}
                  onChange={this.handleChange}
                  style={{
                    width: this.state.destinationPlace.length + 'em'
                  }}
                />
              </Col>
            </Row>



            <Row>
              <Col sm={12} md={4} lg={3} xl={3} className="inputBox ddate">
                <label>Departure Date</label>
                  <DateP
                    className='datepicker'
                    fieldName="outboundDate"
                    handleChange={this.handleChange}
                    {...this.state}
                  />
              </Col>
              <Col sm={12} md={4} lg={3} xl={3} className="inputBox rdate">
                <label>Return Date</label>
                  <DateP
                    className='datepicker'
                    fieldName="inboundDate"
                    handleChange={this.handleChange}
                    {...this.state}
                  />
              </Col>
              <Col sm={12} md={4} lg={3} xl={3} className="inputBox tier">
                <label>Travel Tier</label>
                <select
                  type="text"
                  name="cabinClass"
                  value={this.state.cabinClass}
                  onChange={this.handleValueChange}
                >
                  <option value="economy"> Economy </option>
                  <option value="premiumeconomy"> Premium Economy </option>
                  <option value="business"> Business </option>
                  <option value="first"> First </option>
                </select>
              </Col>
              <Col sm={12} md={12} lg={3} xl={3} className="inputBox passengers">
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
              </Col>
            </Row>

            <Row>
              <Col sm={12} md={6} lg={6} xl={6}>
                <div className="subButton">
                  <button type="submit" onClick={this.handleClick}>
                    FIND ROUTES
                  </button>
                </div>
              </Col>
              <Col sm={12} md={6} lg={6} xl={6} className="d-flex flex-column">
                <h2>{this.state.status}</h2>
                <h2 className="formSubmit">{this.state.livePrice}</h2>
              </Col>
            </Row>
          </Container>
        </form>
      </div>
    );
  }
} 

export default FlightForm;
