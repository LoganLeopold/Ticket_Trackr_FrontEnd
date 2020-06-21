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
    // this.handleValueChange = this.handleValueChange.bind(this);
    this.handleCountryValueChange = this.handleCountryValueChange.bind(this)
    this.handleInput = this.handleInput.bind(this)
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

    var params = {
      OutboundDate: "Departure Date",
      InboundDate: "Return Date",
      OriginPlace: "Departure Airport Code",
      DestinationPlace: "Arrival Airport Code",
    }

    document.querySelectorAll('.formSubmit')[0].style.display = "none"
    
    var alert = document.querySelectorAll('.formStatus')[0];

    if (Date.parse(this.state.inboundDate) < Date.parse(this.state.outboundDate)) {
      alert.innerHTML = "Sorry - your return date is before your departure. Adjust and try again."
      alert.style.display = "block"
      return
    }

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
        priceDisplay.innerHTML = 'Lowest price: $' + price;
        alert.style.display = 'none';
        priceDisplay.style.display = 'block';
      }
    })
    .catch(function(err) {
      err.response.data.ValidationErrors.forEach(error =>  alert.innerHTML = params[error.ParameterName] + ': ' + error.Message + ". <br />");
      alert.innerHTML += "Adjust these errors and try again."
      alert.style.display = "block";
    })
  }

  // For countrySelect
  handleCountryValueChange = function(event) {
    const name = event.target;
    this.setState({
      country: name.value
    })
  };

  // For DatePicker
  handleChange(name, value) {
    this.setState({
      [name]: value
    }, 
    function () {
          var inbound = this.state.inboundDate
      
          if (name === "outboundDate" && Date.parse(inbound) < Date.parse(value)) {
            this.setState({
              inboundDate: value
            })
          }
    });
  }

  // For normal text input
  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
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
            </Row>

            <Row>
              <Col sm={12} md={3} lg={3} xl={3} className="inputBox dport">
                <label>Departure Airport Code</label>
                <input
                  type="text"
                  name="originPlace"
                  defaultValue={this.state.originPlace}
                  onChange={this.handleInput}
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
                  onChange={this.handleInput}
                  style={{
                    width: this.state.destinationPlace.length + 'em'
                  }}
                />
              </Col>
              <Col sm={12} md={3} lg={3} xl={3} className="inputBox ddate">
                <label>Departure Date</label>
                  <DateP
                    className='datepicker'
                    fieldName="outboundDate"
                    handleChange={this.handleChange}
                    {...this.renderProps}
                    {...this.state}
                  />
              </Col>
              <Col sm={12} md={3} lg={3} xl={3} className="inputBox rdate">
                <label>Return Date</label>
                  <DateP
                    className='datepicker'
                    fieldName="inboundDate"
                    handleChange={this.handleChange}
                    {...this.props}
                    {...this.state}
                  />
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
