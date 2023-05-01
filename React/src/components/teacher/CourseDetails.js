import React from "react";
import { useLocation } from "react-router-dom";



function CourseDetails() {
  const location = useLocation();
  const course = location.state.courseDetails;
  return (
    <div className="course">
      <div className="container">
        <div>
          <div className="presontation">
            <h1>{course.title}</h1>
            <h2>Description</h2>
            <p>{course.description}</p>
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
                  <img src="./images/icons/calender.png" alt="" />
                  Duration
                </span>
                <span>{4} weeks</span>
              </div>
              <div className="detail">
                <span>
                  <img src="./images/icons/clock.png" alt="" />
                  Time per week
                </span>
                <span>{course.hours} hours</span>
              </div>
              <div className="detail">
                <span>
                  <img src="./images/icons/view-grid.png" alt="" />
                  Category
                </span>
                <span>{course.category}</span>
              </div>
              <div className="detail">
                <span>
                  <img src="./images/icons/coin.png" alt="" />
                  Credit
                </span>
                <span>{course.price} DA</span>
              </div>
              <div className="detail">
                <span>
                  <img src="./images/icons/earth.png" alt="" />
                  Type
                </span>
                <span>{course.type}</span>
              </div>
            </div>
            <div className="teacher-profil">
              <h4>Teacher</h4>
              <img src="./images/teacher.png" alt="" />
              <h4>{}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
