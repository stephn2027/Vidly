import React, { useEffect, useState } from 'react';
import Input from '../Input';
import Joi from 'joi-browser';

export default function LoginForm() {
  const [account, setAccount] = useState({ username: '', password: '' });
  const [errors,setErrors]  = useState({})
  
 const schema = {
      username: Joi.string().required().label('Username'),
      password: Joi.string().required().label('Password'),
  };
 const options = {abortEarly:false}; 
  const validate= ()=>{
      const {error} = Joi.validate(account,schema,options);
      if(!error) return null;
      const errors = {};
        for(let item of error.details)
        
        errors[item.path[0]] = item.message;
        return errors;
        
        
      

  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    
    setErrors(errors||{});
    if(errors)return;
    
  };
  const validateProperty = ({name,value})=>{
    if(name==='username'){
        if(value.trim()==="") return "Username is required"
    }
    if(name==='password'){
        if(value.trim()==="") return "Password is required"
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    
    const errorsCopy = {...errors};
    const errorMessage = validateProperty(input);
    errorMessage?errorsCopy[input.name] = errorMessage:delete errorsCopy[input.name]
    
    const accountCopy = { ...account };
    accountCopy[input.name] = input.value;

    setAccount(accountCopy);
    setErrors(errorsCopy);
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          value={account.username}
          label="Username"
          onChange={handleChange}
          error={errors.username}
        />
        <Input
          name="password"
          value={account.password}
          label="Password"
          onChange={handleChange}
          error={errors.password}
        />

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
