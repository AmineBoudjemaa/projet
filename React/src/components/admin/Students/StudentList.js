import React, { Component } from 'react'
import Student from './Student';
import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

export class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
  }
  componentDidMount() {
    api
      .get("/students")
      .then((response) => {
        if (response.status === 200) {
          const strAscending = [...response.data].sort((a, b) =>
            a.title > b.title ? 1 : -1
          );
          this.setState({ students: strAscending });
        }
      })
      .catch((error) => {
        console.log("no Students");
        console.error(error);
      });
  }

  handleDelete = (id) => {
    let tempStudents = this.state.students.filter((item) => item._id !== id);
    this.setState({ students: tempStudents });
    api
      .delete(`/students/${id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("student deleted")
          // api
          //   .get("/students")
          //   .then((response) => {
          //     if (response.status === 200) {
          //       console.log(response.data);
          //       this.setState({ students: response.data });
          //     }
          //   })
          //   .catch((error) => {
          //     console.log("no Students");
          //     console.error(error);
          //   });
        }
      })
      .catch((error) => {
        console.log("no Students");
        console.error(error);
      });
    // handleAlert({ type: "danger", text: "item deleted" });
  };

  makeHimAdmin = (id)=>{
    console.log("make him admin")
    let tempStudents = this.state.students.filter((item) => item._id !== id);
    this.setState({ students: tempStudents });
    api
      .post(`/admins/${id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("added to admins");
        }
      })
      .catch((error) => {
        console.log("no Students");
        console.error(error);
      });
  }

  render() {
    let students = this.state.students;
    return (
      <div>
        <div className="admin-Teachers">
          <div className="container">
            <h1>Students </h1>
            <ul className="list">
              {students &&
                students.map((student) => {
                  return (
                    <Student
                      key={student._id}
                      student={student}
                      handleDelete={this.handleDelete}
                      makeHimAdmin={this.makeHimAdmin}
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

export default StudentList
