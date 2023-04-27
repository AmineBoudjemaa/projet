import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Course from "./Course";


const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, // send cookies with requests
  });

const Courses2 = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get('/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    // <div className="course-cards">
    //   {courses.map(course => (
    //     <div className="course-card" key={course._id}>
    //       <img src={course.img} alt={course.title} />
    //       <h3>{course.title}</h3>
    //       <p>{course.description}</p>
    //       <p>{course.category}</p>
    //       <p>{course.type}</p>
    //       <p>{course.price}</p>
    //       <p>{course.hours}</p>
    //       <p>certificate: {course.certificate}</p>
    //       <p>subscription: {course.subscribe}</p>
    //       <p>teacher: {course.teacher.username}</p>
    //     </div>
    //   ))}
    // </div>
    <div className="courses">
                <div className="container">
                  <div className="cards">
                    {courses.length !== 0
                      ? courses.map((course) => {
                          return <Course key={course._id} course={course} />;
                        })
                      : ""}
                  </div>
                  {courses.length === 0 ? <p>Comming soon</p> : ""}
                </div>
              </div>
  );
};

export default Courses2;
