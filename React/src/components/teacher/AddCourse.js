import React, { Component } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

export class CoursesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "course title",
      link: "linktocourse",
      description: "course description 101",
      category: "cat3",
      type: "on site",
      price: 200,
      hours: 2,
      certificate: true,
      subscribe: true,
      img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
    };
  }

  changeHandeler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    api
      .post("/courses", this.state)
      .then((res) => {
        console.log("course added");
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
    } = this.state;
    return (
      <div className="course add-course">
        <div className="container">
          <h1>Adding course</h1>
          <form onSubmit={this.submitHandler}>
            <div className="presontation">
              <label htmlFor="title">title</label>
              <input
                type="text"
                id="title"
                required
                placeholder="title"
                name="title"
                value={title}
                onChange={this.changeHandeler}
              />
              <label htmlFor="link">link</label>
              <input
                type="text"
                id="link"
                required
                placeholder="link"
                name="link"
                value={link}
                onChange={this.changeHandeler}
              />
              <label htmlFor="description">description</label>
              <textarea
                type="text"
                id="description"
                required
                placeholder="description"
                name="description"
                value={description}
                onChange={this.changeHandeler}
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
                  <img src="../images/icons/view-grid.png" alt="" />
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
                    value={price}
                    onChange={this.changeHandeler}
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
                    value={hours}
                    onChange={this.changeHandeler}
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
                  <img src="../images/icons/view-grid.png" alt="" />
                  certificate
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
                    value={img}
                    onChange={this.changeHandeler}
                  />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CoursesForm;
