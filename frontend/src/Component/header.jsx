import React from 'react'
import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import { AuthContext } from '../Authprovider';
import { useNavigate } from 'react-router-dom';
const header = () => {

  const { isLoggedIn, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    logout();
    navigate('/login'); // Redirect to login page after logout
  };



  return (
   <>
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><svg width="223" height="40" viewBox="0 0 223 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="0" y="28" font-size="24" fill="#320C55" font-family="Arial, sans-serif">Stock Prediction </text>
</svg>
</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <div>
        {isLoggedIn ?  (
        
          <>
            <Link to="/Dashboard" className='btn btn-outline-primary me-2'>Dashboard</Link>
           
          <button className='btn btn-outline-danger me-2' onClick={() => {handleLogout(); navigate('/login')}}>Logout</button>


</>









          
        ) : (
          <>
            <Link to="/login" className='btn btn-outline-primary me-2'>Login</Link>
            <Link to="/register" className='btn btn-outline-success'>Register</Link>
          
</>

        
          )}
          
        
      </div>
    </div>
  </div>
</nav>
   </>
  )
}

export default header
