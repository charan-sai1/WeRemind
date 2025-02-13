import React from 'react';
import BlackButton from './BlackButton';
import BorderButton from './BorderButton';

function Nav() {
  const handleSignInClick = () => {
    window.location.href = '/signin';
    console.log('Sign in clicked');
  };

  return (
    <div className="Nav">
      <h1 className="title">We Remind</h1>
      <div className="options">
        <p>Home</p>
        <p>Dashboard</p>
        <p>Pricing</p>
        <p>About Us</p>
      </div>
      <div>
        <BorderButton onClick={handleSignInClick}>Sign Up</BorderButton>
        <BlackButton onClick={handleSignInClick}>Log In</BlackButton>
      </div>
    </div>
  );
}

export default Nav;
