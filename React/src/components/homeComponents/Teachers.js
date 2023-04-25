import React, { Component } from 'react'
import { CourseConsumer } from '../../context';
import Teacher from '../Teacher'

export default class Teachers extends Component {
  render() {
    return (
      <CourseConsumer>
        {({ rol, homeTeachers }) => {
          return (
            <div className="teachers">
              <div className="container">
                <h1>Teachers</h1>
                <div className="cards">
                  {homeTeachers.map((teacher) => {
                    return <Teacher key={teacher._id} teacher={teacher} />;
                  })}
                </div>
              </div>
            </div>
          );
        }}
      </CourseConsumer>
    );
  }
}
