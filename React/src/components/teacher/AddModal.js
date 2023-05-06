import React from "react";
import "../../CSS/modal.css";
import { Link } from "react-router-dom";

function AddModal({ modalOpan, closeModal, editAdd, comment,red }) {
  if (!modalOpan) {
    return null;
  } else {
    return (
      <div className="modal">
        <div className="modal-content">
          {red ? (
            <i
              className="fa-regular fa-circle-xmark"
              style={{ color: "#d50000" }}
            ></i>
          ) : (
            <i className="fa-regular fa-circle-check fa-2xl"></i>
          )}
          {comment === "mail" ? (
            <h5>Email send</h5>
          ) : (
            <h5 style={{ color: red ? "#d50000" : "#4caf50" }}>
              Course {editAdd} successfully
            </h5>
          )}
          <div className="buttons">
            <Link to="/teacher-add-course">
              <button onClick={() => closeModal()} className="link">
                Add a new course
              </button>
            </Link>
            <Link to="/teacher-profile">
              <button onClick={() => closeModal()} className="">
                Done
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default AddModal;
