import React, { useEffect, useState } from "react";
import "../CSS/courses.css";
import Course from "./Course";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

function Courses() {
  // const {currentUser} = useContext(UserContext)
  let [categoryOption, setCategoryOption] = useState("category");
  let [typeOption, setTypeOption] = useState("type");
  let [free, setFree] = useState(false);
  let [allCourses, setAllCourses] = useState([]);
  let [courses, setCourses] = useState([]);
  let [user, setUser] = useState([]);

  const handleAllCourses =()=>{
    setCourses(allCourses)
  }

  const handleTypeChange = (event) => {
    setTypeOption(event.target.value);
    if (event.target.value === "type") {
      setCourses(allCourses);
    } else {
      const tempCourses = allCourses.filter(
        (course) => course.type === event.target.value
      );
      setCourses(tempCourses);
    }
  };

  const handleCategoryChange = (event) => {
    setCategoryOption(event.target.value);
    if(event.target.value==="category"){
      setCourses(allCourses);
    }else {
      const tempCourses = allCourses.filter(
        (course) => course.category === event.target.value
      );
      setCourses(tempCourses);
    }
  };

  const handleFreeCourse = (i) => {
    if (!free) {
      const freeCourse = i.filter((course) => course.price === 0);
      console.log(freeCourse);
      setCourses(freeCourse);
    } else {
      setCourses(allCourses);
    }
    setFree(!free);
  };

  useEffect(() => {
    console.log("useEffect");
    api
      .get("/courses")
      .then((response) => {
        if (response.status === 200) {
          setCourses(response.data);
          setAllCourses(response.data);
        }
      })
      .catch((error) => {
        console.log("no courses");
        console.error(error);
      });
    api
      .get("/auth/me")
      .then((response) => {
        if (response.status === 200) {
          // console.log(response.data)
          setUser(response.data);
        }
      })
      .catch((error) => {
        console.log("no courses");
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="search">
        <div className="container">
          {/* <SearchBar data={value.courses} /> */}
          <div className="search-category">
            <button className="active" onClick={()=>{handleAllCourses()}}>
              All courses
            </button>
            {user.role === "student" ? (
              <Link to="/myCourses">
                <button>My courses</button>
              </Link>
            ) : (
              <></>
            )}
            <select
              name="category"
              id="category"
              onChange={handleCategoryChange}
            >
              <option value="category">Category</option>
              <option value="school">School</option>
              <option value="university">University</option>
              <option value="language">Language</option>
            </select>
            <select
              name="type"
              id="type"
              onChange={handleTypeChange}
            >
              <option value="type">type</option>
              <option value="online">Online</option>
              <option value="on site">on site</option>
            </select>
            <span>
              <input
                type="checkbox"
                id="free-courses"
                name="free-courses"
                onClick={() => handleFreeCourse(courses)}
              />
              <label htmlFor="free-courses">Free courses</label>
            </span>
          </div>
        </div>
      </div>
      <div className="courses">
        <div className="container">
          <div className="cards">
            {courses &&
              courses.map((course) => {
                return <Course key={course._id} course={course} />;
              })}
          </div>
          {courses.length === 0 ? <p>Comming soon</p> : ""}
        </div>
      </div>
    </>
  );
}
export default Courses;
