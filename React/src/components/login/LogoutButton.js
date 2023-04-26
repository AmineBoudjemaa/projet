import React from 'react';
import Cookies from 'js-cookie';

function LogoutButton() {
  const handleLogout = () => {
    window.location.href = "http://localhost:3000/auth/logout";
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;