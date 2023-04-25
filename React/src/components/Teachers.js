import React, { Component } from "react";
import { CourseConsumer } from "../context";
import "../CSS/teachers.css";
import Teacher from "./Teacher";


export default class Teachers extends Component {
  render() {
    return (
      <div className="teachers">
        <div className="container">
          <div className="cards">
              <CourseConsumer>
                {(value) => {
                  return value.teachers.map((teacher) => {
                    return <Teacher key={teacher._id} teacher={teacher} />;
                  });
                }}
              </CourseConsumer>
          </div>
        </div>
      </div>
    );
  }
}
