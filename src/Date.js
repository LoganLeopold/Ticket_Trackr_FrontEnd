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
   // ________event was "date"
    handleDate(event) {

        this.setState((prevState) => {
            return {startDate: event.target.value},
            (date) => {this.props.handleChange(event, this.props.fieldName, event.target.value)}
        })

    //   this.setState({
    //     startDate: date
    //   });
    }
   
    render() {
        console.log("Date rendered boi")
      return (
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleDate}
        />
      );
    }
  }

  export default DateP;