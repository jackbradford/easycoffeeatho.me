/**
 * @file login-bar.js
 * This file is responsible for the presentation of the login bar.
 *
 */
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import LoginError from './login-error';
import { mediator }  from '../mediator';
import { auth } from '../auth';
import { withRouter } from 'react-router';
import { mainMenuNavItems } from '../config/main-nav-menu-items
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class LoginBar extends Component {

    attemptLogin(e) {

        var currentPath = window.location.pathname;
        var un = document.getElementById('login-email').value;
        var pw = document.getElementById('login-password').value;
        this.props.attemptLogin(un, pw, this.props.history, currentPath);
    }


    constructor() {

        super();
        this.attemptLogin = this.attemptLogin.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e) {

        if (e.key === 'Enter') this.attemptLogin();
    }

    render() {

        return (
            <React.Fragment>
            <div className="login">
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        this.attemptLogin();
                    }}
                >
                    <input
                        type="text"
                        id="login-email"
                        placeholder="your email"
                    />
                    <input
                        type="password"
                        id="login-password"
                        placeholder="password"
                        onKeyPress={ this.handleKeyPress }
                    />
                    <button
                        className="primary-button button"
                        type="submit"
                    />
                        Login
                    </button>
                </form>
                <LoginError errorMessage={ this.props.loginMessage } />
            </div>
            </React.Fragment>
        );
    }
}

export default withRouter(LoginBar);

