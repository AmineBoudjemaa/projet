import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { CourseConsumer } from "../../context";
import AddModal from "./AddModal";

export default class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpan: false,
    };
  }

  render() {
    let {
      _id,
      title,
      category,
      type,
      price,
      hours,
      certificate,
      subscribe,
      img,
    } = this.props.course;
    let courseDetails = this.props.course;
    return (
      <CourseConsumer>
        {({ handleDetails }) => {
          return (
            <div className="card" onClick={() => handleDetails(_id)}>
              {/* <AddModal
                modalOpan={this.state.modalOpan}
                closeModal={this.closeModal}
                comment={""}
                editAdd={"deleted"}
                red={true}
              /> */}
              <Link to="/teacher-course-details" state={{ courseDetails }}>
                <div style={{minWidth: "270px"}}>
                  <div className="image">
                    <img
                      src={
                        img ||
                        "https://img.freepik.com/free-vector/webinar-landing-page-template-isometric-style_23-2148770030.jpg?w=740&t=st=1682603512~exp=1682604112~hmac=8d6aedcafa1ddfc2d5737ffcc25b3e4fcf1eeca10672fc0a3dad6ebb000255e7"
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
                      this.props.openModal();
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
