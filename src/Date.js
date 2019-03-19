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
      this.handleDate = this.handleDate.bind(this);
    }
   
    handleDate(date) {
      this.setState({
        startDate: date
      });
    }
   
    render() {
      return (
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleDate}
        />
      );
    }
  }

  export default DateP;