import React, { Component } from 'react';

class CustomInput extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    }
  }

    render () {
      return (
        <button
          className="customInput"
          onChange={this.props.handleChange}>
          {this.state.startDate}
        </button>
      )
    }
  }
  
 
  
export default CustomInput