import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// category: "Programming";
// certificate: true;
// description: "Learn the basics of Python programming language and start your journey as a developer!";
// hours: 20;
// img: "https://example.com/python.jpg";
// price: 99.99;
// subscribe: true;
// teacher: null;
// title: "Introduction to Python";
// type: "online";
// waitlist: [];
// __v: 0;
// _id: "642b5da8648064dce44e3475";

function EditCourse() {
  const location = useLocation();
  const [course, setState] = useState(location.state.courseDetails);
  const handleChange = (e) => {
    setState({ ...course, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  console.log(course);
  return (
    <div className="course add-course">
      <div className="container">
        <h1>Edit course</h1>
        <form onSubmit={handleSubmit}>
          <div className="presontation">
            <label htmlFor="title">title</label>
            <input
              type="text"
              id="title"
              required
              placeholder="title"
              name="title"
              value={course.title}
              onChange={handleChange}
            />
            <label htmlFor="link">link</label>
            <input
              type="text"
              id="link"
              required
              placeholder="link"
              name="link"
              value={course.link}
              onChange={handleChange}
            />
            <label htmlFor="description">description</label>
            <textarea
              type="text"
              id="description"
              required
              placeholder="description"
              name="description"
              value={course.description}
              onChange={handleChange}
            />
            <button type="submit" className="btn-blue">
              Add <img src="../images/right-arrow.png" alt="" />
            </button>
          </div>
          {/* type */}
          <div className="details">
            <div className="detail">
              <span>
                <img src="../images/icons/earth.png" alt="" />
                Type
              </span>
              <span>
                <select
                  id="type"
                  name="type"
                  value={course.type}
                  required
                  onChange={handleChange}
                >
                  <option value="on site">on site</option>
                  <option value="online">online</option>
                </select>
              </span>
            </div>

            {/* category */}
            <div className="detail">
              <span>
                <img src="../images/icons/view-grid.png" alt="" />
                Category
              </span>
              <span>
                <select
                  id="category"
                  name="category"
                  value={course.category}
                  required
                  onChange={handleChange}
                >
                  <option value="cat1">cat1</option>
                  <option value="cat2">cat2</option>
                  <option value="cat3">cat3</option>
                  <option value="cat4">cat4</option>
                </select>
              </span>
            </div>

            <div className="detail">
              <span>
                <img src="../images/icons/coin.png" alt="" />
                Credit
              </span>
              <span>
                <input
                  type="number"
                  id="price"
                  //   pattern="[0-9]{10}"
                  required
                  placeholder="2000"
                  name="price"
                  value={course.price}
                  onChange={handleChange}
                />
              </span>
            </div>

            <div className="detail">
              <span>
                <img src="../images/icons/clock.png" alt="" />
                Time perweek
              </span>
              <span>
                <input
                  type="number"
                  id="hours"
                  //   pattern="[0-9]{10}"
                  required
                  placeholder="2000"
                  name="hours"
                  value={course.hours}
                  onChange={handleChange}
                />
              </span>
            </div>

            <div className="detail">
              <span>
                <img src="../images/icons/view-grid.png" alt="" />
                certificate
              </span>
              <span>
                <select
                  id="certificate"
                  name="certificate"
                  value={course.certificate}
                  required
                  onChange={handleChange}
                >
                  <option value="true">certificate</option>
                  <option value="false">no certificate</option>
                </select>
              </span>
            </div>

            <div className="detail">
              <span>
                <img src="../images/icons/view-grid.png" alt="" />
                certificate
              </span>
              <span>
                <select
                  id="subscribe"
                  name="subscribe"
                  value={course.subscribe}
                  required
                  onChange={handleChange}
                >
                  <option value="true">on</option>
                  <option value="false">off</option>
                </select>
              </span>
            </div>

            <div className="detail">
              <span>
                <img src="../images/icons/calender.png" alt="" />
                Duration
              </span>
              <span>
                <input
                  type="text"
                  id="img"
                  required
                  placeholder="img"
                  name="img"
                  value={course.img}
                  onChange={handleChange}
                />
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourse;
