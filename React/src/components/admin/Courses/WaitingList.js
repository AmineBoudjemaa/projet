import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Waiting from "./Waiting";
import Accepted from "./Accepted"
import "../../../CSS/subscribe-list.css"
import axios from "axios";
import { useEffect } from "react";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

function WaitingList() {
  const location = useLocation();
  const [course, setCourse] = useState(location.state.course);
  
  useEffect(()=>{
    api
      .get(`/courses/${course._id}`)
      .then((response) => {
        if (response.status === 200) {
          setCourse(response.data);
        }
      })
      .catch((error) => {
        console.log("no course");
        console.error(error);
      });
  },[])

  const refrechCourse = ()=>{
    api
      .get(`/courses/${course._id}`)
      .then((response) => {
        if (response.status === 200) {
          setCourse(response.data);
        }
      })
      .catch((error) => {
        console.log("no course");
        console.error(error);
      });
  }
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
                      course={course}
                      refrechCourse={refrechCourse}
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
                      course={course}
                      refrechCourse={refrechCourse}
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
