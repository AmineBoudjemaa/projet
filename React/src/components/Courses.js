import React, { useState } from "react";
import "../CSS/courses.css";
import { CourseConsumer } from "../context";
import Course from "./Course";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import { Link } from "react-router-dom";

function Courses() {
  // const {currentUser} = useContext(UserContext)
  let [filterCategoryValue, updateCategoryText] = useState("category");
  let [filterTypeValue, updateTypeText] = useState("type");

  const onFilterValueSelectedCategory = (filterValue) => {
    updateCategoryText(filterValue);
  };
  const onFilterValueSelectedType = (filterValue) => {
    updateTypeText(filterValue);
  };

  const allCourses = () =>{
    console.log("amine")
    updateCategoryText("category");
    updateTypeText("type");
  }

  let courses,
    tempcourses = [];

  return (
    <>
      <CourseConsumer>
        {(value) => {
                courses = value.courses.filter((course) => {
                  if (filterCategoryValue === "school") {
                    return course.category === "school";
                  } else if (filterCategoryValue === "language") {
                    return course.category === "language";
                  } else if (filterCategoryValue === "university") {
                    return course.category === "university";
                  } else if (filterCategoryValue === "category") {
                    return course;
                  }
                });
              tempcourses = courses.filter((course) => {
                if (filterTypeValue === "online") {
                  return course.type === "online";
                } else if (filterTypeValue === "attendance") {
                  return course.type === "on site";
                } else if (filterTypeValue === "type") {
                  return course;
                }
              });
              courses = tempcourses
              const length = courses.length
          return (
            <>
              <div className="search">
                <div className="container">
                  <SearchBar data={value.courses} />
                  <div className="search-category">
                    <button className="active" onClick={allCourses}>
                      All courses
                    </button>
                    <Link to="/myCourses">
                      <button>My courses</button>
                    </Link>
                    <Filter
                      filterValueSelectedCategory={
                        onFilterValueSelectedCategory
                      }
                      filterValueSelectedType={onFilterValueSelectedType}
                    />
                  </div>
                </div>
              </div>
              <div className="courses">
                <div className="container">
                  <div className="cards">
                    {length !== 0
                      ? courses.map((course) => {
                          return <Course key={course._id} course={course} />;
                        })
                      : ""}
                  </div>
                  {length === 0 ? <p>Comming soon</p> : ""}
                </div>
              </div>
            </>
          );
        }}
      </CourseConsumer>
    </>
  );
}
export default Courses;
