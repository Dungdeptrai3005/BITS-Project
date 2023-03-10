import React, {Component} from "react";
import {Link} from "react-router-dom"

import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"

import { connect } from "react-redux"
import { login } from "../actions/auth"

const required = (value) => {
    if(!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!!
            </div>
        )
    }
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)

        this.state = {
            username: "",
            password: "",
            loading: false
        }
    }
    
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState ({
            password: e.target.value
        })
    }

    handleLogin(e) {
        e.preventDefault() 

        this.setState({
            loading: true
        })

    this.form.validateAll();

    const { dispatch, history} = this.props;

    if(this.checkBtn.context._errors.length === 0) {
            dispatch(login(this.state.username, this.state.password))
            .then(() => {
                history.location.push("/home")
                window.location.reload()
            })
            .catch(() => {
                this.setState({
                    loading: false
                })
            })
        }else {
            this.setState({
                loading: false
            })
        }
    }

    render () {
        const { isLoggedIn, message } = this.props;
        if (isLoggedIn) {
            return <Link to="/home"></Link>
        }

        return(
            <Form
        onSubmit={this.handleLogin}
        ref={(c) => {
          this.form = c;
        }}
      >
        <div id="login" className="pt-4">
          <div className="container">
            <div
              id="login-row"
              className="row d-flex flex-column justify-content-center align-items-center"
            >
              <div id="login-column" className="col-md-3">
                <div id="login-box" className="col-md-12">
                  <form id="login-form" className="form bg-white rounded border p-4" action method="post">
                    <h3 className="text-center text-dark">Login</h3>
                    <div className="form-group">
                      <label htmlFor="username" className="text-dark">
                        Username:
                      </label>
                      <br />
                      <Input
                        id="username"
                        type="text"
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="text-dark">
                        Password:
                      </label>
                      <br />
                      <Input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-md mt-4"
                        disabled={this.state.loading}
                      >
                        {this.state.loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Login</span>
                      </button>
                    </div>
                    {message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
        )
    }
}

function mapStatetoProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return(
        isLoggedIn,
        message
    )
}

export default connect(mapStatetoProps)(Login);