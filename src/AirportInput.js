import React, { Component, ReactDOM } from "react";
import axios from "axios";
import AirportsDropdown from "./AirportsDropdown"

class AirportInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airport: "",
      dropdown: false,
      inputRes: [],
      timer: -1,
      typing: false,
      focused: true
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleInput = this.handleInput.bind(this)
    this.handleAutoComplete = this.handleAutoComplete.bind(this)
    this.giveFocus = this.giveFocus.bind(this)

    this.sibDropdown = React.createRef()
  }

  componentDidMount() {
    // console.log("airportInput Mounted");
  }

  giveFocus(e) {
    if (e.key === "ArrowDown") {
      this.setState({
        focused: false
      })
    }
  }

  // For normal text input
  handleInput(event) {
    
    let snippet = event.target.value
    let input = event.target

    if (snippet) {
      if (this.state.timer !== -1) {
        clearTimeout(this.state.timer)
      }
      this.setState({
        typing: true,
      }, () => {
        var stopCall = setTimeout( () => {
          this.setState({
            typing: false
          })
          this.handleAutoComplete(snippet, input)
        }, 500)
        this.setState({
          timer: stopCall
        })
      })
      // Bottom of if (snippet)
    } else {
      this.setState({
        dropdown: false
      })
    }
  
  }

  handleAutoComplete(snippet, input) {

    let inputNode = input
    let thisInput = this

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

          let airports = response.data.data

          let tempA; 
          if (airports.length > 0) {
            if (airports.length > 1) {
              tempA = airports.slice(0, 5).sort( (a,b) => {
                if (a.analytics && b.analytics) {
                  return b.analytics.travelers.score - a.analytics.travelers.score
                } else {
                  return 1
                }
              })
            } else {
              tempA = airports
            }
          } else {
            tempA = null
          }
          
          if (tempA) {
            thisInput.setState({
              inputRes: tempA,
              dropdown: true
            }, () => {
                thisInput.props.handleAirportChange(thisInput.props.name, tempA[0].iataCode)
                if (thisInput.props.name === "originPlace" && inputNode.dataset.country !== thisInput.props.country) {
                  thisInput.props.handleAirportChange("country", inputNode.dataset.country)
                }
              }
            )
          } else {
            thisInput.setState({
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

  render() {
    return (
      <div>
      	<input
      	  className={this.props.classes}
      	  type="text"
      	  autoComplete="off"
      	  onChange={this.handleInput}
          onKeyDown={this.giveFocus}
          ref={this.sibDropdown}
      	/>
        <AirportsDropdown {...this.props} {...this.state} focusRef={this.sibDropdown} focused={this.state.focused}/>
      </div>
    );
  }
}

export default AirportInput;
