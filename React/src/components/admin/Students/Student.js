import React from "react";
import { Link } from "react-router-dom";

const Student = ({ student, handleDelete, makeHimAdmin, makeHimTeacher }) => {
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
            display: "flex",
            justifyContent: "space-between",
            width: 140,
            marginRight:10
          }}
          onClick={() => makeHimTeacher(_id)}
        >
          <i class="fa-solid fa-user-gear"></i>
          add teacher
        </button>
        <button
          className="btn-whit"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 133,
          }}
          onClick={() => makeHimAdmin(_id)}
        >
          <i class="fa-solid fa-user-gear"></i>
          add admin
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
