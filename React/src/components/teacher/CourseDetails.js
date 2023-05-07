import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

function CourseDetails() {
  const location = useLocation();
  const course = location.state.courseDetails;
  console.log("plan of course: ", course.plan);
  const [planList, setPlanList] = useState(
    course.plan.split(".").filter((word) => word !== "")
  );
  const [teacher, setTeacher] = useState({});
  const [mail, setMail] = useState("");
  const [titleMail, setTitleMail] = useState("");

  const handleChangeMail = (e) => {
    setMail(e.target.value);
  };
  const handleChangeTitleMail = (e) => {
    setTitleMail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("send email", e);
    api
      .post(`/courses/${course._id}/email`, { mail: mail, title: titleMail })
      .then((res) => {
        console.log("Email send ");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    api
      .get(`/teachers/${location.state.courseDetails.teacher}`)
      .then((response) => {
        if (response.status === 200) {
          setTeacher(response.data);
        }
      })
      .catch((error) => {
        console.log("no teachers");
        console.error(error);
      });
  }, []);
  return (
    <div className="course">
      <div className="container">
        <div>
          <div className="presontation">
            <h1>{course.title}</h1>
            <h2>Description</h2>
            <p>{course.description}</p>
            <h2>Course Link</h2>
            <a href={course.link}>
              <p>Introduction to {course.title}</p>
            </a>
            <h2>Program</h2>
            <ul>
              {planList.map((chapter) => {
                return <li>{chapter}</li>;
              })}
            </ul>
            <form style={{ display: "block" }} onSubmit={handleSubmit}>
              <label htmlFor="titleMail">Mail title</label>
              <input
                type="text"
                id="titleMail"
                required
                placeholder="Mail title"
                name="titleMail"
                value={titleMail}
                onChange={handleChangeTitleMail}
              />
              <label htmlFor="mail">Mail</label>
              <input
                type="text"
                id="mail"
                required
                placeholder="https://fr.wikipedia.org"
                name="mail"
                value={mail}
                onChange={handleChangeMail}
              />
              <button className="btn-blue">
                Send Email<i class="fa-solid fa-arrow-right"></i>
              </button>
            </form>
          </div>

          <div className="details">
            <div className="image">
              <img src={course.img} alt="" />
            </div>
            <div>
              <div className="detail">
                <span>
                  <i className="fa-solid fa-globe"></i>
                  Type
                </span>
                <span>{course.type}</span>
              </div>
              <div className="detail">
                <span>
                  <i className="fa-solid fa-landmark"></i>
                  Category
                </span>
                <span>{course.category}</span>
              </div>
              <div className="detail">
                <span>
                  <i className="fa-solid fa-sack-dollar"></i> Credit
                </span>
                <span>{course.price} DA</span>
              </div>
              <div className="detail">
                <span>
                  <i className="fa-sharp fa-regular fa-clock"></i>
                  Time perweek
                </span>
                <span>{course.hours} hours</span>
              </div>
              <div className="detail">
                <span>
                  <i className="fa-sharp fa-solid fa-award"></i>
                  certificate
                </span>
                {course.certificate ? (
                  <span>Certificated</span>
                ) : (
                  <span>Decertified</span>
                )}
              </div>
              <div className="detail">
                <span>
                  <i className="fa-solid fa-bell"></i>
                  subscribe
                </span>
                {course.subscribe ? <span>Open</span> : <span>Closed</span>}
              </div>
              <div className="detail">
                <span>
                  <i className="fa-regular fa-calendar"></i>
                  Duration
                </span>
                <span>{4} weeks</span>
              </div>
            </div>
            <div className="teacher-profil">
              <h4>Teacher</h4>
              {/* <img src="./images/teacher.png" alt="" /> */}
              <img src={teacher.img} alt="" />
              <h4>{teacher.username}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
