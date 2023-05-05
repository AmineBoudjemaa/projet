import React, { Component } from "react";
import { CourseConsumer } from "../context";
import Course from "./Course";

export default class MyCourses extends Component {
  render() {
    return (
      <CourseConsumer>
        {({ appliedCourses, enrolledCourses }) => {
          const lengthAppliedCourses = appliedCourses.length;
          const lengthEnrolledCourses = enrolledCourses.length;
          return (
            <div className="courses">
              <div className="container">
                <div className="cards">
                  <h1>Applied Courses</h1>
                  {lengthAppliedCourses !== 0
                    ? appliedCourses.map((course) => {
                        return <Course key={course._id} course={course} />;
                      })
                    : ""}
                  <h1>Enrolled Courses</h1>
                  {lengthEnrolledCourses !== 0
                    ? enrolledCourses.map((course) => {
                        return <Course key={course._id} course={course} />;
                      })
                    : ""}
                </div>
                {lengthAppliedCourses === 0 ? <p>No appliedCourses</p> : ""}
                {lengthEnrolledCourses === 0 ? <p>No enrolledCourses</p> : ""}
              </div>
            </div>
          );
        }}
      </CourseConsumer>
    );
  }
}
