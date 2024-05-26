import React from 'react';
import { Link } from 'react-router-dom';


const NavbarComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/property-form">Buyer Dashboard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/property-list">Properties List</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;