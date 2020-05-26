import React from 'react';
import '../assets/styles/SignIn.css'

const navBar = (props) =>{ 

  const token = localStorage.getItem("token");
  
  function signout(){
    localStorage.removeItem("token");
    this.props.history.push("/login");
  } 

  return (
    <header>
      <a href="/" className="logo">aH</a>
      <nav>
        <ul>
          <li><a href="/aboutus">About Us</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
  { !token ?  (
      <React.Fragment>    
      <a href="/signup">
        <button1 className="btn">Sign Up</button1>
      </a>
      <a href="/signin">
        <button1 className="btn">Sign In</button1>
     </a> 
     </React.Fragment> 
      ) : (
        <React.Fragment>    

        <a href="/signin">
          <button1 onClick={signout} className="btn">Sign Out</button1>
       </a> 
       </React.Fragment> 
        ) 
    } 

    </header>
  )
}

export default navBar;