import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../App.css";
import "./navHeader.css";

import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";
import { history } from "../../helpers/history";
import EventBus from "../../common/EventBus";


class NavHeader extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }
  render() {
    const { currentUser, showAdminBoard } = this.state;
    return (
      <nav className="navbar navbar-expand navbar-light d-flex justify-content-between nav-header">
        <div className="navbar-nav left">
          <li className=" nav-item-logo">
            <Link to={"/"}>
              {/* <img className="logo" src={logo} alt="logo"></img> */}
            </Link>
          </li>

          {/* <div className="navbar-nav"> */}
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin/dashboard"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
          {/* </div> */}
        </div>

        <div className="">
          {currentUser ? (
            <div className="navbar-nav right">
              <li className="">
                <Link to={"/profile"}>
                  <button type="button" class="btn btn-outline-dark border-0">
                    {currentUser.username}
                  </button>
                </Link>
              </li>
              <li className="">
                <Link to="/login" onClick={this.logOut}>
                  <button type="button" class="btn btn-danger">
                    Log Out
                  </button>
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav">
              <li className="">
                <Link to={"/login"}>
                  <button type="button" class="btn btn-outline-dark border-0">
                    Login
                  </button>
                </Link>
              </li>

              <li className="">
                <Link to={"/register"}>
                  <button type="button" class="btn btn-danger ml-4">
                    Sign Up
                  </button>
                </Link>
              </li>
            </div>
          )}
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(NavHeader);
