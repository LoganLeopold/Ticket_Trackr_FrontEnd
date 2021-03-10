import React, { Component } from 'react';

class AirportsDropdown extends Component {

    constructor (props) {
        super(props)
        this.state = {
            shown: false,
        }

        this.componentDidUpdate = this.componentDidUpdate.bind(this)

        this.props.inputRes.forEach( airport => {
            this[`${airport.iataCode}`] = React.createRef()
        })
    }

    // componentDidMount() {

    // }

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
            this[`${this.inputRes[0].iataCode}`].current.focus()
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
                            <option value={port.iataCode} data-country={port.address.countryCode} key={i} ref={this[`${port.iataCode}`]}>
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