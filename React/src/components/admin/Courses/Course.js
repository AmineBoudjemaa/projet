import React from "react";
import { Link } from "react-router-dom";
import "../../../CSS/adminTeachers.css";

const Course = ({ course }) => {
  const { title, price } = course;
  return (
    <Link to="/admin/waiting-list" state={{course}}>
      <li className="teacher">
        <div className="info">
          <i className="fa-regular fa-user"></i>
          <span className="name">{title}</span>
        </div>
        <div>
          <span
            className="name"
            style={{
              color: "#4caf50",
              fontWeight: 700,
            }}
          >
            {price} DA
          </span>
        </div>
      </li>
    </Link>
  );
};

export default Course;
