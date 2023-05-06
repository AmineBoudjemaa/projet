import React, { useState, useEffect } from "react";
import Teacher from "../Teacher";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

export default function Teachers() {
  const [homeTeachers, setHomeTeachers] = useState([]);
  useEffect(() => {
    api
      .get("/home/teachers")
      .then((response) => {
        if (response.status === 200) {
          const newList = [];
          response.data.map((obj) => {
            newList.push(obj.teacher);
          });
          setHomeTeachers(newList);
        }
      })
      .catch((error) => {
        console.log("no home teachers");
        console.error(error);
      });
  }, []);
  return (
    <div className="teachers">
      <div className="container">
        <h1>Teachers</h1>
        <div className="cards">
          {homeTeachers &&
            homeTeachers.map((teacher) => {
              return <Teacher key={teacher._id} teacher={teacher} />;
            })}
        </div>
      </div>
    </div>
  );
}
