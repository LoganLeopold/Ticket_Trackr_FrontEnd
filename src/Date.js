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
      var todayDay = today.getDay()
  
      var todayBritain = new Date()
      var todayBritainDay = todayBritain.getDay()
      
      // Find current UTC 00 time
      var londonTime = new Date().toLocaleString("en-US", {timeZone: "Europe/London"});
      londonTime = new Date(londonTime)
  
      // Establish offset with DST functions and londonTime object
      var offset;
      //One time is in DST but the other isn't
      if ((moment(today).isDST()) !== moment(londonTime).isDST()) {
        offset = 4;
      //We're both in the same setup so we're in the standard difference
      } else {
        offset = 5;
      }
  
      // If today + offset is next day, bump time up
      if (todayDay < todayBritainDay) {
        today.setHours(today.getHours() + offset)
      }

      this.setState(
        {
          startDate: today
        },
        () => {
          this.props.handleChange(this.props.fieldName, this.state.startDate);
        }
      );

      // this.setState({
      //   startDate: today
      // })
      // this.props.handleChange(this.props.fieldName, this.state.startDate);

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
