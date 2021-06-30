import React, { Component } from "react";
import axios from "axios";
import { Row, Container, Col } from "reactstrap";
import DateP from "./Date";
import AirportInput from "./AirportInput"
import Loader from './Loader'
// import { conditionallyUpdateScrollbar } from "reactstrap/lib/utils";
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
      loading: false,
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

  }

  // Find Routes Button
  async handleFindRoutes(event) {

    const component = this

    this.setState({loading: true})

    event.preventDefault()

    var priceDisplay = document.querySelectorAll('.formSubmit')[0]
    var alert = document.querySelectorAll('.formStatus')[0];
    priceDisplay.style.display = "none"

    if (Date.parse(this.state.inboundDate) < Date.parse(this.state.outboundDate)) {
      alert.innerHTML = "Sorry - your return date is before your departure. Adjust and try again."
      alert.style.display = "flex"
      return
    }

    if (this.state.originPlace.length > 0 && this.state.destinationPlace.length > 0) {

      try {
      
        let { data: { data } } = await axios({
          method: "GET",
          url: `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${this.state.originPlace}&destinationLocationCode=${this.state.destinationPlace}&departureDate=${moment(this.state.outboundDate).format("YYYY-MM-DD")}&returnDate=${moment(this.state.inboundDate).format("YYYY-MM-DD")}&adults=1`,
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${this.props.oAuth}`,
          },
        })

        if (data) {
          component.setState({
            loading: false
          })
        }
        
        if (data.length === 0) {
          alert.innerHTML = "There are no results on this itinerary. Try pushing out your outbound date a bit further."
          alert.style.display = "flex"
        } else {
          var price = data[0].price.total 
          priceDisplay.innerHTML = 'Lowest price: $' + price;
          alert.style.display = 'none';
          priceDisplay.style.display = 'flex';
        }

      } catch (err) {
        console.log(err.response)
      }

    }
    else {
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
                  {...this.props}
                  {...this.state}
                  handleAirportChange={this.handleAirportChange}
                />
              </Col>
              <Col sm={12} md={6} lg={6} xl={6} className="inputBox aport">
                <label>Arrival Airport</label>
                <AirportInput 
                  name="destinationPlace"
                  className="inputBox aport"
                  {...this.props}
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
                {this.state.loading && <Loader loading={this.state.loading}/>}
                
              </Col>
            </Row>
          </Container>
        </form>
      </div>
    );
  }
} 

export default FlightForm;
