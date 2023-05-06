import React, { Component } from "react";
import { CourseConsumer } from "../context";
// import "../CSS/css"

export default class CourseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: {},
    };
  }
  render() {
    return (
      <CourseConsumer>
        {({ detailsCourse, addtoMyCourses, openModal, user }) => {
          const {
            _id,
            title,
            link,
            description,
            category,
            type,
            price,
            hours,
            certificate,
            subscribe,
            img,
          } = detailsCourse;
          return (
            <div className="course">
              <div className="container">
                <div>
                  <div className="presontation">
                    <h1>{title}</h1>
                    <h2>Description</h2>
                    <p>{description}</p>
                    <h2>Course Link</h2>
                    <a href={link}>
                      <p>Introduction to {title}</p>
                    </a>
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
                        // disabled={subscribe ? true : false}
                        onClick={() => {
                          addtoMyCourses(detailsCourse);
                          openModal(_id);
                        }}
                      >
                        {/* {subscribe ? (
                          "subscribed"
                        ) : (
                          <>
                            subscribe
                            <img src="./images/right-arrow.png" alt="" />
                          </>
                        )} */}
                        Enroll
                        <i class="fa-solid fa-arrow-right"></i>
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="details">
                    <div className="image">
                      <img src={img} alt="" />
                    </div>
                    <div>
                      <div className="detail">
                        <span>
                          <i className="fa-solid fa-globe"></i>
                          Type
                        </span>
                        <span>{type}</span>
                      </div>
                      <div className="detail">
                        <span>
                          <i className="fa-solid fa-landmark"></i>
                          Category
                        </span>
                        <span>{category}</span>
                      </div>
                      <div className="detail">
                        <span>
                          <i className="fa-solid fa-sack-dollar"></i> Credit
                        </span>
                        <span>{price} DA</span>
                      </div>
                      <div className="detail">
                        <span>
                          <i className="fa-sharp fa-regular fa-clock"></i>
                          Time perweek
                        </span>
                        <span>{hours} hours</span>
                      </div>
                      <div className="detail">
                        <span>
                          <i className="fa-sharp fa-solid fa-award"></i>
                          certificate
                        </span>
                        {certificate ? (
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
                        {subscribe ? <span>Open</span> : <span>Closed</span>}
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
                      {/* <h4>{username}</h4> */}
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
