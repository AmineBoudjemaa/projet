import React, { Component } from 'react'
import { CourseConsumer } from "../context";
import Landing from './homeComponents/Landing';
import ComSoon from './homeComponents/ComSoon';
import Teachers from './homeComponents/Teachers';
import axios from 'axios';
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});


export default class Home extends Component {
  submitHandler = (e) => {
    api
      .get("/auth/me")
      .then((res) => {
        console.log(res);
      })
      .then((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <CourseConsumer>
        {value=>{
          return (
            <>
              <Landing />
              <ComSoon/>
              <Teachers/>
              <button onClick={this.submitHandler}>Click</button>
            </>
          );
        }}
      </CourseConsumer>
    )
  }
}
