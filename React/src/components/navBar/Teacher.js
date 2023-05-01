import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../logo.png";
import LogoutLogoutButton from "../login/LogoutButton";

export default class NavBar extends Component {
  render() {
    return (
      <div className="header" id="header">
        <div className="container">
          <Link to="/" className="logo">
            <img src={logo} alt="school" />
          </Link>
          <ul className="nav">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/teacher-profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/teacher-add-course">Add courses</NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <LogoutLogoutButton />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
