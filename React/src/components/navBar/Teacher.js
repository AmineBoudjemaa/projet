import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../logo.png";
import { CourseConsumer } from "../context";
import LogoutLogoutButton from "./login/LogoutButton";
import Login from "./login/Login";

export default class Teacher extends Component {
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
                {Object.keys(user).length === 0 ? (
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
                ) : (
                  <>
                    <ul className="user">
                      <li>
                        <button
                          className="btn-profile btn-whit"
                          // onClick={() => this.isOpenHandler(this.state.isOpen)}
                        >
                          <i className="fa-regular fa-user"></i>
                          <div className="user-name">{user.username}</div>
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
                  </>
                )}
              </div>
            </div>
          );
        }}
      </CourseConsumer>
    );
  }
}
