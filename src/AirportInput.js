import React, { Component, ReactDOM } from "react";
import axios from "axios";
import AirportsDropdown from "./AirportsDropdown"

class AirportInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airport: "",
      inputRes: [],
      typing: false,
      currVal: "",
      dropdown: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleAutoComplete = this.handleAutoComplete.bind(this)
    // this.typingCheck = this.typingCheck.bind(this)
  }

  componentDidMount() {
    // console.log("airportInput Mounted");
  }

  // For normal text input
  handleInput(event) {
    
    let snippet = event.target.value
    let input = event.target

    this.setState({
      currently: true,
      currVal: snippet
    })

    clearTimeout()

    setTimeout( () => {
      this.setState({
        currently: false
      })
      if (this.state.currVal.length > 0) {
        this.handleAutoComplete(this.state.currVal, input)
      } else {
        this.setState({
          dropdown: false
        })
      }
    }, 850)

  }

  // typingCheck () {
  // }

  handleAutoComplete(snippet, input) {

    console.log('handleAutoCom triggered')

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

          let tempA = response.data.data.slice(0, 5).sort( (a,b) => 
            b.analytics.travelers.score - a.analytics.travelers.score
          )

          console.log(tempA)
          
          if (tempA.length > 0) {
            thisCom.setState({
              inputRes: tempA,
              dropdown: true
            }, () => {
                thisCom.props.handleAirportChange(thisCom.props.name, thisCom.state.airport)
                if (thisCom.props.name === "originPlace" && thisInput.dataset.country !== thisCom.props.country) {
                  thisCom.props.handleAirportChange("country", thisInput.dataset.country)
                }
              }
            )
          } else {
            thisCom.setState({
              dropdown: false
            })
          };

        })

        .catch((err) => console.log(err));

    } else {
      this.setState({
        dropdown: false
      })
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
      event.target.parentNode.childNodes.forEach( child => child.parentNode.removeChild(child))
    });

  } 

  render() {
    return (
      <div>
      	<input
      	  className={this.props.classes}
      	  type="text"
      	  autoComplete="off"
      	  onChange={this.handleInput}
      	/>
        <AirportsDropdown {...this.props} {...this.state} />
      </div>
    );
  }
}

export default AirportInput;
