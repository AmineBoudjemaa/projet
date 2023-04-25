import React, { Component } from 'react'
import { CourseConsumer } from '../context';
import Course from './Course';

export default class MyCourses extends Component {
  render() {
      return (
          <CourseConsumer>
          {(value) => {
            const length = value.coursesCart.length;
            return (
              <div className="courses">
                <div className="container">
                  <div className="cards">
                    {length !== 0
                      ? value.coursesCart.map((course) => {
                          return <Course key={course._id} course={course} />;
                        })
                      : ""}
                  </div>
                  {length === 0 ? <p>No Courses</p> : ""}
                </div>
              </div>
            );}}
        </CourseConsumer>
      );
  }
}
