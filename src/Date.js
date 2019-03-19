import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// 
class DateP extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        startDate: new Date()
      };
      this.handleChange = this.handleChange.bind(this);
    }
   // ________event was "date"
    handleChange(date) {

        this.setState({
            startDate: date
        }, () => this.props.handleChange(this.props.fieldName, this.state.startDate)   
        )
    }
   
    render() {
        console.log("Date rendered boi")
      return (
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
      );
    }
  }

  export default DateP;