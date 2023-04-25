import React from 'react'
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const Teacher = ({ teacher, handleDelete, handleEdit }) => {
  const { _id, name } = teacher;
  return (
    <li className="teacher">
      <div className="info">
        <i className="fa-regular fa-user"></i>
        <span className="name">{name}</span>
      </div>
      <div>
          <button className="edit-btn" aria-label="edit button">
        <Link to="/admin/teacher" state={{ _id }}>
            <i class="fa-solid fa-pen-to-square"></i>
        </Link>
          </button>

        <button
          className="clear-btn"
          aria-label="edit button"
          onClick={() => handleDelete(_id)}
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  );
};

export default Teacher
