import React, { Component } from "react";
import axios from "axios";

class AirportInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    let thisInput = event.target

    if (event.target.value.length > 0) {
      axios({
        method: "get",
        url: `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${event.target.value}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${this.props.oAuth}`,
        },
      })
        .then(function (response) {
          this.setState({
              inputRes: response.data.data
          })
          console.log(response.data.data);

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
            option.onclick = thisInput.handleOptionClick;
            newPopup.appendChild(option);
          });

          newPopup.style.display = "block";

          thisInput.parentNode.appendChild(newPopup);
        })
        .catch((err) => console.log(err));

      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  }

  handleOptionClick(event) {
    event.target.parentNode.previousSibling.value = event.target.name;

    this.setState({
      [event.target.parentNode.previousSibling.name]: event.target.value,
    });

    if (event.target.parentNode.previousSibling.name === "originPlace") {
      this.setState({
        country: event.target.dataset.country,
      });
    }

    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  }

  render() {
    return (
      <input
        className={this.props.classes}
        type="text"
        autoComplete="off"
        onChange={this.handleInput}
      />
    );
  }
}

export default AirportInput;
