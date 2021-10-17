import React from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';

export default class LoginForm extends Form {
  
    state={
        data: {username:"", password:"",name:""},
        errors: {}
    };
      
    
   schema = {
        name: Joi.string().required().label('Name'),
        password: Joi.string().min(5).max(30).required().label('Password'),
        username: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).label("Username"),

    };
   
     doSubmit=(e)=>{
          console.log("submitted");
     }
    
  render(){
  
      
      return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
        {this.renderInput('username','Username','email')}
          {this.renderInput('password','Password',"password")}
        {this.renderInput('name','Name')}
          {this.renderButton("Register")}
          </form>
      </div>
    );
  }
    
  
    
  }
  
