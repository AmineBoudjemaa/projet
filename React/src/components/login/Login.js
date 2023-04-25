import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleLogin() {
    window.location.href = "http://localhost:3000/auth/google";
  }

  async function handleVerifyUser() {
    try {
      console.log("amine");
      const res = await axios.get("/auth/verify");
      setIsAuthenticated(res.data.isAuthenticated);
      if (res.data.isAuthenticated) {
        Cookies.set("user", res.data.user);
      }
    } catch (err) {
      console.log(err);
      console.log("amine");
    }
  }

  return (
    <div>
      {isAuthenticated ? (
        <p>You are logged in!</p>
      ) : (
        <>
          <button className="btn-whit" onClick={handleLogin}>
            Login
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
