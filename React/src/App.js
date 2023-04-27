import React from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import './index.css'
import NavBar from './components/NavBar';
import Courses from './components/Courses';
import Default from './components/Default';
import Home from './components/Home';
import CourseDetails from './components/CourseDetails';
import Modal from './components/Modal';
import Teachers from './components/Teachers';
import TeacherDetails from './components/TeacherDetails';
import "./CSS/home.css"
import Footer from './components/Footer';
import MyCourses from './components/MyCourses';
import TeachersList from './components/admin/TeachersList';
import TeacherForm from './components/admin/TeacherForm';
import AddCourse from './components/admin/AddCourse';
import SignUp from './components/login/SignUp';
import CoursesForm from './components/CoursesForm';
import Courses2 from './components/Courses2';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/courses" Component={Courses} />
        <Route path="/courses2" Component={Courses2} />
        <Route path="/courses/new" Component={CoursesForm} />
        <Route path="/course" Component={CourseDetails} />
        <Route path="/myCourses" Component={MyCourses} />
        <Route path="/teachers" Component={Teachers} />
        <Route path="/teacher" Component={TeacherDetails} />
        <Route path="/admin/teachers" Component={TeachersList} />
        <Route path="/admin/teacher" Component={TeacherForm} />
        <Route path="/admin/AddCourse" Component={AddCourse} />
        <Route path="/sign-up" Component={SignUp} />
        <Route path="*" Component={Default} />
      </Routes>
      <Modal />
      <Footer />
    </React.Fragment>
  );
}

export default App;
