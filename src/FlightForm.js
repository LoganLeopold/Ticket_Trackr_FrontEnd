import React, { Component } from "react";
import axios from "axios";
import { Row, Container, Col } from "reactstrap";
import CountrySelect from "./countrySelect"
import DateP from "./Date";
var querystring = require("querystring");
var moment = require("moment");

class FlightForm extends Component {
  constructor() {
    super();
    this.state = {
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
    // this.pollPrices = this.pollPrices.bind(this);
    this.handleCountryValueChange = this.handleCountryValueChange.bind(this)
  }

  componentDidMount() {

    // Establish two current local times and the day value of the Date objects
    var today = new Date()
    var todayDay = today.getDay()

    var todayBritain = new Date()
    var todayBritainDay = todayBritain.getDay()
    
    // Find current UTC 00 time
    var londonTime = new Date().toLocaleString("en-US", {timeZone: "Europe/London"});
    londonTime = new Date(londonTime)

    // Establish offset with DST functions and londonTime object
    var offset;
    //One time is in DST but the other isn't
    if ((moment(today).isDST()) !== moment(londonTime).isDST()) {
      offset = 4;
    //We're both in the same setup so we're in the standard difference
    } else {
      offset = 5;
    }

    // If today + offset is next day, bump time up
    if (todayDay < todayBritainDay) {
      today.setHours(today.getHours() + offset)
    }

    this.setState({
      inboundDate: today,
      outboundDate: today
    })
    
  }

  handleClick(event) {
    event.preventDefault()

    axios({
      method: 'GET',
      url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${this.state.originPlace}/${this.state.destinationPlace}/${moment(this.state.outboundDate).format("YYYY-MM-DD")}`,
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API,
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "useQueryString": true,
      },
      params: {
        inboundpartialdate: moment(this.state.inboundDate).format("YYYY-MM-DD")
      }
    })
    .then( function(response) {
      var alert = document.querySelectorAll('.formStatus')[0];
      var priceDisplay = document.querySelectorAll('.formSubmit')[0];
      if (response.data.Quotes.length === 0) {
        alert.innerHTML = "There are no results on this itinerary. Try pushing out your outbound date a bit further."
        alert.style.display = "block"
      } else {
        var price = response.data.Quotes[0].MinPrice; 
        for (var i=0; i < response.data.Quotes.length; i++) {
          if (response.data.Quotes[i].MinPrice < price) {
            price = response.data.Quotes[i].MinPrice;
          }
        }
        priceDisplay.innerHTML = price;
        alert.style.display = 'none';
        priceDisplay.style.display = 'block';
      }
    })
    .catch( err => console.log(err))
  }

  //     .catch(function(err) {
  //       if (err.response.data.message.length > 0) {
  //         var alert = document.querySelectorAll('.formStatus')[0]

  //         var errorParam = err.response.data.ValidationErrors[0].ParameterName
  //         var errorMessage = err.response.data.ValidationErrors[0].Message

  //         var errorParamLong = errorParam.split(' ')
  //         var errorMessageLong = errorMessage.split(' ')
          
  //         for (var i=0; i < params.length; i++) {
  //           for (var j=0; j < errorParamLong.length; j++) {
  //             if (params[i] === errorParamLong[j].toLowerCase()) {
  //               errorParamLong[j] = replacements[i]
  //             }
  //           }
  //           for (var f=0; f < errorMessageLong.length; f++) {
  //             if (params[i] === errorMessageLong[f].toLowerCase()) {
  //               errorMessageLong[f] = replacements[i]
  //             }
  //           }
  //       }

  //         var errorReString = errorParamLong.toString().replace(/,/g, " ")

  //         alert.innerHTML = errorReString + ": " + err.response.data.ValidationErrors[0].Message
  //       }
  //     });
  // }

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

  // For countrySelect
  handleCountryValueChange = function(event) {
    const name = event.target;
    this.setState({
      country: name.value
    })
  };

  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  render() {

    return (
      <div className="flightForm">
        <form action="">
          <Container>
            <Row>
              <Col sm={12} md={6} lg={6} xl={6} className="inputBox">
                <CountrySelect name="country" {...this.props} {...this.state} valueUp={this.handleCountryValueChange}/>
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
              <Col sm={12} md={3} lg={3} xl={3} className="inputBox ddate">
                <label>Departure Date</label>
                  <DateP
                    className='datepicker'
                    fieldName="outboundDate"
                    handleChange={this.handleChange}
                    {...this.state}
                  />
              </Col>
              <Col sm={12} md={3} lg={3} xl={3} className="inputBox rdate">
                <label>Return Date</label>
                  <DateP
                    className='datepicker'
                    fieldName="inboundDate"
                    handleChange={this.handleChange}
                    {...this.state}
                  />
              </Col>
              <Col sm={12} md={3} lg={3} xl={3} className="inputBox tier">
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
              <Col sm={12} md={3} lg={3} xl={3} className="inputBox passengers">
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
              <Col sm={6} md={6} lg={6} xl={6} className="formButton">
                <div className="subButton">
                  <button type="submit" onClick={this.handleClick}>
                    FIND ROUTES
                  </button>
                </div>
              </Col>
              <Col sm={6} md={6} lg={6} xl={6} className="d-flex flex-column">
                <h2 className="formStatus"> {this.state.status}</h2>
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
