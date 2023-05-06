import React,{useEffect, useState} from 'react'
import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

export default function ComSoon() {
  const [imgs,setImgs] = useState([])
  useEffect(() => {
    console.log("home imgs");
    api
      .get("/home/imgs")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data)
          setImgs(response.data)
        }
      })
      .catch((error) => {
        console.log("no home imgs");
        console.error(error);
      });
  }, []);
  return (
    <div className="comming-soon">
      <div className="container">
        <h1>comming-soon</h1>
        <div className="images">
          {imgs && imgs.map((img)=>{
            return (
              <a href={img.link} target="_blank" rel="noreferrer">
                <img src={img.img || "./images/comming-soon-2.png"} alt="" />
              </a>
            );
          })}
          {/* <a>
            <img src="./images/comming-soon-2.png" alt="" />
          </a>
          <img className="active" src="./images/comming-soon-1.png" alt="" />
          <img src="./images/comming-soon-3.png" alt="" /> */}
        </div>
      </div>
    </div>
  );
}
