import React, { Component } from 'react';
import axios from "axios";

class Tester extends Component {
    constructor() {
      super()
      this.state = {
        tests: [],
      }
    }
  
    componentDidMount() {
      axios.get('localhost:8000/api/test')
      .then( list => {
        this.setState({
          tests: list 
        })
      })
      console.log(this.state.tests)
    }
    
    render() {
      return (
          
          <div>
            "Hello Tester"
            {/* <h1>{this.state.tests[0].name}</h1> */}
          </div>
              );
    }
  }
  
  export default Tester;
  