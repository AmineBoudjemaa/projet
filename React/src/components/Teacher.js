import React, { Component } from "react";
import { CourseConsumer } from "../context";
import { Link } from "react-router-dom";

export default class Teacher extends Component {
  render() {
    const { _id, name, modules, description } = this.props.teacher;
    return (
      <CourseConsumer>
        {({ handleDetailsTeacher }) => (
          <Link to="/teacher">
            <div className="card" onClick={() => handleDetailsTeacher(_id)}>
              <div className="image">
                <img src="./images/teacher.png" alt="" />
                <div className="name">
                  {name}
                  <span className="star">
                    <img src="./images/star.png" alt="" />
                    <span>4.2</span>
                  </span>
                </div>
              </div>
              <div className="modules">
                {modules.map((module, i) => {
                  return <p key={i}>{module}</p>;
                })}
              </div>
              <p>{description.slice(0, 100)}...</p>
            </div>
          </Link>
        )}
      </CourseConsumer>
    );
  }
}
