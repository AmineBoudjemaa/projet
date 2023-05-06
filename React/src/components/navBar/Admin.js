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
              <NavLink to="/admin/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/admin/courses">Courses</NavLink>
            </li>
            <li>
              <NavLink to="/admins">Admins</NavLink>
            </li>
            <li>
              <NavLink to="/admin/teachers">Teachers</NavLink>
            </li>
            <li>
              <NavLink to="/admin/students">Students</NavLink>
            </li>
          </ul>
          <ul className="user">
            <li>
                <button className="btn-profile btn-whit">Admin</button>
            </li>
            <li>
              <LogoutLogoutButton />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
