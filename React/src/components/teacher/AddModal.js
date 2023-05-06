import React from "react";
import "../../CSS/modal.css";
import { Link } from "react-router-dom";

function AddModal({ modalOpan, closeModal, title, editAdd }) {
    console.log(modalOpan)
  if (!modalOpan) {
    return null;
  } else {
    return (
      <div className="modal">
        <div className="modal-content">
          <h4>{title}</h4>
          {editAdd === "add" ? <h5>Course added</h5> : <h5>Course edited</h5>}
          <Link to="/teacher-profile">
            <button onClick={() => closeModal()} className="close">
              Close
            </button>
          </Link>

          <Link to="/teacher-add-course">
            <button onClick={() => closeModal()}>Add a new course</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default AddModal;
