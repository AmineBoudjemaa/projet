import React, { Component } from 'react'
import { CourseConsumer } from "../context";
import Landing from './homeComponents/Landing';
import ComSoon from './homeComponents/ComSoon';
import Teachers from './homeComponents/Teachers';


export default class Home extends Component {
  render() {
    return (
      <CourseConsumer>
        {value=>{
          return (
            <>
              <Landing />
              <ComSoon/>
              <Teachers/>
            </>
          );
        }}
      </CourseConsumer>
    )
  }
}