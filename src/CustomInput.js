import React from 'react';

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
          >
        </input>
      )
    }
  }
  
export default CustomInput

