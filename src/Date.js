import React from "react";
import DatePicker from "react-datepicker";
import CustomInput from "./CustomInput";
var moment = require("moment");

class DateP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {

      // Establish two current local times and the day value of the Date objects
      var today = new Date()
      var todayDay = today.getDate()
  
      var todayBritain = new Date()
      
      // Find current UTC 00 time
      var londonTime = new Date().toLocaleString("en-US", {timeZone: "Europe/London"});
  
      // Establish offset with DST functions and londonTime object
      var offset;
      //One time is in DST but the other isn't
      if ((moment(today).isDST()) != moment(londonTime).isDST()) {
        offset = 5;
      //We're both in the same setup so we're in the standard difference
      } else {
        offset = 4;
      }
      
      // Apply offset to the Britain day 
      todayBritain.setTime(todayBritain.getTime() + (offset*3600000))
      var todayBritainDay = todayBritain.getDate()

      // If today + offset is next day, bump time up
      if (todayDay < todayBritainDay) {
        today = todayBritain
      }

      this.setState(
        {
          startDate: today
        },
        () => {
          this.props.handleChange(this.props.fieldName, this.state.startDate);
        }
      );

  }

  handleChange = date => {

    this.setState(
      {
        startDate: date
      },
      () => {
        this.props.handleChange(this.props.fieldName, this.state.startDate);
      }
    );

  };

  render() {
    console.log("Date rendered boi");
    return (
      
        <DatePicker
          className="datepicker"
          customInput={<CustomInput handleChange={this.handleChange} />}
          date={this.state.startDate}
          selected={this.state.startDate}
          onChange={this.handleChange}
          onClick={this.props.onClick}
        />
      
    );
  }
}

export default DateP;
