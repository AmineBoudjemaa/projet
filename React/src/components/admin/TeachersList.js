import React, { useState, useEffect} from "react";
import Teacher from "./Teacher";
import "../../CSS/adminTeachers.css";
import Alert from "./Alert";
import axios from "axios";

// const initialTeachers = [
//   {
//     _id: "1",
//     name: "amine",
//     modules: ["arab", "Math", "Physics"],
//     description:
//       "My name is Professor Amine TOBNA, and I am a physics teacher with many years of experience in the field. I obtained my undergraduate and graduate degrees in physics from the University of Algiers and have since dedicated my career to teaching and inspiring the next generation of physicists.",
//     courses: [
//       {
//         _id: "642b5c79783e0b0fede8c7da",
//         title: "Introduction to Python",
//         description:
//           "Learn the basics of Python programming language and start your journey as a developer!",
//         img: "https://example.com/python.jpg",
//         category: "school",
//         type: "online",
//         price: 99.99,
//         hours: 20,
//         certificate: false,
//         subscribe: false,
//         students: [],
//         waitlist: [],
//         __v: 0,
//         count: 0,
//         total: 0,
//       },
//       {
//         _id: "642b5c7a783e0b0fede8c7dd",
//         title: "Photography for Beginners",
//         description:
//           "Master the art of photography with this comprehensive course for beginners!",
//         img: "https://example.com/photography.jpg",
//         category: "university",
//         type: "on site",
//         price: 149.99,
//         hours: 30,
//         certificate: true,
//         subscribe: false,
//         students: [],
//         waitlist: [],
//         __v: 0,
//       },
//     ],
//   },
//   {
//     _id: "2",
//     name: "Samy",
//     modules: ["arab", "Math", "Physics"],
//     description:
//       "My name is Professor Amine TOBNA, and I am a physics teacher with many years of experience in the field. I obtained my undergraduate and graduate degrees in physics from the University of Algiers and have since dedicated my career to teaching and inspiring the next generation of physicists.",
//     courses: [
//       {
//         _id: "642b5c7a783e0b0fede8c7df",
//         title: "Digital Marketing Fundamentals",
//         description:
//           "Learn the core concepts and strategies of digital marketing and boost your online presence!",
//         img: "https://example.com/digital-marketing.jpg",
//         category: "language",
//         type: "online",
//         price: 199.99,
//         hours: 40,
//         certificate: true,
//         subscribe: false,
//         students: [],
//         waitlist: [],
//         __v: 0,
//       },
//       {
//         _id: "642b5d3293fd7d5a3fb99c29",
//         title: "Introduction to Python",
//         description:
//           "Learn the basics of Python programming language and start your journey as a developer!",
//         img: "https://example.com/python.jpg",
//         category: "language",
//         type: "online",
//         price: 99.99,
//         hours: 20,
//         certificate: true,
//         subscribe: true,
//         students: [
//           {
//             username: "John Doe",
//             googleId: "1234567890",
//             email: "johndoe@example.com",
//             role: "student",
//             img: "https://example.com/johndoe.jpg",
//             appliedCourses: [],
//             enrolledCourses: [],
//             teachers: [],
//             academicLevel: "Bachelor's degree",
//             phone: "123-456-7890",
//             address: "123 Main St, Anytown USA",
//             dateOfBirth: "1990-01-01T00:00:00.000Z",
//           },
//           {
//             username: "Jane Smith",
//             googleId: "0987654321",
//             email: "janesmith@example.com",
//             role: "student",
//             img: "https://example.com/janesmith.jpg",
//             appliedCourses: [],
//             enrolledCourses: [],
//             teachers: [],
//             academicLevel: "Master's degree",
//             phone: "555-555-5555",
//             address: "456 Broadway, Anytown USA",
//             dateOfBirth: "1995-05-05T00:00:00.000Z",
//           },
//         ],
//         waitlist: [],
//         __v: 0,
//       },
//     ],
//   },
// ];

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

// const initialTeachers = localStorage.getItem("techers")
//   ? JSON.parse(localStorage.getItem("techers"))
//   : [];

function TeachersList() {
  // ******************** State values *********************
  // all teachers, add teachers
  const [teachers, setTeachers] = useState([]);
  // alert
  const [alert, setAlert] = useState({ show: false });

  //handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  // handle delete
  const handleDelete = (id) => {
    let tempTechers = teachers.filter((item) => item._id !== id);
    setTeachers(tempTechers);
    handleAlert({ type: "danger", text: "item deleted" });
  };
  // ******************** useEffect *********************
  useEffect(() => {
    api
      .get("/teachers")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setTeachers(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log("no teachers");
        console.error(error);
      });
    console.log("we called useEffect");
  }, []);


  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <div className="admin-Teachers">
        <div className="container">
          <h1>Teachers</h1>
          <ul className="list">
            {teachers.map((teacher) => {
              return (
                <Teacher
                  key={teacher._id}
                  teacher={teacher}
                  handleDelete={handleDelete}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TeachersList;
