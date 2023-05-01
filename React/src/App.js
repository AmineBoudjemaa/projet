import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import NavBar from "./components/NavBar";
import Courses from "./components/Courses";
import Default from "./components/Default";
import Home from "./components/Home";
import CourseDetails from "./components/CourseDetails";
import Modal from "./components/Modal";
import Teachers from "./components/Teachers";
import TeacherDetails from "./components/TeacherDetails";
import "./CSS/home.css";
import Footer from "./components/Footer";
import MyCourses from "./components/MyCourses";
import SignUp from "./components/login/SignUp";
import CoursesForm from "./components/CoursesForm";
//teacher space
import TeacherProfile from "./components/teacher/TeacherProfile";
import TeacherCourseDetails from "./components/teacher/CourseDetails";
import TeacherAddCourse from "./components/teacher/AddCourse";
import TeacherEditCourse from "./components/teacher/EditCourse";
//admin space
import TeachersList from "./components/admin/Teachers/TeachersList";
import TeacherForm from "./components/admin/Teachers/TeacherForm";
import StudentList from "./components/admin/Students/StudentList";
import AdminCourses from "./components/admin/Courses/Courses";
import WaitingList from "./components/admin/Courses/WaitingList";
import Admins from "./components/admin/Admins/Admins"

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        {/* teacher space */}
        <Route path="/teacher-profile" Component={TeacherProfile} />
        <Route
          path="/teacher-course-details"
          Component={TeacherCourseDetails}
        />
        <Route path="/teacher-add-course" Component={TeacherAddCourse} />
        <Route path="/techer-edit-course" Component={TeacherEditCourse} />
        {/* admin space */}
        <Route path="/admins" Component={Admins} />
        <Route path="/admin/teachers" Component={TeachersList} />
        <Route path="/admin/teacherForm" Component={TeacherForm} />
        <Route path="/admin/students" Component={StudentList} />
        <Route path="/admin/courses" Component={AdminCourses} />
        <Route path="/admin/waiting-list" Component={WaitingList} />
        {/* other */}
        <Route path="/" Component={Home} />
        <Route path="/courses" Component={Courses} />
        <Route path="/courses/new" Component={CoursesForm} />
        <Route path="/course" Component={CourseDetails} />
        <Route path="/myCourses" Component={MyCourses} />
        <Route path="/teachers" Component={Teachers} />
        <Route path="/teacher" Component={TeacherDetails} />
        <Route path="/sign-up" Component={SignUp} />
        <Route path="*" Component={Default} />
      </Routes>
      <Modal />
      <Footer />
    </React.Fragment>
  );
}

export default App;
