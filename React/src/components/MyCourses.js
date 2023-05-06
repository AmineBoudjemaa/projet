import React from "react";
import Course from "./Course";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

export default function MyCourses2() {
  let [appliedCourses, setAppliedCourses] = useState([]);
  let [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((response) => {
        if (response.status === 200) {
          if (response.data.role === "student") {
            api
              .get(`/students/${response.data._id}`)
              .then((response) => {
                if (response.status === 200) {
                  // console.log(response.data);
                  setAppliedCourses(response.data.appliedCourses);
                  setEnrolledCourses(response.data.enrolledCourses);
                }
              })
              .catch((error) => {
                console.log("no applied Courses or enrolled Courses");
                console.error(error);
              });
          }
        }
      })
      .catch((error) => {
        console.log("no user");
      });
  }, []);

  const lengthAppliedCourses = appliedCourses.length;
  const lengthEnrolledCourses = enrolledCourses.length;
  return (
    <div className="courses">
      <div className="container">
        <h2>Applied Courses</h2>
        <div className="cards">
          {appliedCourses &&
            appliedCourses.map((course) => {
              return <Course key={course._id} course={course} />;
            })}
        </div>
        {lengthAppliedCourses === 0 ? (
          <p style={{ fontSize: 25 }}>No Applied Courses</p>
        ) : (
          ""
        )}
        <h2>Enrolled Courses</h2>
        <div className="cards">
          {enrolledCourses &&
            enrolledCourses.map((course) => {
              return <Course key={course._id} course={course} />;
            })}
        </div>
        {lengthEnrolledCourses === 0 ? (
          <p style={{ fontSize: 25 }}>No Enrolled Courses</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
