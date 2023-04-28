import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

//post the course or all the courses

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});


const AddCourse = () => {
    const location = useLocation();
    const teacher = location.state.user
    const intialcourses = teacher.courses

    const [courses, setCourses] = useState(intialcourses);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [program, setProgram] = useState("");
    const [duration, setDuration] = useState(0);
    const [timeWeek, setTimeWeek] = useState(0);
    const [category, setCategory] = useState("");
    const [credit, setCredit] = useState("");
    const [type, setType] = useState("");
    
    const handleTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleDescription = (e) => {
        setDescription(e.target.value);
    };
    const handleProgram = (e) => {
        setProgram(e.target.value);
  };
  const handleDuration = (e) => {
      setDuration(e.target.value);
    };
    const handleTimeWeek = (e) => {
        setTimeWeek(e.target.value);
    };
    const handleCategory = (e) => {
        setCategory(e.target.value);
    };
    const handleCredit = (e) => {
        setCredit(e.target.value);
    };
    const handleType = (e) => {
        setType(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const course = {
            id: uuidv4(),
            title,
            description,
            program,
            duration,
            timeWeek,
            category,
            credit,
            type,
            // certificate: false,
            // subscribe: false,
            // students: [],
            // waitlist: [],
        };
    setCourses([...courses,course])
    console.log(course)
    api
      .post("/", courses) //to modifie
      .then((res) => {
        if (res.status === 200) {
          window.location.href = "http://localhost:3000/auth/google";
        }
      })
      .catch((err) => console.error(err));
  };


useEffect(() => {
    console.log("we called useEffect");
  }, [courses]);

  return (
    <div className="course add-course">
      <div className="container">
        <h1>Adding course</h1>
        <form onSubmit={handleSubmit}>
          <div className="presontation">
            <label htmlFor="title">Title :</label>
            <input type="text" name="title" onChange={handleTitle} />
            <label htmlFor="description">Description :</label>
            <textarea
              id="description"
              name="teacher_description"
              onChange={handleDescription}
            ></textarea>
            <label htmlFor="program">Program :</label>
            <textarea
              id="program"
              name="teacher_program"
              onChange={handleProgram}
            ></textarea>
            <button type="submit" className="btn-blue">
              Add <img src="../images/right-arrow.png" alt="" />
            </button>
          </div>
          <div className="details">
            <div className="image">
              <img src="../images/icons/add-photo.png" alt="" />
            </div>
            <div>
              <div className="detail">
                <span>
                  <img src="../images/icons/calender.png" alt="" />
                  Duration
                </span>
                <span>
                  <input type="number" onChange={handleDuration} /> weeks
                </span>
              </div>
              <div className="detail">
                <span>
                  <img src="../images/icons/clock.png" alt="" />
                  Time perweek
                </span>
                <span>
                  <input type="number" onChange={handleTimeWeek} /> hours
                </span>
              </div>
              <div className="detail">
                <span>
                  <img src="../images/icons/view-grid.png" alt="" />
                  Category
                </span>
                <span>
                  <select
                    name="category"
                    id="category"
                    onChange={handleCategory}
                  >
                    <option value="school">School</option>
                    <option value="lniversity">University</option>
                    <option value="language">Language</option>
                  </select>
                </span>
              </div>
              <div className="detail">
                <span>
                  <img src="../images/icons/coin.png" alt="" />
                  Credit
                </span>
                <span>
                  <input type="number" onChange={handleCredit} /> DA
                </span>
              </div>
              <div className="detail">
                <span>
                  <img src="../images/icons/earth.png" alt="" />
                  Type
                </span>
                <span>
                  <select name="type" id="type" onChange={handleType}>
                    <option value="online">Online</option>
                    <option value="attendance">Attendance</option>
                  </select>
                </span>
              </div>
            </div>
            <div className="teacher-profil">
              <h4>Teacher</h4>
              <img src="../images/teacher.png" alt="" />
              <h4>{teacher.name}</h4>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;