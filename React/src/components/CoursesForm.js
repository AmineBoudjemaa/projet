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
        title: 'course title',
        link: 'linktocourse',
        description: 'course description 101',
        category: 'cat3',
        type: 'on site',
        price: 2000,
        hours: 2,
        certificate: true,
        subscribe: true,
        img:'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'
    };
  }

  changeHandeler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    console.log("clicked")
    e.preventDefault();
    api
      .post("/courses", this.state)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };
  render() {
    const { title,link,description,category,type,price,hours,certificate,subscribe,img } = this.state;
    return (
      <div className="sign-up-container container">
       
        <div className="information">
          {/* <button>Login</button> */}
          <h1>add a course</h1>
          <form onSubmit={this.submitHandler}>
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
            <input
              type="text"
              id="description"
              required
              placeholder="description"
              name="description"
              value={description}
              onChange={this.changeHandeler}
            />
            {/* type */}
            <label htmlFor="type">Choose a type:</label>
            <select id="type" name="type" value={type} required onChange={this.changeHandeler}>
                <option value="on site">on site</option>
                <option value="online">online</option>
            </select>

            {/* category */}
            <label htmlFor="category">Choose a category:</label>
            <select id="category" name="category" value={category} required onChange={this.changeHandeler}>
              <option value="cat1">cat1</option>
              <option value="cat2">cat2</option>
              <option value="cat3">cat3</option>
              <option value="cat4">cat4</option>
            </select>
            

            <label htmlFor="price">price</label>
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

            <label htmlFor="hours">hours</label>
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

            <label htmlFor="certificate">certificate:</label>
            <select id="certificate" name="certificate" value={certificate} required onChange={this.changeHandeler}>
                <option value="true">certificate</option>
                <option value="false">no certificate</option>
            </select>

            <label htmlFor="subscribe">subscribe:</label>
            <select id="subscribe" name="subscribe" value={subscribe} required onChange={this.changeHandeler}>
                <option value="true">on</option>
                <option value="false">off</option>
            </select>

            <label htmlFor="img">img</label>
            <input
              type="text"
              id="img"
              required
              placeholder="img"
              name="img"
              value={img}
              onChange={this.changeHandeler}
            />

            {/* <input type="submit" value="Create your account" /> */}
            <button type="submit" className="submit">
              Submit
            </button>
            {/* <span>
              <i
                className="fa-brands fa-google"
                style={{ color: "#ffffff" }}
              ></i>
            </span> */}
          </form>
        </div>
      </div>
    );
  }
}

export default CoursesForm;