import React, { Component } from 'react'
import { CourseConsumer } from "../context";
import Landing from './homeComponents/Landing';
import ComSoon from './homeComponents/ComSoon';
import Teacher from './Teacher';
import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

export default class Home extends Component {
  user=()=>{
    api
      .get("/auth/me")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log("no user");
        console.error(error);
      });
  }
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
              {/* <button
                onClick={() => this.user()}
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
              </button> */}
            </>
          );
        }}
      </CourseConsumer>
    )
  }
}
