import React, {PropTypes} from "react";
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';

class CoursesPage extends React.Component {

  constructor(props, context) {

    super(props, context);
    this.state = {
      course:{ title: "" }
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course:course});
  }


  onClickSave() {
   this.props.actions.createCourse(this.state.course);
  }

  courseRow (course, index) {
    return <div key={index}>{course.title}</div>;
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input type="text" onChange={this.onTitleChange} value={this.state.course.title}/>
        <input type="submit" onClick={this.onClickSave} className="btn btn-primary"  value="Save"/>
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


