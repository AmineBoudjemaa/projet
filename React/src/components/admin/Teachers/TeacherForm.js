import React, { useState, useEffect } from "react";
import "../../../CSS/add-teacher.css";
import "../../../CSS/add-course.css";
import "../../../CSS/courses.css";
import "../../../CSS/course.css";
import { Link, useLocation } from "react-router-dom";
import Alert from "../Alert";
import Course from "../../Course";



const TeacherForm = () => {
  const location = useLocation();
  // ******************** State values *********************
  //single teacher
  const [teacher, setTeacher] = useState(location.state.teacher);
  const [name, setName] = useState(teacher.username);
  const [modules, setModule] = useState(teacher.modules);
  const [description, setDescription] = useState(teacher.description);
//   const [courses, setCourses] = useState(teacher.courses);
  // alert
  const [alert, setAlert] = useState({ show: false });
  // edit
  const [edit, setEdit] = useState(true);
  // ******************** useEffect *********************
  useEffect(() => {
    console.log("we called useEffect");
  }, []);
  //handle teacher info
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleModules = (e) => {
    setModule(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  //handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  //handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "" || modules !== "" || description !== "") {
      if (edit) {
        let tempTecher = { ...teacher, name, modules, description };
        console.log(tempTecher);
        setTeacher(tempTecher);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      }
      setName("");
      setModule("");
      setDescription("");
    } else {
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount vlue has to be bigger then zero`,
      });
    }
  };
  return (
    <div className="add-course add-teacher">
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="prop">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id="name"
              placeholder="AMINE TOBNA"
              value={name}
              onChange={handleName}
            />
            <label htmlFor="modules">Modules :</label>
            <input
              type="text"
              id="modules"
              placeholder="Physics/Math/Algebra"
              value={modules}
              onChange={handleModules}
            />
            <label htmlFor="bio">Description :</label>
            <textarea
              id="bio"
              value={description}
              onChange={handleDescription}
            ></textarea>
            <button type="submit" className="btn-blue">
              Edit <img src="./../images/right-arrow.png" alt="" />
            </button>
          </div>
          <div className="photo">
            <img src="../images/icons/add-photo.png" alt="" />
          </div>
        </form>
        <h4>Courses :</h4>
        <div className="courses">
          <div className="cards">
            {teacher.courses.length !== 0
              ? teacher.courses.map((course) => {
                  return (
                    <Course
                      key={course._id}
                      course={course}
                    />
                  );
                })
              : ""}
            <Link to="/admin/AddCourse" state={{ teacher }}>
              <div className="card add-card">
                <img src="../images/icons/add.png" alt="" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherForm;
