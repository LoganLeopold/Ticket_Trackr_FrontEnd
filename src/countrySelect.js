import React, { Component } from 'react';

class CountrySelect extends Component {
    constructor(){
        super();
        this.state = {
            stateValue: "US"
        };
        this.handleChange = this.handleChange.bind(this);
        // this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
        this.changes = this.changes.bind(this)
    }

    handleChange = evt => {
        this.setState({
          stateValue: evt.target.value
        });
      }

    componentDidMount() {
      console.log(this.props)
    }

    changes(event) {
      this.props.valueUp(event); 
      this.handleChange(event)
    }

    render() {

        const iterateNames = this.props.markets.sort((a, b) => {
            if (a.Name > b.Name) {
              return 1;
            } else if (a.Name < b.Name) {
              return -1;
            } else return 0;
          });

        return (
            <div>
                
                <label>Origin Country</label>
                <select
                  type="text"
                  name="country"
                  value={this.state.stateValue}
                  onChange={this.changes}
                >
                <option key="US" value="US">United States</option>
                  {iterateNames.map(country => {
                    if (country.Code !== "US") {
                      return (
                        <option key={country.Code} value={country.Code}>
                          {country.Name}
                        </option>
                      );
                    }
                  })}
                </select>

            </div>
        );
    }
}

export default CountrySelect;