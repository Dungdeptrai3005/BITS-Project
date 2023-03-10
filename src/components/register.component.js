import React, { Component } from "react";

import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"

import {isEmail} from "validator"

import { connect } from "react-redux"
import { register } from "../actions/auth";

const required = (value) => {
    if(!value) {
        return(
            <div className="alert alert-danger mt-2" role="alert">
            This field is required!
          </div>
        )
    }
}

const email = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };
  
  const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };
  
  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };

  class Register extends Component {
    constructor(props) {
      super(props);
      this.handleRegister = this.handleRegister.bind(this);
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
  
      this.state = {
        username: "",
        email: "",
        password: "",
        successful: false,
      };
    }
  
    onChangeUsername(e) {
      this.setState({
        username: e.target.value,
      });
    }
  
    onChangeEmail(e) {
      this.setState({
        email: e.target.value,
      });
    }
  
    onChangePassword(e) {
      this.setState({
        password: e.target.value,
      });
    }
  
    handleRegister(e) {
      e.preventDefault();
  
      this.setState({
        successful: false,
      });
  
      this.form.validateAll();
  
      if (this.checkBtn.context._errors.length === 0) {
        this.props
          .dispatch(
            register(this.state.username, this.state.email, this.state.password)
          )
          .then(() => {
            this.setState({
              successful: true,
            });
          })
          .catch(() => {
            this.setState({
              successful: false,
            });
          });
      }
    }
  
    render() {
      const { message } = this.props;
      return(
        <div className="d-flex flex-column align-items-center pt-4">
        <Form
          onSubmit={this.handleRegister}
          ref={(c) => {
            this.form = c;
          }}
        >
          <div className="card">
            <div className="mx-auto d-flex flex-column align-items-center justify-content-center" style={{ maxWidth: "500px", minWidth: "300px" }}>
              <h4 className="card-title text-center mt-4">Create account</h4>
              <form className="card-body">
                {!this.state.successful && (
                  <div>
                    <div className="form-group input-group">
                      <div className="input-group-prepend">
                        <span className="form-control bg-secondary">
                          {" "}
                          <i className="fa fa-user text-light" />{" "}
                        </span>
                      </div>
                      <Input
                        placeholder="User name"
                        type="text"
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        validations={[required, vusername]}
                      />
                    </div>{" "}
                    {/* form-group// */}
                    <div className="form-group input-group mt-4">
                      <div className="input-group-prepend">
                        <span className="form-control bg-secondary">
                          {" "}
                          <i className="fa fa-envelope text-light" />{" "}
                        </span>
                      </div>
                      <Input
                        placeholder="Email address"
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required, email]}
                      />
                    </div>{" "}
                    {/* form-group end.// */}
                    <div className="form-group input-group mt-4">
                      <div className="input-group-prepend">
                        <span className="form-control bg-secondary">
                          {" "}
                          <i className="fa fa-lock text-light" />{" "}
                        </span>
                      </div>
                      <Input
                        placeholder="Create password"
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required, vpassword]}
                      />
                    </div>{" "}
                    <div className="form-group mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        {" "}
                        Sign up
                      </button>
                    </div>{" "}
                  </div>
                )}
                {message && (
                  <div className="form-group">
                    <div
                      className={
                        this.state.successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
                  ref={(c) => {
                    this.checkBtn = c;
                  }}
                />
                <p className="text-center mt-4">
                  Have an account? <a href>Log In</a>{" "}
                </p>
              </form>
            </div>
          </div>{" "}
        </Form>
      </div>

    )}    
}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
      message,
    };
}
  
export default connect(mapStateToProps)(Register);
