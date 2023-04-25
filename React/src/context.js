import React, { Component } from "react";
import {
  dataCourses,
  dataTeacher,
  detailsCourse,
  detailsTeacher,
  comSoonImg,
  homeTeachers,
} from "./data-courses";

const CourseContext = React.createContext();

class CourseProvider extends Component {
  state = {
    user: null,
    role: "student",
    teachers: [],
    detailsTeacher: detailsTeacher,
    courses: [],
    detailsCourse: detailsCourse,
    coursesCart: [],
    modalOpan: false,
    modalCourse: detailsCourse,
    comSoonImg: comSoonImg,
    homeTeachers: homeTeachers,
  };

  componentDidMount() {
    this.setCourses();
    this.setTeachers();
  }

  //to not change the data file
  setCourses = () => {
    let tempCourses = [];
    dataCourses.forEach((course) => {
      const singleCourse = { ...course };
      tempCourses = [...tempCourses, singleCourse];
    });
    this.setState(() => {
      return { courses: tempCourses };
    });
  };

  setTeachers = () => {
    let tempTeachers = [];
    dataTeacher.forEach((teacher) => {
      const singleTeacher = { ...teacher };
      tempTeachers = [...tempTeachers, singleTeacher];
    });
    this.setState(() => {
      return { teachers: tempTeachers };
    });
  };

  getCourse = (id) => {
    const course = this.state.courses.find((itme) => itme._id === id);
    return course;
  };
  getTeacher = (id) => {
    const course = this.state.teachers.find((itme) => itme._id === id);
    return course;
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
        }}
      >
        {this.props.children}
      </CourseContext.Provider>
    );
  }
}

const CourseConsumer = CourseContext.Consumer;

export { CourseProvider, CourseConsumer };
