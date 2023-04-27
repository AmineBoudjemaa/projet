import React from "react";
function Login() {

  function handleLogin() {
    window.location.href = "http://localhost:3000/auth/google";
  }
  return (
    <button className="btn-whit" onClick={handleLogin}>
      Login
    </button>
  );
}

export default Login;
