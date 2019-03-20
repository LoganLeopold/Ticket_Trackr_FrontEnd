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

  findSuggestion(search) {
    let searchField = this.props.name;
    let airportList = this.props.airports.filter((airport, i, arr) => {
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
        if (this.state.searchResults.length === 0) {
                let newSet = this.props.destinationNames.filter ( (name, i, arr) => {
                  return name.charAt(0) === this.state.search
                  } );
                this.setState({
                    searchResults: newSet
                });
            } else if (this.state.searchResults.length > 0) {
                let newSet = this.state.searchResults.filter( (name, i, arr) => {
                  return name.charAt(this.state.searchResults.length) === this.state.search.charAt(this.state.searchResults.lenth) 
                  } );
                this.setState({
                    searchResults: newSet
                });
             } 
          })
        }
  



        // I need to change what goes to searchResults based on the "search" state. 
        // On handleChange, search state changes. 
//       If the first letter of a name matches the state, I want to send that result to         searchResults. 
//      If state changes again I need to adjust searchResults:
//            if the user backspaces, I need to clear searchResults
//          if the user increases the length of of the state then I want to filter searchResults with the new letter. 
//      As state changes, continue this process. 


  

  render() {
    return (
      <div>
        <form action="">
          <div className="inputBox locationSearch">
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
