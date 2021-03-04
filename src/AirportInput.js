import React, { Component } from "react";
import axios from "axios";

class AirportInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airport: "",
      inputRes: {},
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleAutoComplete = this.handleAutoComplete.bind(this)
  }

  componentDidMount() {
    console.log("airportInput Mounted");
  }

  // For normal text input
  handleInput(event) {

      let snippet = event.target.value
      let input = event.target

      clearTimeout()

      setTimeout( () => {
        this.handleAutoComplete(snippet, input)
      }, 700)

  }

  afterError() {
    
  }

  handleAutoComplete(snippet, input) {

    let thisCom = this
    let thisInput = input

    if (snippet.length > 0) {
      axios({
        method: "get",
        url: `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${snippet}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${this.props.oAuth}`,
        },
      })
        .then(function (response) {
          
          thisCom.setState({
            airport: response.data.data[0]
          }, () => {
          thisCom.props.handleAirportChange(thisCom.props.name, thisCom.state.airport)
          if (thisCom.props.name === "originPlace" && thisInput.dataset.country !== thisCom.props.country) {
            thisCom.props.handleAirportChange("country", thisInput.dataset.country)
            }
          });
          
          // console.log(response.data.data);

          while (thisInput.nextSibling) {
            thisInput.parentNode.removeChild(thisInput.nextSibling);
          }

          let newPopup = document.createElement("DIV");
          newPopup.className = "popup";
          newPopup.addEventListener('keydown', event => {
            if (event.key === 40) {
              newPopup.firstChild.focus()
            }
          })

          response.data.data.slice(0, 5).forEach(function (port) {
            let portName = port.name.toLowerCase();
            let option = document.createElement("OPTION");
            option.value = port.iataCode;
            option.dataset.country = port.address.countryCode;
            option.innerHTML = option.name = portName;
            option.onclick = thisCom.handleOptionClick;
            option.addEventListener('keydown', e => {
              if (e.key === 40) {
                e.target.nextSibling.focus()
              } else if (e.key === 38) {
                e.target.previousSibling.focus()
              } else if (e.key === 13) {
                thisCom.handleOptionClick(e)
              }
            })
            newPopup.appendChild(option);
          });

          newPopup.style.display = "block";

          thisInput.parentNode.appendChild(newPopup);
        })
        .catch((err) => console.log(err.response));

    }
  }

  handleOptionClick(event) {
    event.target.parentNode.previousSibling.value = event.target.name;

    this.setState({
      airport: event.target.value
    }, () => {
      this.props.handleAirportChange(this.props.name, this.state.airport)
      if (this.props.name === "originPlace" && event.target.dataset.country !== this.props.country) {
        this.props.handleAirportChange("country", event.target.dataset.country)
      }
    });

    event.target.parentNode.parentNode.removeChild(event.target.parentNode);

  }

  render() {
    return (
      <input
        className={this.props.classes}
        type="text"
        autoComplete="off"
        // onChange={this.handleInput}
        onKeyUp={this.handleInput}
      />
    );
  }
}

export default AirportInput;
