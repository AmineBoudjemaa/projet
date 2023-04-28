import React, { Component } from 'react'
import { CourseConsumer } from "../context";
import Landing from './homeComponents/Landing';
import ComSoon from './homeComponents/ComSoon';
import Teacher from './Teacher';

export default class Home extends Component {
  render() {
    return (
      <CourseConsumer>
        {value=>{
          return (
            <>
              <Landing />
              <ComSoon />
              <div className="teachers">
                <div className="container">
                  <div className="cards">
                    {value.teachers.slice(0, 2).map((teacher) => {
                      return <Teacher key={teacher._id} teacher={teacher} />;
                    })}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  console.log(value.user);
                }}
                style={{ color: "blue", lineHeight: 10, padding: 20 }}
              >
                user
              </button>
              <button
                onClick={() => {
                  console.log(value.teachers);
                }}
                style={{ color: "blue", lineHeight: 10, padding: 20 }}
              >
                teachers
              </button>
              <button
                onClick={() => {
                  console.log(value.courses);
                }}
                style={{ color: "blue", lineHeight: 10, padding: 20 }}
              >
                Courses
              </button>
            </>
          );
        }}
      </CourseConsumer>
    )
  }
}
