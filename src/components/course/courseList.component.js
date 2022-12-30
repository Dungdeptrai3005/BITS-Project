import React, {Component} from "react";
import CourseService from "../../services/course.service";
import { Link } from "react-router-dom";
import NavAdmin from "../nav-bar/NavAdmin"

export default class CourseList extends Component {
    constructor(props) {
        super(props);
        this.getCourse = this.getCourse.bind(this)
        this.refreshList = this.refreshList.bind(this)
        this.setActiveCourse = this.setActiveCourse.bind(this)
        this.state = {
            courses: [],
            currentCourse: null,
            currentIndex: -1
        }
    }

    componentDidMount() {
        this.getCourse();
    }

    getCourse() {
        CourseService.getAllCourse()
        .then((respone)=>{
            this.setState({
                courses: respone.data.Course
            })
            console.log(respone.data.Course)
        })
        .catch((e)=> {
            console.log(e)
        })
    }

    refreshList() {
        this.getCourse();
        this.setState({
            currentCourse: null,
            currentIndex: -1
        })
    }

    setActiveCourse(course, index) {
        this.setState({
            currentCourse: course,
            currentIndex: index
        })
    }

    render() {
        const { courses, currentCourse,currentIndex} = this.state;
        return(
            <div>
        <NavAdmin/>
        <div className="pt-4 pb-3">
          <div className="container bg-white w-50 pb-4 border rounded">
            <h4 className="pt-2">Tutorials List</h4>
            <ul className="list-group">
              {courses &&
                courses.map((course, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveCourse(course, index)}
                    key={index}
                  >
                    {index+1 + ". " + course.title}
                  </li>
                ))}
            </ul>
          </div>
          <div className="container bg-white w-50 pb-4 pt-4 border rounded mt-3 mb-3">
            {currentCourse ? (
              <div>
                <h4>Tutorial</h4>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentCourse.title}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentCourse.description}
                </div>

                <Link to={"/admin/course/" + currentCourse._id}
                  className="btn btn-warning mt-4">
                  Edit
                </Link>
              </div>
            ) : (
              <div>
                <p>Please click on a Tutorial...</p>
              </div>
            )}
          </div>
        </div>
      </div>
        )
    }
}