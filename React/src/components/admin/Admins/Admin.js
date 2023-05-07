import React from "react";
import { Link } from "react-router-dom";

const Student = ({ admin, handleDelete }) => {
  const { _id, username, phone } = admin;
  return (
    <li className="teacher">
      <div className="info">
        <i className="fa-regular fa-user"></i>
        <span className="name">{username}</span>
        <span className="name" style={{ color: "#1E8722" }}>
          {phone}
        </span>
      </div>
      <div style={{ display: "flex" }}>
        <button
          className="clear-btn"
          aria-label="edit button"
          onClick={() => handleDelete(_id)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  );
};

export default Student;
