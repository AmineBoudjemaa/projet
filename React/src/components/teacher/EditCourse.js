import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AddModal from "./AddModal";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

function EditCourse() { 
  const location = useLocation();
  const [course, setState] = useState(location.state.courseDetails);
  const [modalOpan, setModalOpan] = useState(false)

  const closeModal = () => {
    setModalOpan( false );
  };
  const openModal = () => {
    setModalOpan( true );
  };

  const handleChange = (e) => {
    setState({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put(`/courses/${course._id}`, course)
      .then((res) => {
        console.log("Course edited ");
        openModal()
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="course add-course">
      <AddModal
        modalOpan={modalOpan}
        closeModal={closeModal}
        comment={""}
        editAdd={"edited"}
        red={false}
      />
      <div className="container">
        <h1>Edit course</h1>
        <form onSubmit={handleSubmit}>
          <div className="presontation">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              required
              placeholder="title"
              name="title"
              value={course.title}
              onChange={handleChange}
            />
            <label htmlFor="link">Link</label>
            <input
              type="text"
              id="link"
              required
              placeholder="link"
              name="link"
              value={course.link}
              onChange={handleChange}
            />
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              required
              placeholder="description"
              name="description"
              value={course.description}
              onChange={handleChange}
            />
            <label htmlFor="plan">Plan</label>
            <textarea
              type="text"
              id="plan"
              required
              placeholder="Start by familiarizing yourself with the basics ..."
              name="plan"
              value={course.plan}
              onChange={handleChange}
            />
            <button type="submit" className="btn-blue">
              Edit <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          {/* type */}
          <div className="details">
            <div className="detail">
              <span>
                <i className="fa-solid fa-globe"></i>
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
                <i className="fa-solid fa-landmark"></i>
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
                  <option value="category">Category</option>
                  <option value="school">School</option>
                  <option value="university">University</option>
                  <option value="language">Language</option>
                </select>
              </span>
            </div>

            <div className="detail">
              <span>
                <i className="fa-solid fa-sack-dollar"></i>
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
                <i className="fa-sharp fa-regular fa-clock"></i>
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
                <i className="fa-sharp fa-solid fa-award"></i>
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
                <i className="fa-solid fa-bell"></i>
                subscribe
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
                <i class="fa-solid fa-image"></i>
                Image
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
