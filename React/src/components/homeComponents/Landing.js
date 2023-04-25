import React, { Component } from 'react'

export default class Landing extends Component {
  render() {
    return (
      <div>
        <div className="landing">
          <div className="container">
            <div className="hero-section">
              <div className="text">
                <div>
                  <h1>LEARN WITHOUT LIMITS</h1>
                  <p>
                    Welcome to our online learning platform! We provide a wide
                    range of courses and private lessons to help you enhance
                    your skills and achieve your goals .
                  </p>
                </div>
                <button className="btn-blue">
                  Explore Courses <img src="./images/right-arrow.png" alt="" />
                </button>
              </div>
              <div className="image">
                <img src="./images/landing-section-2.png" alt="amine" />
              </div>
            </div>
            <div className="cards">
              <div className="card">
                <img src="./images/idea.png" alt="" />
                <h3>LEARN FROM EXPERTS</h3>
                <p>
                  1-2 Lessons with industry tutors you know and love (or will
                  soon!)
                </p>
              </div>
              <div className="card">
                <img src="./images/smiley-face.png" alt="" />
                <h3>100% PERSONALISED</h3>
                <p>
                  Identify your goals and enjoy trailord lessons with instant
                  feedback
                </p>
              </div>
              <div className="card">
                <img src="./images/like.png" alt="" />
                <h3>BOOK WITH EASE</h3>
                <p>
                  Find timeslots to suit your schedule with new ones added every
                  week
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="services">
          <div className="container">
            <div className="hero-section">
              <div className="image">
                <img src="./images/hero-section-2.png" alt="amine" />
              </div>
              <div className="text">
                <div>
                  <h1>flexible learning !</h1>
                  <p>
                    At our website , we are convinced that everyone should have
                    the chance to learn in a way that fits their unique needs.
                    This is why we provide personalized teaching that is adapted
                    to your particular learning style and location.
                  </p>
                </div>
                <div className="btns">
                  <button className="btn-whit">ONLINE LESSONS</button>
                  <button className="btn-blue">Attendance classes</button>
                </div>
              </div>
            </div>
            <h1>lessons we offer</h1>
            <div className="lessons">
              <div className="cards">
                <div className="card">
                  <img src="./images/school.png" alt="" />
                  <h3>School</h3>
                  <p>Math , Physics , Science ...</p>
                  <button className="btn-blue">Register</button>
                </div>
                <div className="card">
                  <img src="./images/university.png" alt="" />
                  <h3>University</h3>
                  <p>Mi , St , Biologic , law ...</p>
                  <button className="btn-blue">Register</button>
                </div>
                <div className="card">
                  <img src="./images/language.png" alt="" />
                  <h3>Language</h3>
                  <p>English , French , Germany ...</p>
                  <button className="btn-blue">Register</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
