import React, { Component } from "react";
import "../../../CSS/teacher.css";
import "../../../CSS/courses.css";
import "../../../CSS/course.css";
import Course from "./Course";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }
  componentDidMount() {
    api
      .get("/courses")
      .then((response) => {
        if (response.status === 200) {
          const strAscending = [...response.data].sort((a, b) =>
            a.title > b.title ? 1 : -1
          );
          this.setState({ courses: strAscending });
        }
      })
      .catch((error) => {
        console.log("no user");
        console.error(error);
      });
  }
  render() {
    let courses = this.state.courses;

    return (
      <div>
        <div className="admin-Teachers">
          <div className="container">
            <h1>Courses </h1>
            <ul className="list">
              {courses &&
                courses.map((course) => {
                  return <Course key={course._id} course={course} />;
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
