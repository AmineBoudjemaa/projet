import React from "react";
import { Link } from "react-router-dom";

const Waiting = ({waitingStudent}) => {
  const { _id, username } = waitingStudent;
  console.log(waitingStudent)
  return (
    <li className="teacher">
      <div className="info">
        <i className="fa-regular fa-user"></i>
        <span className="name">{username}</span>
      </div>
      <div>
        <button
          className="btn-whit"
          style={{
            display: "inline",
            justifyContent: "space-between",
            width: 133,
          }}
        >
          {/* <i class="fa-solid fa-user-gear"></i> */}
          accepte
        </button>
        {/* <button className="edit-btn" aria-label="edit button">
          <Link to="/admin/teacherForm" state={{ _id, waitingStudent }}>
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
        </button> */}

        <button className="clear-btn" aria-label="edit button">
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  );
};

export default Waiting;
