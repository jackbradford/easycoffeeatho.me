/**
 * This file provides Plantlogg's app header.
 *
 */
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import LoginError from './login-error';
import { mediator }  from '../mediator';
import { auth } from '../auth';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default class Header extends Component {

    componentDidMount() {

        this.props.resetLoginMessage();
    }

    attemptLogin() {

        var response = auth.login;
        if (response.success === true) {

            // Login Succeeded
        }
        else {


        }
    }

    toggleMenu() {

        var menu = document.getElementById('main-menu');
        var header = document.getElementById('app-header');
        if (menu.style.transform == "translateY(0px)") {

            var height = menu.clientHeight + header.clientHeight;
            menu.style.transform = "translateY(-"+ height +"px)";
        }
        else menu.style.transform = "translateY(0px)";
    }

    goToRegister() {

        history.push('/register');
    }

    render() {

        return (

            <React.Fragment>
            <header id="app-header">
                <div>
                    <img
                        className="logo-name"
                        src="/img/plantlogg.svg"
                        alt="plantlogg's flower logo"
                    />
                    <button className="menu" onClick={this.toggleMenu}>
                        <img
                            src="/img/menu-disc-list.svg"
                            alt="Press here to open the main menu."
                        />
                    </button>
                </div>
                <nav id="main-menu">
                    <div className="login">
                        <input
                            type="text"
                            id="login-email"
                            placeholder="your email"
                        />
                        <input
                            type="password"
                            id="login-password"
                            placeholder="password" />
                        <input 
                            className="primary-button"
                            type="submit"
                            value="Login"
                            onClick={this.props.onLoginClick}/>
                    </div>
                    <LoginError errorMessage={this.props.loginMessage} />
                    <div className="register">
                        <h2>Not a member?</h2>
                        <Link to="/register" 
                            className="secondary-button button"
                        >
                            Join
                        </Link>
                    </div>
                </nav>
            </header>
            </React.Fragment>
        );
    }
}
