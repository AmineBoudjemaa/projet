import React, { Component } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: "",
      name: "",
    };
  }

  changeHandeler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    api
      .post("/auth/signup", this.state)
      .then((res) => {
        if (res.status === 200) {
          window.location.href = "http://localhost:3000/auth/google";
        }
      })
      .catch((err) => console.error(err));
  };
  render() {
    const { tel, name } = this.state;
    return (
      <div className="sign-up-container container">
        <div className="image">
          <img src="./images/Sign-up.png" alt="" />
          <h1>Welcome to our Website</h1>
        </div>
        <div className="information">
          {/* <button>Login</button> */}
          <h1>cREATE YOUR FREE ACCOUNT</h1>
          <form onSubmit={this.submitHandler}>
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              id="name"
              required
              placeholder="Your name"
              name="name"
              value={name}
              onChange={this.changeHandeler}
            />
            <label htmlFor="tel">Phone number</label>
            <input
              type="tel"
              id="tel"
              //   pattern="[0-9]{10}"
              required
              placeholder="0606060606"
              name="tel"
              value={tel}
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

export default SignUp;
