/**
 * @file pages/activate.js
 * This file provides the activation page.
 * The activation links emailed to new users refer to this page.
 *
 */
import React, { Component } from 'react';
import ModalBox from '../modal-box';

export default class Activate extends Component {

    componentDidMount() {

        // take userId and activation code and contact server.
        // set isActivating to true.
        var userId = this.props.match.params.userId;
        var code = this.props.match.params.code;
        this.props.attemptActivateUser(userId, code);
    }

    getNewActivationLink() {

        var userId = this.props.match.params.userId;
        this.props.attemptGenerateNewActivationLink(userId);
    }

    getBoxClasses() {

        var classes = {
            success: '',
            error: '',
        };
        if (this.props.newLink.success === true) classes.success += ' display';
        if (this.props.newLink.success === false) classes.error += ' display';
        return classes;
    }

    getErrorMessage() {

        var errorMessage = "We couldn't generate a new account activation link. Please try again later."
        if (this.props.newLink.serverMessage != '') {
            errorMessage += " (" + this.props.newLink.serverMessage + ")";
        }
        return errorMessage;
    }

    render() {

        var errorMessage = this.getErrorMessage();
        var boxClasses = this.getBoxClasses();

        return (
            <React.Fragment>
            <main className="activate">
                <ActivationResult
                    isActivating={ this.props.isActivating }
                    success={ this.props.success }
                    serverMessage={ this.props.serverMessage }
                    newLinkGenerator={ this.getNewActivationLink }
                />
                <ModalBox
                    className={ boxClasses.success }
                    id="new-link-generated"
                    type='success'
                    redirect='/login'
                    title='Check your email!'
                    message="We've sent you an activation link."
                />
                <ModalBox
                    className={ boxClasses.error }
                    id="new-link-error"
                    type="error"
                    clickFunction={ this.props.resetGenerateNewLink }
                    title="Error"
                    message={ errorMessage }
                />
            </main>
            </React.Fragment>
        );
    }
}

