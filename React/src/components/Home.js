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
                    {value.teachers.slice(0,2).map((teacher) => {
                      return <Teacher key={teacher._id} teacher={teacher} />;
                    })}
                  </div>
                </div>
              </div>
              {/* <Teachers/> */}
              <button
                onClick={() => {
                  console.log(value.user);
                }}
              >
                Click
              </button>
              <button
                onClick={() => {
                  console.log(value.teachers);
                }}
              >
                Click
              </button>
            </>
          );
        }}
      </CourseConsumer>
    )
  }
}
