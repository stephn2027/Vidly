import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar({user}) {
  return (
    <React.Fragment>
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
      
    
      <div className="expand navbar-expand" id="navbarNavAltMarkup">
      <div className="navbar-nav">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
          <NavLink className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>
          {!user && (
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-item nav-link" to="/register">
              Register
            </NavLink>
          </React.Fragment>
          )}
          {user&&(
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/profile">
              {user.name}
            </NavLink>
            <NavLink className="nav-item nav-link" to="/log-out">
              Log out
            </NavLink>
          </React.Fragment>
          )}
          
        </div>
      </div>
    </nav>
  

    </React.Fragment>
  );
}
