import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

const Waiting = ({ waitingStudent, course, refrechCourse }) => {
  const student = waitingStudent._id;
  const { username, phone } = waitingStudent;

  const acceptStudent = () => {
    api
      .post(`/courses/${course._id}/confirm`, { student: student })
      .then((response) => {
        if (response.status === 200) {
          refrechCourse();
        }
      })
      .catch((error) => {
        console.log("student didn't accept");
        console.error(error);
      });
  };

  const deleteStudent = () => {
    api
      .delete(`/courses/${course._id}/subscribe?s=${student}`)
      .then((response) => {
        if (response.status === 200) {
          refrechCourse();
        }
      })
      .catch((error) => {
        console.log("student didn't deleted from Waiting list");
        console.error(error);
      });
  };

  return (
    <li className="teacher">
      <div className="info">
        <i className="fa-regular fa-user"></i>
        <span className="name">{username}</span>
        <span className="name" style={{ color: "#1E8722" }}>
          {phone}
        </span>
      </div>
      <div>
        <button
          className="btn-whit"
          style={{
            display: "inline",
            justifyContent: "space-between",
            width: 133,
          }}
          onClick={() => {
            acceptStudent();
          }}
        >
          accepte
        </button>

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
