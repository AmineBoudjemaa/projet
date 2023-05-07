import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

const Waiting = ({ studentAccepted, course, refrechCourse }) => {
  const student = studentAccepted._id;
  const { username,phone } = studentAccepted;

  const deleteStudent = () => {
    api
      .delete(`/courses/${course._id}/confirm?s=${student}`)
      .then((response) => {
        if (response.status === 200) {
          refrechCourse();
        }
      })
      .catch((error) => {
        console.log("student didn't deleted from accepted list");
        console.error(error);
      });
  };
  return (
    <li className="teacher">
      <div className="info">
        <i className="fa-regular fa-user"></i>
        <span className="name">{username}</span>
        <span className="name" style={{ color: "#1E8722" }}>{phone}</span>
      </div>
      <div>
        <button
          className="clear-btn"
          aria-label="edit button"
          onClick={() => {
            deleteStudent();
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  );
};

export default Waiting;
