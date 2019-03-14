import React, { Component } from "react";

class LocationSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchResults: []
    };
    this.findSuggestion = this.findSuggestion.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  findSuggestion() {
    let searchField = this.props.name;
    let airportList = this.props.airports.filter((airport) => {
      searchField.forEach(field => { 
        if (airport[field] !== undefined) {
        return airport[field].includes(this.state.search);
        }
      });
    });
    this.setState({
      searchResults: airportList
    });
  }

  handleSearchChange(e) {
    const value = e.target.value;
    this.setState(
      (prevState) => {
        return { search: value };
      },
      () => {
        this.props.handleChange(e, this.props.field, this.state.search);
      }
    );
    if (this.state.search && this.state.search.length >= 3) {
      this.findSuggestion(this.state.search);
    }
  }

  render() {
    return (
      <div>
        <form action="">
          <div className="inputBox">
            <label>{this.props.field}</label>
            <input
              type="text"
              name={this.props.name}
              defaultValue={this.props.name}
              onChange={event => {
                this.handleSearchChange(event);
              }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default LocationSearch;
