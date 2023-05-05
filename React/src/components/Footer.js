import React, { Component } from 'react'
import logo from "../logo.png"

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container">
          <img src={logo} alt="" />
          <p>We are social</p>
          <div className="social-icons">
            <a href="#instagram">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="#facebook">
              <i class="fa-brands fa-facebook"></i>
            </a>
            <a href="#email">
              <i class="fa-solid fa-envelope"></i>
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
