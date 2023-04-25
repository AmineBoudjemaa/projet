import React from "react";
import "../../CSS/sign-up.css";

export default function LogApp() {
  return (
    <div className="sign-up-container container">
      <div className="image">
        <img src="./images/Sign-up.png" alt="" />
        <h1>Welcome to our Website</h1>
      </div>
      <div className="information">
        <button>Login</button>
        <h1>cREATE YOUR FREE ACCOUNT</h1>
        <form action="">
          <label htmlFor="name">Full name</label>
          <input type="text" id="name" required placeholder="Your name" />
          <label htmlFor="tel">Phone number</label>
          <input
            type="tel"
            id="tel"
            pattern="[0-9]{10}"
            required
            placeholder="0606060606"
          />
          <input type="submit" value="Create your account" />{" "}
          <span>
            <i className="fa-brands fa-google" style={{color: "#ffffff"}}></i>
          </span>
        </form>
      </div>
    </div>
  );
}
