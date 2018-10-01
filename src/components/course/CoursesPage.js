import React, {PropTypes} from "react";
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';

class CoursesPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }


  courseRow (course, index) {
    return <div key={index}>{course.title}</div>;
  }

  render() {
    const {courses} = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <CourseList courses={courses}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}


function myBindActionCreators(actions, dispatch) {
  let o = {};

   for (let k in actions) {
     o[k] = function () { dispatch(actions[k].apply(undefined, arguments));};
   }
   return o;
}

function mapDispatchToProps(dispatch) {

 let s =  myBindActionCreators(courseActions, dispatch);

  return {
    actions : s
  };

  //Usage
  //this.props.actions.createCourse(course);

  //
  // return {
  //   // createCourse: (course) => dispatch(courseActions.createCourse(course))
  //   createCourse: function (course) { dispatch(courseActions.createCourse(course))}
  // }

  //Usage
  // this.props.createCourse(course);
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(CoursesPage);


