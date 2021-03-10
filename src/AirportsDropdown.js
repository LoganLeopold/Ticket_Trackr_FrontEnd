import React, { Component } from 'react';

class AirportsDropdown extends Component {

    constructor (props) {
        super(props)
        this.state = {
            shown: false
        }
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

    }

    render() {

        let visible = this.state.shown ? {display: "block"} : {display: "none"}

        let options = this.props.inputRes ? this.props.inputRes : []
        
        return (
            <div className="popup" style={visible}>
                {   
                    options.map( (port, i) => {       
                        return (
                            <option value={port.iataCode} data-country={port.address.countryCode} key={i}>
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