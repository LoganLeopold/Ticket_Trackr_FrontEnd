import React, { Component } from "react";

class Search extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
            searchResults: []
        }
    }

  findSuggestion() {
    let searchField = this.props.name
    if (typeof(searchField) === Array) {
        let airportList = this.state.airports.filter( airport => {
            searchField.forEach( field => {
                airport[field].includes(`${this.state.search}`)
            })
        })
        this.setState({
            searchResults: airportList
        })
    } else {
    let airportList = this.state.airports.filter( airport => airport[this.props.name].includes(`${this.state.search}`))
    this.setState({
      searchResults: airportList
    })
    }
  }  

  handleSearchChange(e) {
    const name = this.props.name;
    const value = e.target.value;
    this.setState({
      search: value
    });
    if (this.state[name] && this.state[name].length > 1) {
      this.findSuggestion(name)
    }
  }


  render() {
    return (
      <div>
        <form action="">
          <div className="inputBox">
            <label>Travel Tier</label>
            <input
              type="text"
              name={this.props.name}
              defaultValue={this.props.name}
              onChange={this.handleSearchChange}
              onChange={this.handleChange}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
