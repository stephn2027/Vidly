import React from 'react';

import Joi from 'joi-browser';
import Form from './Form';

export default class LoginForm extends Form {
  
  state={
      data: {username:"", password:""},
      errors: {}
  };
    
  
 schema = {
      username: Joi.string().required().label('Username'),
      password: Joi.string().required().label('Password'),
  };
 
   doSubmit=(e)=>{
        console.log("submitted");
   }
  
render(){

    
    return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={this.handleSubmit}>
      {this.renderInput('username','Username')}
        {this.renderInput('password','Password',"password")}
        {this.renderButton("Login")}
        </form>
    </div>
  );
}
  

  
}
