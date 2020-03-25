import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this)
      }

      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    render() {
        return (
            <div>
                <div>
                    <h1>Hello login world!</h1>
                </div>
                <form>
                    <label>User</label>
                    <input
                        type="text"
                        name="user"
                        defaultValue={this.state.user}
                        onChange={this.handleChange}
                    />
                    <label>Password</label>
                    <input
                        type="text"
                        name="password"
                        defaultValue=''
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        );
    }
}

export default Login;