import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class NavAdmin extends Component {
  render() {
    return (
      <div className="">
        <nav className="navbar navbar-expand-sm navbar-dark bg-danger nav-admin">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="">
                <Link className="nav-link text-light" to="/admin/dashboard">
                  ADMIN DASHBOARD
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/admin/course">
                  Courses
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link text-light" to="/admin/dashboard">
                  Create a course
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/admin/question">
                  Questions
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/admin/addQuestion">
                  Create questions
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/admin/lesson">
                  Lessons
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}