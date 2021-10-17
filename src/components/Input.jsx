import React from 'react';

export default function Input(props) {
  const { name, label, error, ...rest } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}></label>
      {label}
      <input
        autoFocus
        {...rest}
        name={name}
        id={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
