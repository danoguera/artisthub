import React from 'react';
import '../assets/styles/SignIn.css'
import { Link} from 'react-router-dom'; 

const navBar = (props) =>{ 

  const token = props.token;
    

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

      <Link to='/login'><button>Sign In</button></Link>
      <Link to='/signup'><button>Sign Up</button></Link>
     </React.Fragment> 
      ) : (
        <React.Fragment>
          <Link to='/signout'><button>Sign Out</button></Link>
        </React.Fragment> 
        ) 
    } 

    </header>
  )
}

export default navBar;