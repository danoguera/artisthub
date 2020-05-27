import React from 'react';
import '../assets/styles/SignIn.css'

const navBar = () => (
  <header>
    <a href="/" className="logo">aH</a>
    <nav>
      <ul>
        <li><a href="/aboutus">About Us</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    <a href="/signup">
      <button1  className="btn">Sign Up</button1>
    </a>
    <a href="/signin">
      <button1 className="btn">Sign In</button1>
    </a>
  </header>
)
export default navBar;