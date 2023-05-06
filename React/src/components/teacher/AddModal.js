import React from "react";
import "../../CSS/modal.css";
import { Link } from "react-router-dom";

function AddModal({ modalOpan, closeModal, title, editAdd }) {
  if (!modalOpan) {
    return null;
  } else {
    return (
      <div className="modal">
        <div className="modal-content">
          <i className="fa-regular fa-circle-check fa-2xl"></i>
          {editAdd === "add" ? (
            <h5>Course added successfully</h5>
          ) : (
            <h5>Course edited</h5>
          )}
          <div className="buttons">
            <Link to="/teacher-add-course">
              <button onClick={() => closeModal()} className="link">Add a new course</button>
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
