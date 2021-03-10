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
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleAutoComplete = this.handleAutoComplete.bind(this)
  }

  componentDidMount() {
    // console.log("airportInput Mounted");
  }

  // For normal text input
  handleInput(event) {
    
    let snippet = event.target.value
    let input = event.target
  
    /*
    
    === CHANGE ===

    if snipp > 0
      - Clear any timeout 
      - Typing Status True (if not)
      - Set Timeout
        -> Wait for completion
          -> Typing False
          -> Send call if completes (not cleared) - happens in next handler
            -> Await results
            If results.length > 0
              If Dropdown false
                -> Dropdown true
    if snipp < 0 
      -Dropdown false
    */

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
        }, 1000)
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

  // typingCheck () {
  // }

  handleAutoComplete(snippet, input) {

    console.log('handleAutoCom triggered')

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

          let tempA = response.data.data.length > 0 ? response.data.data.slice(0, 5).sort( (a,b) => 
            b.analytics.travelers.score - a.analytics.travelers.score
          ) : null

          console.log(tempA)
          
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
