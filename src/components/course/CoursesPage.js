import React, {PropTypes} from "react";
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import {browserHistory} from "react-router";

class CoursesPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }


  courseRow (course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  render() {
    const {courses} = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
                value="Add Course"
                 className="btn btn-primary"
                 onClick={this.redirectToAddCoursePage}/>
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


