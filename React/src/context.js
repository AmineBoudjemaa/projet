import React, { Component } from "react";
import axios from "axios";
import {
  dataCourses,
  dataTeacher,
  detailsCourse,
  detailsTeacher,
  comSoonImg,
  homeTeachers,
} from "./data-courses";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

const CourseContext = React.createContext();

class CourseProvider extends Component {
  state = {
    user: {},
    role: "admin",
    teachers: [],
    detailsTeacher: {},
    courses: [],
    detailsCourse: detailsCourse,
    coursesCart: [],
    modalOpan: false,
    modalCourse: detailsCourse,
    comSoonImg: comSoonImg,
    homeTeachers: homeTeachers,
  };

  componentDidMount() {
    api
      .get("/auth/me")
      .then((response) => {
        if (response.status === 200) {
          this.setUser(response.data);
        }
      })
      .catch((error) => {
        console.log("no user");
        console.error(error);
      });

    api
      .get("/teachers")
      .then((response) => {
        if (response.status === 200) {
          this.setTeachers(response.data);
        }
      })
      .catch((error) => {
        console.log("no teachers");
        console.error(error);
      });

    api
      .get("/courses")
      .then((response) => {
        if (response.status === 200) {
          this.setCourses(response.data);
        }
      })
      .catch((error) => {
        console.log("no teachers");
        console.error(error);
      });
  }

  componentDidUpdate() {
    // console.log("amine");
    // api
    //   .get("/auth/me")
    //   .then((response) => {
    //     if (response.status === 200) {
    //       this.setUser(response.data);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("no user");
    //     console.error(error);
    //   });
  }

  //to not change the data file
  setCourses = (courses) => {
    this.setState(() => {
      return { courses: courses };
    });
  };

  setTeachers = (teachers) => {
    this.setState(() => {
      return { teachers: teachers };
    });
  };

  // setTeachers = () => {
  //   let tempTeachers = [];
  //   dataTeacher.forEach((teacher) => {
  //     const singleTeacher = { ...teacher };
  //     tempTeachers = [...tempTeachers, singleTeacher];
  //   });
  //   this.setState(() => {
  //     return { teachers: tempTeachers };
  //   });
  // };

  getCourse = (id) => {
    const course = this.state.courses.find((itme) => itme._id === id);
    return course;
  };
  getTeacher = (id) => {
    const teacher = this.state.teachers.find((itme) => itme._id === id);
    return teacher;
  };

  addtoMyCourses = (id) => {
    let tempCourses = [...this.state.courses];
    const index = tempCourses.indexOf(this.getCourse(id));
    const course = tempCourses[index];
    course.subscribe = true;
    course.count = 1;
    course.total = course.count;
    this.setState(
      () => {
        return {
          courses: tempCourses,
          coursesCart: [...this.state.coursesCart, course],
        };
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleDetails = (id) => {
    const course = this.getCourse(id);
    this.setState(() => {
      return { detailsCourse: course };
    });
  };

  handleDetailsTeacher = (id) => {
    const teacher = this.getTeacher(id);
    this.setState(() => {
      return { detailsTeacher: teacher };
    });
  };

  openModal = (id) => {
    const course = this.getCourse(id);
    this.setState(() => {
      return { modalCourse: course, modalOpan: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpan: false };
    });
  };

  handleUser = (user) => {
    console.log(this.user);
    this.setState(() => {
      return { user: user };
    });
    console.log(this.user);
  };

  setUser = (user) => {
    this.setState({ user });
  };

  render() {
    return (
      <CourseContext.Provider
        value={{
          ...this.state,
          handleDetails: this.handleDetails,
          addtoMyCourses: this.addtoMyCourses,
          openModal: this.openModal,
          closeModal: this.closeModal,
          handleDetailsTeacher: this.handleDetailsTeacher,
          handleUser: this.handleUser,
          setUser: this.setUser,
        }}
      >
        {this.props.children}
      </CourseContext.Provider>
    );
  }
}

const CourseConsumer = CourseContext.Consumer;

export { CourseProvider, CourseConsumer };
