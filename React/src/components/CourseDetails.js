import React, { Component } from "react";
import { CourseConsumer } from "../context";
import { Link } from "react-router-dom";
import "../CSS/course.css"

export default class CourseDetails extends Component {
  render() {
    return (
      <CourseConsumer>
        {({ detailsCourse,addtoMyCourses, openModal, user }) => {
          const {
            _id,
            title,
            description,
            img,
            category,
            type,
            price,
            hours,
            certificate,
            subscribe
          } = detailsCourse;
          return (
            <div className="course">
              <div className="container">
                <div>
                  <div className="presontation">
                    <h1>{title}</h1>
                    <h2>Description</h2>
                    <p>{description}</p>
                    <h2>Program</h2>
                    <ul>
                      <li>Matrix algebra notation</li>
                      <li>Matrix algebra operations</li>
                      <li>Application of matrix algebra to data analysis</li>
                      <li>Linear models</li>
                      <li>Brief introduction to the QR decomposition</li>
                    </ul>
                    {user.role === "student" ? (
                      <button
                        className="btn-blue"
                        disabled={subscribe ? true : false}
                        onClick={() => {
                          addtoMyCourses(_id);
                          openModal(_id);
                        }}
                      >
                        {subscribe ? (
                          "subscribed"
                        ) : (
                          <>
                            subscribe
                            <img src="./images/right-arrow.png" alt="" />
                          </>
                        )}
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="details">
                    <div className="image">
                      <img src="./images/math.png" alt="" />
                    </div>
                    <div>
                      <div className="detail">
                        <span>
                          <img src="./images/icons/calender.png" alt="" />
                          Duration
                        </span>
                        <span>{} weeks</span>
                      </div>
                      <div className="detail">
                        <span>
                          <img src="./images/icons/clock.png" alt="" />
                          Time per week
                        </span>
                        <span>{} hours</span>
                      </div>
                      <div className="detail">
                        <span>
                          <img src="./images/icons/view-grid.png" alt="" />
                          Category
                        </span>
                        <span>{category}</span>
                      </div>
                      <div className="detail">
                        <span>
                          <img src="./images/icons/coin.png" alt="" />
                          Credit
                        </span>
                        <span>{price} DA</span>
                      </div>
                      <div className="detail">
                        <span>
                          <img src="./images/icons/earth.png" alt="" />
                          Type
                        </span>
                        <span>{type}</span>
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
        }}
      </CourseConsumer>
    );
  }
}
