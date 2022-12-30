import React, { Component } from "react";
import CourseService from "../services/course.service";
import { Link } from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);

        this.getCourse = this.getCourse.bind(this);

        this.state = {
            courses: [],
        }
    }

    componentDidMount() {
        this.getCourse()
    }

    getCourse() {
        CourseService.getAllCourse()
        .then((respone)=>{
            this.setState({
                courses: respone.data.Course
            })
            console.log(respone.data.Course)
        })
        .catch((e)=>{
            console.log(e)
        })
    }
    render() {
        const { courses } = this.state;
        return(
            <div className="container home pt-4">
        <div className="d-flex flex-column justify-content-center">
          <h4 className="">Tutorials</h4>

          <ul className="container">
            <div className="d-flex flex-wrap">
              {courses.map((course, index) => (
                <div className="card" key={index}>
                  <div className="card-body d-flex flex-column">
                      <h4 className="card-title">{course.title}</h4>
                      <p className="card-text flex-fill">
                        {course.description}
                      </p>
                      <Link
                        to={"/home/" + course._id}
                        className="btn btn-primary"
                      >
                        Learn
                      </Link>
                    </div>
                </div>
              ))}
            </div>
          </ul>
        </div>
      </div>
        )
    }
}

export default Home;