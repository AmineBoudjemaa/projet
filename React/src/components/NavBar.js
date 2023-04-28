import React, { Component } from "react";
import { CourseConsumer } from "../context";
import Visitor from "./navBar/Visitor";
import Teacher from "./navBar/Teacher";
import Student from "./navBar/Student";
import Admin from "./navBar/Admin";

export default class NavBar extends Component {
  render() {
    return (
      <CourseConsumer>
        {({ user, role }) => {
          let nav;
          if (Object.keys(user).length === 0) {
            nav = <Visitor></Visitor>;
          } else if (user.role === "admin") {
            nav = <Admin></Admin>;
          } else if (user.role === "teacher") {
            nav = <Teacher></Teacher>;
          } else if (user.role === "student") {
            nav = <Student></Student>;
          } 
          return <>{nav}</>;
        }}
      </CourseConsumer>
    );
  }
}
