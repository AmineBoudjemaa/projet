import React, { Component } from "react";
import axios from "axios";
import AddModal from "./AddModal";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

export class CoursesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      link: "",
      description: "",
      category: "",
      type: "on site",
      price: 2000,
      hours: 2,
      certificate: true,
      subscribe: true,
      img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
      plan: "",
      modalOpan: false,
    };
  }

  changeHandeler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpan: false };
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const {
      title,
      link,
      description,
      category,
      type,
      price,
      hours,
      certificate,
      subscribe,
      img,
      plan,
    } = this.state;
    api
      .post("/courses", {
        title,
        link,
        description,
        category,
        type,
        price,
        hours,
        certificate,
        subscribe,
        img,
        plan,
      })
      .then((res) => {
        console.log("course added");
        this.setState({ modalOpan: true });
      })
      .catch((err) => console.error(err));
  };
  render() {
    const {
      title,
      link,
      description,
      category,
      type,
      price,
      hours,
      certificate,
      subscribe,
      img,
      plan,
    } = this.state;
    return (
      <div className="course add-course">
        <AddModal
          modalOpan={this.state.modalOpan}
          closeModal={this.closeModal}
          comment={""}
          editAdd={"added"}
          red={false}
        />
        <div className="container">
          <h1>Adding course</h1>
          <form onSubmit={this.submitHandler}>
            <div className="presontation">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                required
                placeholder="BOOL ALGEBRA"
                name="title"
                value={title}
                onChange={this.changeHandeler}
              />
              <label htmlFor="link">Link</label>
              <input
                type="text"
                id="link"
                required
                placeholder="https://fr.wikipedia.org"
                name="link"
                value={link}
                onChange={this.changeHandeler}
              />
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                id="description"
                required
                placeholder="A course on Boolean algebra is typically an introductory..."
                name="description"
                value={description}
                onChange={this.changeHandeler}
              />
              <label htmlFor="plan">Plan</label>
              <textarea
                type="text"
                id="plan"
                required
                placeholder="Start by familiarizing yourself with the basics ..."
                name="plan"
                value={plan}
                onChange={this.changeHandeler}
              />
              <button type="submit" className="btn-blue">
                Add <i class="fa-solid fa-arrow-right"></i>
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
                    value={type}
                    required
                    onChange={this.changeHandeler}
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
                    value={category}
                    required
                    onChange={this.changeHandeler}
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
                  <i className="fa-solid fa-sack-dollar"></i> Credit
                </span>
                <span>
                  <input
                    type="number"
                    id="price"
                    //   pattern="[0-9]{10}"
                    required
                    placeholder="2000"
                    name="price"
                    value={price}
                    onChange={this.changeHandeler}
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
                    value={hours}
                    onChange={this.changeHandeler}
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
                    value={certificate}
                    required
                    onChange={this.changeHandeler}
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
                    value={subscribe}
                    required
                    onChange={this.changeHandeler}
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
                    value={img}
                    onChange={this.changeHandeler}
                  />
                </span>
              </div>
              <div className="teacher-profil">
                <h4>Teacher</h4>
                <img src="./images/teacher.png" alt="" />
                <h4>{}</h4>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CoursesForm;
