import React, { Component } from "react";
import Admin from "./Admin"
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

export class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: [],
    };
  }
  componentDidMount() {
    api
      .get("/admins")
      .then((response) => {
        if (response.status === 200) {
          const strAscending = [...response.data].sort((a, b) =>
            a.title > b.title ? 1 : -1
          );
          this.setState({ admins: strAscending });
        }
      })
      .catch((error) => {
        console.log("no Admins");
        console.error(error);
      });
  }

  handleDelete = (id) => {
    let tempAdmins = this.state.admins.filter((item) => item._id !== id);
    this.setState({ admins: tempAdmins });
    api
      .delete(`/admins/${id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("admin deleted");
        }
      })
      .catch((error) => {
        console.log("no Students");
        console.error(error);
      });
    // handleAlert({ type: "danger", text: "item deleted" });
  };


  render() {
    let admins = this.state.admins;
    return (
      <div>
        <div className="admin-Teachers">
          <div className="container">
            <h1>Students </h1>
            <ul className="list">
              {admins &&
                admins.map((admin) => {
                  return (
                    <Admin
                      key={admin._id}
                      admin={admin}
                      handleDelete={this.handleDelete}
                    />
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentList;
