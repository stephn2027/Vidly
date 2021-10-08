import React from 'react'


export default function Navbar(props) {
    return (
        <React.Fragment>
        <nav className="navbar navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
    Navbar <span className="badge badge-pill badge-secondary">{props.handleNavbarDisplay()} </span> 
    </a>
  </div>
</nav>
            
        </React.Fragment>
    )
}
