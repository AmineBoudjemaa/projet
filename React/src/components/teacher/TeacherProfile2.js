import React, { Component } from "react";
import { CourseConsumer } from "../../context";
import "../../CSS/teacher.css";
import "../../CSS/courses.css";
import "../../CSS/course.css";
import Course from "../Course";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

class TeacherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      courses: [],
    };
  }
  componentDidMount() {
    api
      .get("/auth/me")
      .then((response) => {
        if (response.status === 200) {
          this.setState({ user: response.data });
        }
      })
      .catch((error) => {
        console.log("no user");
        console.error(error);
      });
  }
  render() {
    const { username, subjects } = this.state.user;
    const length = subjects?.length;
    
    return (
      <div>
        <div className="teacher">
          <div className="container">
            <div>
              <div className="text">
                <h1>{username}</h1>
                <div>
                  {subjects &&
                    subjects.map((module, i) => {
                      return (
                        <React.Fragment key={i}>
                          <span>{module}</span>
                          {i + 1 === length ? "" : "/"}
                        </React.Fragment>
                      );
                    })}
                </div>
                <p>{this.state.user.description}</p>
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
              {/* {teacherCourses.map((course) => {
                return <Course key={course._id} course={course} />;
              })} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherProfile;
