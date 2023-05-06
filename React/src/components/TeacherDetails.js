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
          const { username, subjects, description, courses, img } = detailsTeacher;
          const length = subjects.length;
          return (
            <div>
              <div className="teacher">
                <div className="container">
                  <div>
                    <div className="text">
                      <h1>{username}</h1>
                      <div>
                        {subjects.map((module, i) => {
                          return (
                            <React.Fragment key={i}>
                              <span>{module}</span>
                              {i + 1 === length ? "" : "/"}
                            </React.Fragment>
                          );
                        })}
                      </div>
                      <p>{description}</p>
                    </div>
                    <div className="image">
                      <img src={img} alt="" />
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
