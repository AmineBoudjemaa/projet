import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
// import AddModal from "./AddModal";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies with requests
});

export default function ComSoon() {
  const containerRef = useRef(null);
  const [imgs, setImgs] = useState([]);
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const [link3, setLink3] = useState("");

  useEffect(() => {
    console.log("home imgs");
    api
      .get("/home/imgs")
      .then((response) => {
        if (response.status === 200) {
          const imgs = response.data;
          setImgs(imgs);
          console.log(imgs);
          setImg1(imgs[0].img);
          setLink1(imgs[0].link);
          if(imgs.length>=2){
            setImg2(imgs[1].img);
          setLink2(imgs[1].link);
          }
          if(imgs.length===3){
          setImg3(imgs[2].img);
          setLink3(imgs[2].link);
          }
          
        }
      })
      .catch((error) => {
        console.log("no home imgs");
        console.error(error);
      });
  }, []);

  const handleImg1 = (e) => {
    console.log(e.target.value);
    setImg1(e.target.value);
  };
  const handleImg2 = (e) => {
    console.log(e.target.value);
    setImg2(e.target.value);
  };
  const handleImg3 = (e) => {
    console.log(e.target.value);
    setImg3(e.target.value);
  };

  const handleLink1 = (e) => {
    console.log(e.target.value);
    setLink1(e.target.value);
  };
  const handleLink2 = (e) => {
    console.log(e.target.value);
    setLink2(e.target.value);
  };
  const handleLink3 = (e) => {
    console.log(e.target.value);
    setLink3(e.target.value);
  };

  const submitHandler1 = (e) => {
    e.preventDefault();
    console.log("submit 1");
    // console.log(imgs);
    // console.log(imgs[0]._id);
    // console.log(imgs.length);
    // api
    //   .delete(`/home/imgs/${imgs[0]._id}`)
    //   .then((res) => {
    //     console.log("img1 end link1 deleted ");
    //   })
    //   .catch((error) => {
    //     console.log("img1 end link1 deleted erroe");
    //     console.error(error);
    //   });
    if (imgs.length >= 1) {
      api
        .delete(`/home/imgs/${imgs[0]._id}`)
        .then((res) => {
          console.log("img1 end link1 deleted ");
          // openModal();
          api
            .post(`/home/imgs`, { img: img1, link: link1 })
            .then((res) => {
              console.log("img1 end link1 added ");
              // openModal();
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      api
        .post(`/home/imgs`, { img: img1, link: link1 })
        .then((res) => {
          console.log("img1 end link1 added ");
          // openModal();
        })
        .catch((error) => {
          console.error(error);
        });
    }
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };
  const submitHandler2 = (e) => {
    e.preventDefault();
    console.log("submit 2");
    if (imgs.length >= 2) {
      api
        .delete(`/home/imgs/${imgs[1]._id}`)
        .then((res) => {
          console.log("img1 end link1 deleted ");
          // openModal();
          api
            .post(`/home/imgs`, { img: img2, link: link2 })
            .then((res) => {
              console.log("img2 end link2 added ");
              // openModal();
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      api
        .post(`/home/imgs`, { img: img2, link: link2 })
        .then((res) => {
          console.log("img2 end link2 added ");
          // openModal();
        })
        .catch((error) => {
          console.error(error);
        });
    }
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };
  const submitHandler3 = (e) => {
    e.preventDefault();
    console.log("submit 3");
    if (imgs.length >= 3) {
      api
        .delete(`/home/imgs/${imgs[2]._id}`)
        .then((res) => {
          console.log("img1 end link1 deleted ");
          // openModal();

          api
            .post(`/home/imgs`, { img: img3, link: link3 })
            .then((res) => {
              console.log("img3 end link3 added ");
              // openModal();
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      api
        .post(`/home/imgs`, { img: img3, link: link3 })
        .then((res) => {
          console.log("img3 end link3 added ");
          // openModal();
        })
        .catch((error) => {
          console.error(error);
        });
    }
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };
  return (
    <div className="comming-soon">
      <div className="container">
        <h1>comming-soon</h1>
        <div className="cards" ref={containerRef}>
          <form className="card add-card" onSubmit={submitHandler1}>
            <label htmlFor="img">Image link:</label>
            <input
              type="text"
              id="img"
              required
              placeholder="http://img.org"
              name="img"
              value={img1}
              onChange={handleImg1}
            />
            <label htmlFor="link">Facebook link:</label>
            <input
              type="text"
              id="link"
              required
              placeholder="http://facebook.com/page"
              name="link"
              value={link1}
              onChange={handleLink1}
            />
            <button
              type="submit"
              className="btn-blue"
              style={{ width: "100%", fontSize: 22 }}
            >
              Add
            </button>
          </form>
          <form className="card add-card" onSubmit={submitHandler2}>
            <label htmlFor="img">Image link:</label>
            <input
              type="text"
              id="img"
              required
              placeholder="http://img.org"
              name="img"
              value={img2}
              onChange={handleImg2}
            />
            <label htmlFor="link">Facebook link:</label>
            <input
              type="text"
              id="link"
              required
              placeholder="http://facebook.com/page"
              name="link"
              value={link2}
              onChange={handleLink2}
            />
            <button
              type="submit"
              className="btn-blue"
              style={{ width: "100%", fontSize: 22 }}
            >
              Add
            </button>
          </form>
          <form className="card add-card" onSubmit={submitHandler3}>
            <label htmlFor="img">Image link:</label>
            <input
              type="text"
              id="img"
              required
              placeholder="http://img.org"
              name="img"
              value={img3}
              onChange={handleImg3}
            />
            <label htmlFor="link">Facebook link:</label>
            <input
              type="text"
              id="link"
              required
              placeholder="http://facebook.com/page"
              name="link"
              value={link3}
              onChange={handleLink3}
            />
            <button
              type="submit"
              className="btn-blue"
              style={{ width: "100%", fontSize: 22 }}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
