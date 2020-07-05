/**
 * This file provides Plantlogg's app header.
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

class Header extends Component {

    attemptLogin(e) {

        var currentPath = window.location.pathname;
        var un = document.getElementById('login-email').value;
        var pw = document.getElementById('login-password').value;
        this.props.attemptLogin(un, pw, this.props.history, currentPath);
    }

    componentDidMount() {

        this.props.resetLoginMessage();
        this.props.resetMenuExpand();
    }

    constructor() {

        super();
        this.attemptLogin = this.attemptLogin.bind(this);
    }

    goToHomepage() {

        this.props.history.push('/');
    }

    handleKeyPress(e) {

        if (e.key === 'Enter') this.attemptLogin();
    }

    toggleMenu() {

        var menu = document.getElementById('main-menu');
        var header = document.getElementById('app-header');
        var className = '';
        if (this.props.menuExpand === true) {

            className = "expanded";
        }
        return className;
    }

    render() {

        var navClass = this.toggleMenu.bind(this)();
        return (

            <React.Fragment>
            <header id="app-header">
                <div>
                    <img
                        className="logo-name"
                        src="/img/logo-concept-text.svg"
                        alt="plantlogg's flower logo"
                        onClick={this.goToHomepage.bind(this)}
                    />
                    <button className="menu secondary-button button" onClick={this.props.toggleMenu}>
                        <img
                            src="/img/menu-disc-list.svg"
                            alt="Press here to open the main menu."
                        />
                    </button>
                </div>
                <nav id="main-menu" className={navClass}>
                    <LoginBarContainer />
                    <div className="register">
                        <h2>Not a member?</h2>
                        <Link to="/register"
                            className="secondary-button button"
                        >
                            Join
                        </Link>
                    </div>
                    <ul className="menu-items">
                        {mainMenuNavItems.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={ item.link } className={ item.className }>
                                        <span></span>
                                        <span>{ item.itemText }</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <UserAccountNav />
                </nav>
            </header>
            </React.Fragment>
        );
    }
}

export default withRouter(Header);

