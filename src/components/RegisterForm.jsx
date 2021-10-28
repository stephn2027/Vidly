import React from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';
import { registerUser } from '../services/userService';
import auth from '../services/authService'; 

export default class LoginForm extends Form {
  state = {
    data: { username: '', password: '', name: '',isAdmin:'' },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label('Name'),
    password: Joi.string().min(5).max(30).required().label('Password'),
    username: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .label('Username'),
    
  };

  doSubmit = async () => {
    try {
      const response = await registerUser(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location = '/';
     
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({errors});
      }
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
         
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}
