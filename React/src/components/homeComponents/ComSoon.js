import React, { Component } from 'react'
import { CourseConsumer } from '../../context'

export default class ComSoon extends Component {
  render() {
    return (<CourseConsumer>{({ comSoonImg, rol }) => {
        return (
          <div className="comming-soon">
            <div className="container">
              <h1>comming-soon</h1>
              <div className="images">
                <img src="./images/comming-soon-2.png" alt="" />
                <img className="active" src="./images/comming-soon-1.png" alt="" />
                <img src="./images/comming-soon-3.png" alt="" />
              </div>
            </div>
          </div>
        );
    }}</CourseConsumer>);
  }
}
