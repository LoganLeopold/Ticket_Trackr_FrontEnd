import React, { Component } from "react";
import axios from "axios";
import { Row, Container, Col } from "reactstrap";
import DateP from "./Date";
import AirportInput from "./AirportInput"
var moment = require("moment");

class FlightForm extends Component {
  constructor() {
    super();
    this.state = {
      outboundDate: "",
      inboundDate: "",
      originPlace: "",
      destinationPlace: "",
      country: "US",
      currency: "USD",
      locale: "en-US",
      livePrice: "",
      status: "",
      oAuth: '',
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFindRoutes = this.handleFindRoutes.bind(this);
    this.handleAirportChange = this.handleAirportChange.bind(this)
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

    // Begin API Access - Retrieving Token
    let body = `grant_type=client_credentials&client_id=${process.env.REACT_APP_AMADEUS_KEY}&client_secret=${process.env.REACT_APP_AMADEUS_SECRET}`;
    let form = this

    axios({
      method: 'post',
      url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
      headers: {
        "Content-Type":"application/x-www-form-urlencoded",
      },
      data: body
    }).then( function(response) {
      let token = response.data.access_token
      form.setState({
        oAuth: token
      })
    }).catch( err => console.log(err))

  }

  // Find Routes Button
  handleFindRoutes(event) {

    event.preventDefault()

    // var params = {
    //   OutboundDate: "Departure Date",
    //   InboundDate: "Return Date",
    //   OriginPlace: "Departure Airport Code",
    //   DestinationPlace: "Arrival Airport Code",
    // }

    document.querySelectorAll('.formSubmit')[0].style.display = "none"
    
    var alert = document.querySelectorAll('.formStatus')[0];

    if (Date.parse(this.state.inboundDate) < Date.parse(this.state.outboundDate)) {
      alert.innerHTML = "Sorry - your return date is before your departure. Adjust and try again."
      alert.style.display = "flex"
      return
    }

    if (this.state.originPlace.length > 0 && this.state.destinationPlace.length > 0) {

      const options = {
        method: 'GET',
        url: 'https://compare-flight-prices.p.rapidapi.com/GetPricesAPI/StartFlightSearch.aspx',
        params: {
          lapinfant: 0,
          child: 0,
          city2: 'NYC',
          date1: '2021-01-01',
          youth: 0,
          flightType: 2,
          adults: 1,
          cabin: 1,
          infant: 0,
          city1: 'LAX',
          seniors: 0,
          date2: '2021-01-02',
          islive: true
        },
        headers: {
          'x-rapidapi-key': `${}`,
          'x-rapidapi-host': 'compare-flight-prices.p.rapidapi.com'
        }
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
      .catch(function(err) {
        console.log(err.response)
      })
    } else {
      /* 
      This is if it's empty, but we need to assign option values no matter if the user has chosen an option, so I have several ideas:

      1) End up storing Amadeus results in state somehow with input change, either in FlightForm state or by breaking inputs out into components. If flightform.state.airport is empty, use last stored value by alphabet/score/etc.
      2) Also, if completely empty, instead of not making AJAX call, could use whatever is still in state from last type (if above is implemented)
      
      Also, I should maybe be treating this more like a traditional form and using all of the values/names from the inputs and controlling the values with state in components that are broken out to handle their own functions/value changes.
      */
      
      alert.innerHTML = "Make sure you have airports chosen and then press Find Routes again!"
    }

  }

  // For DatePicker
  handleDateChange(name, value) {
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

  // For AirportInput
  handleAirportChange(name, value) {
    this.setState({
      [name]: value
    })  
  }

  render() {

    return (
      <div className="flightForm">
        <form action="">
          <Container>

            <Row>
              <Col sm={12} md={6} lg={6} xl={6} className="inputBox dport">
                <label>Departure Airport</label>
                <AirportInput 
                  name="originPlace"
                  className="inputBox dport"
                  {...this.state}
                  handleAirportChange={this.handleAirportChange}
                />
              </Col>
              <Col sm={12} md={6} lg={6} xl={6} className="inputBox aport">
                <label>Arrival Airport</label>
                <AirportInput 
                  name="destinationPlace"
                  className="inputBox aport"
                  {...this.state}
                  handleAirportChange={this.handleAirportChange}
                />
              </Col>
              <Col sm={12} md={3} lg={3} xl={3} className="inputBox ddate">
                <label>Departure Date</label>
                  <DateP
                    className='datepicker'
                    fieldName="outboundDate"
                    handleDateChange={this.handleDateChange}
                    {...this.renderProps}
                    {...this.state}
                  />
              </Col>
              <Col sm={12} md={3} lg={3} xl={3} className="inputBox rdate">
                <label>Return Date</label>
                  <DateP
                    className='datepicker'
                    fieldName="inboundDate"
                    handleDateChange={this.handleDateChange}
                    {...this.props}
                    {...this.state}
                  />
              </Col>
              <Col sm={12} md={6} lg={6} xl={6} className="formButton">
                <div className="subButton">
                  <button type="submit" onClick={this.handleFindRoutes}>
                    Find Routes
                  </button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col sm={12} md={8} lg={8} xl={8} className="d-flex flex-column">
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
