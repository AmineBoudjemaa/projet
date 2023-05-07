import React, { Component } from "react";
import { CourseConsumer } from "../context";
import "../CSS/modal.css";
import { Link } from "react-router-dom";

export default class Modal extends Component {
  render() {
    return (
      <CourseConsumer>
        {({ modalOpan, closeModal, modalCourse }) => {
          if (!modalOpan) {
            return null;
          } else {
            return (
              <div className="modal ">
                <div className="modal-content">
                  <i className="fa-regular fa-circle-check fa-2xl"></i>
                  <h4 style={{ color: "#4caf50" }}>
                    Course added to my courses
                  </h4>
                  <div className="buttons">
                    <Link to="/myCourses">
                      <button onClick={() => closeModal()} className="link">
                        Go to myCourses
                      </button>
                    </Link>
                    <Link to="/courses">
                      <button onClick={() => closeModal()}>Close</button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        }}
      </CourseConsumer>
    );
  }
}
