import React, { Component } from "react";
import { CourseConsumer } from "../context";
import "../CSS/teacher.css";
import "../CSS/courses.css";
import "../CSS/course.css";
import Course from "./Course";


export default class TeacherDetails extends Component {
  render() {
    return (
      <CourseConsumer>
        {({ detailsTeacher }) => {
          const { name, modules, description, courses } = detailsTeacher;
          const length = modules.length;
          return (
            <div>
              <div className="teacher">
                <div className="container">
                  <div>
                    <div className="text">
                      <h1>{name}</h1>
                      <div>
                        {modules.map((module, i) => {
                          return (
                            <React.Fragment key={i}>
                              <span>{module}</span>
                              {(i+1) === length ? "" : "/"}
                            </React.Fragment>
                          );
                        })}
                      </div>
                      <p>{description}</p>
                    </div>
                    <div className="image">
                      <img src="./images/teacher.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="courses">
                <div className="container">
                  <h4>Courses : </h4>
                  <div className="cards">
                    {courses.map((course) => {
                      return <Course key={course._id} course={course} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </CourseConsumer>
    );
  }
}
