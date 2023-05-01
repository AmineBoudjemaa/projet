import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { CourseConsumer } from "../../context";

export default class Course extends Component {
  render() {
    let {
      _id,
      title,
      category,
      type,
      img,
      price,
      hours,
      certificate,
    } = this.props.course;
    let courseDetails = this.props.course;
    return (
      <CourseConsumer>
        {({
          handleDetails,
        }) => {
          return (
            <div className="card" onClick={() => handleDetails(_id)}>
              <Link to="/teacher-course-details" state={{ courseDetails }}>
                <div>
                  <div className="image">
                    <img
                      src={
                        "https://img.freepik.com/free-vector/webinar-landing-page-template-isometric-style_23-2148770030.jpg?w=740&t=st=1682603512~exp=1682604112~hmac=8d6aedcafa1ddfc2d5737ffcc25b3e4fcf1eeca10672fc0a3dad6ebb000255e7" ||
                        img
                      }
                      alt=""
                    />
                    {certificate ? <span>Certificate</span> : ""}
                  </div>
                  <div className="text">
                    <h3>{title}</h3>
                    <div className="propertise">
                      <span>
                        <img src="./images/icons/school.png" alt="" />
                        {category}
                      </span>
                      <span>
                        <img src="./images/icons/video.png" alt="" />
                        {type}
                      </span>
                      <span>
                        <img src="./images/icons/clock.png" alt="" />
                        {hours}h
                      </span>
                    </div>
                    <span className="star">
                      <span>4.2</span>
                      <img src="./images/star.png" alt="" />
                      <span>(23)</span>
                    </span>
                    {price === 0 ? (
                      <div className="price">Free</div>
                    ) : (
                      <div className="price">{price} DA</div>
                    )}
                  </div>
                </div>
              </Link>
              {
                <>
                  <Link to="/techer-edit-course" state={{ courseDetails }}>
                    <button className="btn edit-btn">Edit</button>
                  </Link>
                  <button
                    className="btn delete-btn"
                    onClick={() => {
                      this.props.handleDeleteTeacherCourse(_id);
                    }}
                  >
                    Delete
                  </button>
                </>
              }
            </div>
          );
        }}
      </CourseConsumer>
    );
  }
}

Course.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string,
    img: PropTypes.string,
    category: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    hours: PropTypes.number,
    certificate: PropTypes.bool,
  }),
};
