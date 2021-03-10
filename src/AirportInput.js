import React, { Component } from "react";
import axios from "axios";

class AirportInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // airport: "",
      inputRes: {},
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentDidMount() {
    console.log("airportInput Mounted");
  }

  // For normal text input
  handleInput(event) {

    let thisCom = this
    let thisInput = event.target

    if (thisInput.value.length > 0) {
      axios({
        method: "get",
        url: `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${thisInput.value}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${this.props.oAuth}`,
        },
      })
        .then(function (response) {
          
          if (thisCom.props.name === "originPlace" && thisInput.dataset.country !== thisCom.props.country) {
            thisCom.props.handleAirportChange("country", thisInput.dataset.country)
          }

          while (thisInput.nextSibling) {
            thisInput.parentNode.removeChild(thisInput.nextSibling);
          }

          let newPopup = document.createElement("DIV");
          newPopup.className = "popup";

          response.data.data.slice(0, 5).forEach(function (port) {
            let portName = port.name.toLowerCase();
            let option = document.createElement("OPTION");
            option.value = port.iataCode;
            option.dataset.country = port.address.countryCode;
            option.innerHTML = option.name = portName;
            option.onclick = thisCom.handleOptionClick;
            newPopup.appendChild(option);
          });

          newPopup.style.display = "block";

          thisInput.parentNode.appendChild(newPopup);
        })
        .catch((err) => console.log(err));

    }
  }

  handleOptionClick(event) {
    event.target.parentNode.previousSibling.dataset.iata = event.target.value;
    event.target.parentNode.previousSibling.value = event.target.name;

    if (this.props.name === "originPlace" && event.target.dataset.country !== this.props.country) {
      this.props.handleAirportChange("country", event.target.dataset.country)
    }

    event.target.parentNode.style.display = 'none'
  }

  render() {
    return (
      <input
        className={this.props.classes}
        type="text"
        autoComplete="off"
        onChange={this.handleInput}
        defaultValue=""
      />
    );
  }
}

export default AirportInput;
