import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../logo.png";
import { CourseConsumer } from "../../context";
import Login from "../login/Login";

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
                    <NavLink to="/courses">Courses</NavLink>
                  </li>
                  <li>
                    <NavLink to="/teachers">Teachers</NavLink>
                  </li>
                </ul>
                <ul>
                  <li>
                    <Login />
                  </li>
                  <li>
                    <Link to="/sign-up">
                      <button className="btn-blue">Sign up</button>
                    </Link>
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
