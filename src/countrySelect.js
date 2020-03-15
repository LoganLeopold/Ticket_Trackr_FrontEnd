import React, { Component } from 'react';

class CountrySelect extends Component {
    constructor(){
        super();
        this.state = {
            stateValue: "US"
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = evt => {
        this.setState({
          stateValue: evt.target.value
        });
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
                //   onChange={this.handleValueChange}
                  onChange={this.handleChange}
                >
                  {iterateNames.map(country => {
                    return (
                      <option key={country.Code} value={country.Code}>
                        {country.Name}
                      </option>
                    );
                  })}
                </select>

            </div>
        );
    }
}

export default CountrySelect;