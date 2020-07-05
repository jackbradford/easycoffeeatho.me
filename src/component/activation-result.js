/**
 * This file provides Plantlogg's activation page.
 * The activation links emailed to new users will refer to this page.
 *
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router'; 
import { TailSpin } from "svg-loaders-react"
import ModalBox from '../modal-box';

class ActivationResult extends Component {

    constructor() {

        super();
        this.getLoadingScreen = this.getLoadingScreen.bind(this);
        this.getSuccessScreen = this.getSuccessScreen.bind(this);
        this.getErrorScreen = this.getErrorScreen.bind(this);
        this.goToHomepage = this.goToHomepage.bind(this);
    }

    getLoadingScreen() {

        return (
            <div>
                <div className="svg-container">
                    <TailSpin />
                </div>
            </div>
        );
    }

    getSuccessScreen() {

        return (
            <div>
                <h1>Your account is active!</h1>
                <p>Thank you for joining EasyCoffee!</p>
                <button
                    className="primary-button button"
                    onClick={ this.goToHomepage }
                >
                    Onward!
                </button>
            </div>
        );
    }

    getErrorScreen() {

        return (
            <div>
                <h1>Sorry! We ran into a problem.</h1>
                <p>{ this.props.serverMessage }</p>
                <p>If you still need to activate your account please click the button below to try again.</p>
                <button
                    className="primary-button button"
                    onClick={ this.props.newLinkGenerator }
                >
                    Send New Link
                </button>
            </div>
        );
    }

    goToHomepage() {

        this.props.history.push('/');
    }

    render() {

        if (this.props.isActivating === true) content = this.getLoadingScreen();
        else if (this.props.success === true) content = this.getSuccessScreen();
        else if (this.props.success === false) content = this.getErrorScreen();
        else content = this.getErrorScreen();
        return content;
    }
}

export default withRouter(ActivationResult);

