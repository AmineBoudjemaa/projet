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
              <NavLink to="/courses">Courses</NavLink>
            </li>
            <li>
              <NavLink to="/teachers">Teachers</NavLink>
            </li>
          </ul>
          <ul className="user">
            <li>
              <button className="btn-profile btn-whit">
                <i className="fa-regular fa-user"></i>
                <div className="user-name">{this.props.name}</div>
              </button>
            </li>
            <ul className="profile-modal">
              <li>
                <Link to="/myCourses">
                  <button>My Courses</button>
                </Link>
              </li>
              <li>
                <LogoutLogoutButton />
              </li>
            </ul>
          </ul>
        </div>
      </div>
    );
  }
}
