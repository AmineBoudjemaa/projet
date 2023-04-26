import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../logo.png";
import { CourseConsumer } from "../context";
import LogoutLogoutButton from "./login/LogoutButton";
import Login from "./login/Login";

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
                  <li>
                    <NavLink to="/contact">Contact</NavLink>
                  </li>
                </ul>
                {user === null ? (
                  <ul>
                    <li>
                      <Login/>
                      {/* <button className="btn-whit">Login</button> */}
                    </li>
                    <li>
                      <LogoutLogoutButton/>
                    </li>                    
                    <li>
                      <Link to="/sign-up">
                        <button className="btn-blue">Sign up</button>
                      </Link>
                    </li>

                  </ul>
                ) : (
                  <Link to="/profile">
                    <button className="btn-profile btn-whit">
                      <i className="fa-regular fa-user"></i>
                      {/* <img src="" alt=""></img> */}
                      <div className="user-name">user_name</div>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          );
        }}
      </CourseConsumer>
    );
  }
}
