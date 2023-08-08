import React, { Component } from "react";
import Visitor from "./navBar/Visitor";
import Teacher from "./navBar/Teacher";
import Student from "./navBar/Student";
import Admin from "./navBar/Admin";
import SuperAdmin from "./navBar/SuperAdmin";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  componentDidMount(){
    api
      .get("/auth/me")
      .then((response) => {
        if (response.status === 200) {
          this.setState({ user: response.data });
        } else {
          this.setState({});
        }
      })
      .catch((error) => {
        console.log("no user");
      });
  }
  
  setUser = ()=>{
    // api
    //   .get("/auth/me")
    //   .then((response) => {
    //     if (response.status === 200) {
    //       console.log(response.data);
    //       this.setState({ user: response.data });
    //     }else{
    //       this.setState({});
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("no user");
    //     console.error(error);
    //   });
  }
  render() {
          let nav; 
          if (Object.keys(this.state.user).length !== 0) {
            if (this.state.user.role === "admin") {
              nav = <Admin></Admin>;
            } else if (this.state.user.role === "teacher") {
              nav = <Teacher user={this.state.user}></Teacher>;
            } else if (this.state.user.role === "student") {
              nav = <Student name={this.state.user.username}></Student>;
            } else if (this.state.user.role === "super admin") {
              nav = <SuperAdmin name={this.state.user.username}></SuperAdmin>;
            }
          } else {
            nav = <Visitor setUser={this.setUser}></Visitor>;
          }
          
          return <>{nav}</>
  }
}
