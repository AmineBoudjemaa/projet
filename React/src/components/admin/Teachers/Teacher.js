import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

const Teacher = ({ teacher, handleDelete, handleEdit }) => {
  const { _id, username, phone } = teacher;
  const addToHome = ()=>{
    api
      .post(`/home/teachers/${_id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("teacher added to home")
        }
      })
      .catch((error) => {
        console.log("teacher didn't add to home");
        console.error(error);
      });
  }
  const deleteFromHome = () => {
    api
      .delete(`/home/teachers/${_id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("teacher deleted from home");
        }
      })
      .catch((error) => {
        console.log("teacher didn't deleted from home");
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
      <div style={{ display: "flex" }}>
        <button
          className="btn-whit"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 180,
            marginRight: 10,
            color: "#d50000",
            borderColor: "#d50000",
          }}
          onClick={() => deleteFromHome()}
        >
          <i class="fa-solid fa-user-gear"></i>
          Delete from home
        </button>
        <button
          className="btn-whit"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 150,
            marginRight: 10,
          }}
          onClick={() => addToHome()}
        >
          <i class="fa-solid fa-user-gear"></i>
          Add to home
        </button>
        <button className="edit-btn" aria-label="edit button">
          <Link to="/admin/teacherForm" state={{ _id, teacher }}>
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

export default Teacher
