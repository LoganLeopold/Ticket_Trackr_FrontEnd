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
      console.log('tester mounted')
      axios.get('http://localhost:8000/api/test')
      .then( list => {
        this.setState({
          tests: list.data 
        })
      })
      
    }
    
    render() {
      console.log('Tester rendered')
      return (
          
          <div>
            "Hello Tester"
            {this.state.tests.map( testObject => {
              return (<h1>{testObject.name}</h1>)
            })}
          </div>
              );
    }
  }
  
  export default Tester;
  