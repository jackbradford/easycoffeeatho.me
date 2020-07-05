/**
 * This file provides Plantlogg's activation page.
 * The activation links emailed to new users will refer to this page.
 *
 */
import React, { Component } from 'react';
import HeaderContainer from '../../container/header-container';
import { withRouter } from 'react-router'; 
import { TailSpin } from "svg-loaders-react"
import ModalBox from '../modal-box';

class LoginPage extends Component {

    attemptLogin() {

        var redirectPath = this.props.redirectPath;
        var un = document.getElementById('login-page-email').value;
        var pw = document.getElementById('login-page-password').value;
        this.props.attemptLogin(un, pw, this.props.history, redirectPath);
    }

    componentDidMount() {

    }

    constructor() {

        super();
        this.attemptLogin = this.attemptLogin.bind(this);
    }

    render() {

        return (
            <React.Fragment>
            <HeaderContainer />
            <main className="login">
                { content }
                { linkModal }
            </main>
            <footer></footer>
            </React.Fragment>
        );
    }
}

export default withRouter(LoginPage);

