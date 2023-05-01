import React from "react";
import { Link } from "react-router-dom";

const Student = ({ student, handleDelete, makeHimAdmin }) => {
  const { _id, username } = student;
  return (
    <li className="teacher">
      <div className="info">
        <i className="fa-regular fa-user"></i>
        <span className="name">{username}</span>
      </div>
      <div style={{ display: "flex" }}>
        <button
          className="btn-whit"
          style={{
            background: "white",
            display: "inline-block",
            border: "none",
            padding: 0,
          }}
          onClick={() => makeHimAdmin(_id)}
        >
          Add Admin
        </button>
        <button className="edit-btn" aria-label="edit button">
          <Link>
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
        </button>

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
