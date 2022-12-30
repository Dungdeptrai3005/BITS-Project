import React, { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import CourseService from "../services/course.service";
import NavAdmin from "./nav-bar/NavAdmin"

export default class BoardAdmin extends Component {
    constructor(props) {
        super(props)
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveCourse = this.saveTutorial.bind(this)
        this.newCourse = this.newCourse.bind(this)

        this.state = {
            id: null,
            title: "",
            description: "",
            submitted: false
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    saveTutorial() {
        var data = {
            title: this.state.title,
            description: this.state.description
        }
        CourseService.createCourse(data)
        .then((respone)=>{
            this.setState({
                id: respone.data.id,
                title: respone.data.title,
                description: respone.data.description,
                submitted: true
            })
            console.log(respone.data)
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    newCourse() {
        this.setState({
            id: null,
            title: "",
            description: "",
            submitted: false
        })
    }

    componentDidMount() {
        UserService.getAdminBoard().then(
            (respone) => {
                this.setState({
                    content: respone.data
                })
            },
            (error) => {
                this.setState({
                    content:
                    (error.respone &&
                        error.response.data &&
                        error.respone.data.message) ||
                    error.message ||
                    error.toString()
                })
                if(error.respone && error.respone.status === 401) {
                    EventBus.dispatch("logout")
                }
            }
        )
    }

    render() {
        return (
            <div>
        <NavAdmin />
        <div className="container pt-4 w-50">
          <div className="bg-white border submit-form  rounded">
            {this.state.submitted ? (
              <div className="container">
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newCourse}>
                  Add
                </button>
              </div>
            ) : (
              <div className="container pb-4 pt-4 ">
                <h4>Create a course</h4>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    name="title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    name="description"
                  />
                </div>
                <button onClick={this.saveCourse} className="btn btn-success mt-4">
                  Create
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
        )
    }
}