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
      axios.get('http://localhost:8000/api/test')
      .then( list => {
        console.log(list)
        this.setState({
          tests: list.data 
        })
      })
      console.log('flight search mounted')
      console.log(this.props.airports.data.airports[0])
    }
    
    render() {
      console.log('Tester rendered')
      return (
          
          <div>
            "Hello Tester"
            
            {this.state.tests.map( testObject => {
              return (<h1 key={this.name}>{testObject.name}</h1>)
            })}
            {/* {this.props.airports.data} */}
          </div>
              );
    }
  }
  
  export default Tester;
  