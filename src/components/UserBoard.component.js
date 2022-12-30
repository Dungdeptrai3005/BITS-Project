import React, { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BoardUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: ""
        }
    }

    componentDidMount() {
        UserService.getUserBoard().then(
            respone => {
                this.setState ({
                    content: respone.data
                })
            },
            error => {
                this.setState({
                    content:
                    (error.respone &&
                        error.respone.data &&
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
        return(
            <div className="container">
            <header className="jumbotron">
              <h3>{this.state.content}</h3>
            </header>
          </div>
        )
    }
}