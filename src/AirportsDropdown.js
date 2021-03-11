import React, { Component } from 'react';

class AirportsDropdown extends Component {

    constructor (props) {
        super(props)
        this.state = {
            shown: false,
        }

        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {

    }

    componentDidUpdate() {

        if (this.props.dropdown && !this.state.shown) {
            this.setState({
                shown: true
            })
        } else if (!this.props.dropdown && this.state.shown) {
            this.setState({
                shown: false
            })
        }

        if (this.props.focused === false) {
            console.log(this[`${this.props.inputRes[0].iataCode}`])
            // this[`${this.props.inputRes[0].iataCode}`].current.focus()
        }
    }

    // handleOptionClick(event) {
    //   event.target.parentNode.previousSibling.value = event.target.name;

    //   this.setState({
    //     airport: event.target.value
    //   }, () => {
    //     this.props.handleAirportChange(this.props.name, this.state.airport)
    //     if (this.props.name === "originPlace" && event.target.dataset.country !== this.props.country) {
    //       this.props.handleAirportChange("country", event.target.dataset.country)
    //     }
    //     event.target.parentNode.childNodes.forEach( child => child.parentNode.removeChild(child))
    //   });

    // } 

    render() {

        let visible = this.state.shown ? {display: "block"} : {display: "none"}

        let options = this.props.inputRes ? this.props.inputRes : []
        
        return (
            <div className="popup" style={visible}>
                {   
                    options.map( (port, i) => {       
                        return (
                            <option value={port.iataCode} data-country={port.address.countryCode} key={i} ref={ref => {this[`${port.iataCode}`] = ref}}>
                                {port.name.toLowerCase()} 
                            </option>
                        )
                    })
                }
            </div>
        );
    }
}

export default AirportsDropdown;