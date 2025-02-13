import React from 'react';
import BlackButton from './BlackButton';
import { useNavigate } from 'react-router-dom';
import { logout } from '../pages/firebase';

function Nav() {
  const navigate = useNavigate();

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
        <BlackButton onClick={() => logout(navigate)}>Log Out</BlackButton>
      </div>
    </div>
  );
}

export default Nav;
