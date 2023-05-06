import React, { Component } from "react";
import "../../CSS/teacher.css";
import "../../CSS/courses.css";
import "../../CSS/course.css";
import Course from "./Course";
import { Link } from "react-router-dom";
import axios from "axios";
import AddModal from "./AddModal";

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
      modalOpan: false,
    };
  }

  closeModal = () => {
    this.setState(() => {
      return { modalOpan: false };
    });
  };

  openModal = () => {
    this.setState(() => {
      return { modalOpan: true };
    });
  };

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

  handleDeleteTeacherCourse = (id) => {
    api
      .delete(`/courses/${id}`)
      .then((response) => {
        console.log("amine");
        console.log(response.status);
        api
          .get("/auth/me")
          .then((response) => {
            if (response.status === 200) {
              console.log("Course deleted");
              this.setState({ user: response.data });
            }
          })
          .catch((error) => {
            console.log("no user");
            console.error(error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const length = this.state.user.subjects?.length;

    return (
      <div>
        <AddModal
          modalOpan={this.state.modalOpan}
          closeModal={this.closeModal}
          comment={""}
          editAdd={"deleted"}
          red={true}
        />
        <div className="teacher">
          <div className="container">
            <div>
              <div className="text">
                <h1>{this.state.user.username}</h1>
                <div>
                  {this.state.user.subjects &&
                    this.state.user.subjects.map((module, i) => {
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
                {/* <img src="./images/teacher.png" alt="" /> */}
                <img src={this.state.user.img} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="courses">
          <div className="container">
            <h4>Courses : </h4>
            {this.state.user.courses && this.state.user.courses.length === 0 ? (
              <Link
                to="/teacher-add-course"
                style={{
                  display: "block",
                  width: "fit-content",
                }}
              >
                {/* <button
                  className="btn-blue"
                  style={{
                    padding: 20,
                    fontSize: 18,
                  }}
                >
                  Add courses
                </button> */}
                <div className="card add-card">
                  <img src="./images/icons/add.png" alt="" />
                </div>
              </Link>
            ) : (
              <></>
            )}
            <div className="cards">
              {this.state.user.courses &&
              this.state.user.courses.length === 0 ? (
                <></>
              ) : (
                <>
                  {this.state.user.courses &&
                    this.state.user.courses.map((course) => {
                      return (
                        <Course
                          key={course._id}
                          course={course}
                          handleDeleteTeacherCourse={
                            this.handleDeleteTeacherCourse
                          }
                          closeModal={this.closeModal}
                          openModal={this.openModal}
                        />
                      );
                    })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherProfile;
