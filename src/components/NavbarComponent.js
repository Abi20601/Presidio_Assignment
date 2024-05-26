import React,{useState} from 'react';
import { useAuth } from "./auth"
import { Link, useNavigate } from 'react-router-dom';


const NavbarComponent = () => {
    
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useNavigate()

    async function handleLogout() {
        setError("")
    
        try {
          await logout()
          history.push("/login")
        } catch {
          setError("Failed to log out")
        }
      }

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/property-form">Seller Dashboard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/property-form">Add Property</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/property-list">Available Property</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => { handleLogout(); }}>Log out</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;