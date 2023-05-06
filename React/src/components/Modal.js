import React, { Component } from "react";
import { CourseConsumer } from "../context";
import "../CSS/modal.css";
import { Link } from "react-router-dom";

export default class Modal extends Component {
  render() {
    return (
      <CourseConsumer>
        {({ modalOpan, closeModal, modalCourse }) => {
          const { title } = modalCourse;
          if (!modalOpan) {
            return null;
          } else {
            return (
              <div className="modal ">
                <div className="modal-content">
                  <h4>{title}</h4>
                  <h5>Course added to your course list</h5>
                  <Link to="/courses">
                    <button onClick={() => closeModal()} className="close">
                      Close
                    </button>
                  </Link>

                  <Link to="/myCourses">
                    <button onClick={() => closeModal()}>
                      Go to myCourses
                    </button>
                  </Link>
                </div>
              </div>
            );
          }
        }}
      </CourseConsumer>
    );
  }
}
