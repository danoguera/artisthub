import React from 'react';
// import '../assets/styles/SignIn.css'
import { Link} from 'react-router-dom'; 

const navBar = (props) =>{ 

  const token = props.token;
    

  return (
    <header className="header">
      <a href={localStorage.getItem("typeOfUser")==="provider" ? "/homeProvider" :"/home"} className="logo">aH</a>
      <input className="menuButton" type="checkbox" id="menuButton" />
      <label className="menuIcon" htmlFor="menuButton"><span className="navIcon"></span></label>
        <ul className="menu">
        <div className="left">
        
          <li><a href="/aboutus">About Us</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </div>
        <div className="right">
        { !token ?  (
          <React.Fragment>    
          <Link to='/login'><li>Sign In</li></Link>
          <Link to='/signup'><li>Sign Up</li></Link>
        </React.Fragment> 
          ) : (
            <React.Fragment>
             <Link to='/signout'> <li>Sign Out</li></Link>
            </React.Fragment> 
            ) 
        }
        </div>
        </ul>

   

    </header>
  )
}

export default navBar;