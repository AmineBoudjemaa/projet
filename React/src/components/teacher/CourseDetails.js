import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

function CourseDetails() {
  const location = useLocation();
  const course = location.state.courseDetails;
  const [teacher, setTeacher] = useState({})
  useEffect(()=>{
    api
      .get(`/teachers/${location.state.courseDetails.teacher}`)
      .then((response) => {
        if (response.status === 200) {
          setTeacher(response.data);
        }
      })
      .catch((error) => {
        console.log("no teachers");
        console.error(error);
      });
  })
  return (
    <div className="course">
      <div className="container">
        <div>
          <div className="presontation">
            <h1>{course.title}</h1>
            <h2>Description</h2>
            <p>{course.description}</p>
            <h2>Course Link</h2>
            <a href={course.link}>
              <p>Introduction to {course.title}</p>
            </a>
            <h2>Program</h2>
            <ul>
              <li>Matrix algebra notation</li>
              <li>Matrix algebra operations</li>
              <li>Application of matrix algebra to data analysis</li>
              <li>Linear models</li>
              <li>Brief introduction to the QR decomposition</li>
            </ul>
          </div>
          <div className="details">
            <div className="image">
              <img src={course.img} alt="" />
            </div>
            <div>
              <div className="detail">
                <span>
                  <i className="fa-solid fa-globe"></i>
                  Type
                </span>
                <span>{course.type}</span>
              </div>
              <div className="detail">
                <span>
                  <i className="fa-solid fa-landmark"></i>
                  Category
                </span>
                <span>{course.category}</span>
              </div>
              <div className="detail">
                <span>
                  <i className="fa-solid fa-sack-dollar"></i> Credit
                </span>
                <span>{course.price} DA</span>
              </div>
              <div className="detail">
                <span>
                  <i className="fa-sharp fa-regular fa-clock"></i>
                  Time perweek
                </span>
                <span>{course.hours} hours</span>
              </div>
              <div className="detail">
                <span>
                  <i className="fa-sharp fa-solid fa-award"></i>
                  certificate
                </span>
                {course.certificate ? (
                  <span>Certificated</span>
                ) : (
                  <span>Decertified</span>
                )}
              </div>
              <div className="detail">
                <span>
                  <i className="fa-solid fa-bell"></i>
                  subscribe
                </span>
                {course.subscribe ? <span>Open</span> : <span>Closed</span>}
              </div>
              <div className="detail">
                <span>
                  <i className="fa-regular fa-calendar"></i>
                  Duration
                </span>
                <span>{4} weeks</span>
              </div>
            </div>
            <div className="teacher-profil">
              <h4>Teacher</h4>
              <img src="./images/teacher.png" alt="" />
              <h4>{teacher.username}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
