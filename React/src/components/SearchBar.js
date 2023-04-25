import React, { useState } from "react";
import { CourseConsumer } from "../context";
import "../CSS/search.css";

function SearchBar({ rol, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  return (
    <CourseConsumer>
      {(value) => {
        return (
          <>
            <form className="search-bar">
              <input
                type="text"
                placeholder="Search for courses, subjects, teachers..."
                value={wordEntered}
                onChange={handleFilter}
              />
              {filteredData.length === 0 ? (
                <button>
                  <i class="fa-sharp fa-solid fa-magnifying-glass fa-2x"></i>
                </button>
              ) : (
                <button id="clearBtn" onClick={clearInput}>
                  <img className="x" src="./images/icons/x.png" alt="" />
                </button>
              )}
            </form>
            {filteredData.length !== 0 && (
              <div className="dataResult">
                {filteredData.slice(0, 15).map((course, i) => {
                  return <p key={i}>{course.title} </p>;
                })}
              </div>
            )}
          </>
        );
      }}
    </CourseConsumer>
  );
}

export default SearchBar;
