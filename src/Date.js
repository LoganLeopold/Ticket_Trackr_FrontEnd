import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

var moment = require('moment');




// 
class DateP extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        startDate: new Date()
      }
      this.handleChange = this.handleChange.bind(this);
    }
 

   handleChange = (date) => {
    this.setState({
      startDate: date
    }, () => {
      this.props.handleChange(this.props.fieldName, this.state.startDate)   
    })
}

    // handleChange(date) {

    //     this.setState((prevState) => {
    //        return {startDate: date}
    //       }, () => 
    //     )
    // }
   
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