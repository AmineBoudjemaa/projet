import React from 'react';

function LogoutButton() {
  const handleLogout = () => {
    window.location.href = "http://localhost:3000/auth/logout";
  };

  return (
    <button
      onClick={handleLogout}
      style={{ backgroundColor: "white", fontWeight: 600, padding: 10, width:96, color: "#d50000" }}
    >
      Logout
    </button>
  );
}

export default LogoutButton;