import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container">
          <img src="./images/logo.png" alt="" />
          <p>We are social</p>
          <div className="social-icons">
            <a href="#instagram">
              <img src="./images/instagram.png" alt="" />
            </a>
            <a href="#facebook">
              <img src="./images/facebook.png" alt="" />
            </a>
            <a href="#email">
              <img src="./images/email.png" alt="" />
            </a>
          </div>
          <p className="copyright">
            &copy; 2023 <span>takwin</span> All Right Reserved
          </p>
        </div>
      </footer>
    );
  }
}
