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
        <input
          className="customInput"
          onChange={this.props.handleChange}
          value={this.props.value}
          onClick={this.props.onClick}
          style={{
            width: '50%',
            overflow: 'auto',
            // (this.props.value.length * .75) + 'em'
          }}
          >
     
        </input>
      )
    }
  }
  
export default CustomInput

