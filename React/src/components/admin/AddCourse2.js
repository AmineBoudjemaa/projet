import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddCourse = () => {
    const location = useLocation();
    const course = location.state.courseDetails;
    
  return (
    <div className="course add-course">
      {console.log(course)}
      hello from add2
    </div>
  );
};

export default AddCourse;