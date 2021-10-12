import React from 'react'

export default function Input(props) {
    const{name,value,label,onChange,error }=props
    
    return (
        <div className="form-group">
          <label htmlFor={name}></label>{label}
          <input
            autoFocus
            value={value}
            onChange={onChange}
            name={name}
            id={name}
            type="text"
            className="form-control"
          />
         {error && <div className="alert alert-danger">{error}</div>}
        </div>
    )
}
