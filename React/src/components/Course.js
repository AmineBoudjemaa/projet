import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { CourseConsumer } from "../context";

export default class Course extends Component {
  render() {
    const {
      _id,
      title,
      img,
      category,
      type,
      price,
      hours,
      certificate,
      subscribe,
    } = this.props.course;
    return (
      <CourseConsumer>
        {({ role, handleDetails, addtoMyCourses, openModal }) => {
          return (
            <div className="card" onClick={() => handleDetails(_id)}>
              <Link to="/course">
                <div>
                  <div className="image">
                    <img src="./images/math.png" alt="" />
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
                    <div className="price">{price} DA</div>
                  </div>
                </div>
              </Link>
              {role === "student" ? (
                <button
                  className="btn-blue"
                  disabled={subscribe ? true : false}
                  onClick={() => {
                    addtoMyCourses(_id);
                    openModal(_id);
                  }}
                >
                  {subscribe ? "subscribed" : "Enroll"}
                </button>
              ) : (
                <>
                  <button
                    className="btn edit-btn"
                  >
                    Edit
                  </button>
                  <button className="btn delete-btn">Delete</button>
                </>
              )}
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
