import React from "react";
import { Link } from "react-router-dom";

const Waiting = ({ studentAccepted }) => {
  const { _id, username } = studentAccepted;
  console.log(studentAccepted)
  return (
    <li className="teacher">
      <div className="info">
        <i className="fa-regular fa-user"></i>
        <span className="name">{username}</span>
      </div>
      <div>
        <button className="edit-btn" aria-label="edit button">
          <Link to="/admin/teacherForm" state={{ _id, studentAccepted }}>
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
        </button>

        <button className="clear-btn" aria-label="edit button">
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  );
};

export default Waiting;
