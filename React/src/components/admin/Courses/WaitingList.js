import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Waiting from "./Waiting";
import Accepted from "./Accepted"
import "../../../CSS/subscribe-list.css"

function WaitingList() {
  const location = useLocation();
  const [course, setState] = useState(location.state.course);
  return (
    <div>
      <div className="admin-Teachers waiting-list">
        <div className="container">
          <h1>Subscribe List </h1>
          <div className="two-lists">
            <ul className="list">
              <h2>Waiting List</h2>
              {course &&
                course.waitlist.map((waitingStudent) => {
                  return (
                    <Waiting
                      key={waitingStudent._id}
                      waitingStudent={waitingStudent}
                    />
                  );
                })}
            </ul>
            <ul className="list">
              <h2>Accepted List</h2>
              {course &&
                course.students.map((studentAccepted) => {
                  return (
                    <Accepted
                      key={studentAccepted._id}
                      studentAccepted={studentAccepted}
                    />
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitingList;
