import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../logo.png";
import { CourseConsumer } from "../../context";
import LogoutLogoutButton from "../login/LogoutButton";

export default class NavBar extends Component {
  render() {
    return (
      <CourseConsumer>
        {({ user }) => {
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
                    <NavLink to="/admin/teachers">Teacher</NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/courses">Courses</NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/Students">Students</NavLink>
                  </li>
                </ul>
                <ul className="user">
                    <li>
                      <LogoutLogoutButton />
                    </li>
                </ul>
              </div>
            </div>
          );
        }}
      </CourseConsumer>
    );
  }
}
