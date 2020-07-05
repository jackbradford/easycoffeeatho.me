/**
 * @file modal-box
 * This file renders a modal box.
 *
 * A modal box displays a message and offers an `okay` button. An action
 * can be assigned to the button with the `redirect` OR `clickFunction` props.
 * If `redirect` is given, it will take priority over the `clickFunction`.
 * If neither are given, the `Okay` button will dismiss the box.
 *
 * To offer the user a choice between two or more options, use the UserDialog
 * component.
 *
 * Props:
 * ---------------
 * id
 * type ('success', 'error', 'info')
 * redirect (string) A URL. The user will be redirected after dismissing
 *      the dialog.
 * clickFunction (function) An action to perform when the user
 *      dismisses the dialog.
 * className (string)
 * title (string)
 * message (string)
 * buttonText (string)
 *
 *
 */
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class ModalBox extends Component {

    constructor() {

        this.closeModal = this.closeModal.bind(this);
        this.getOkayButton = this.getOkayButton.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    componentDidMount() {

        var element = document.getElementById(this.props.id);
        element.style.left = 0;
    }

    redirect() {

        var addr = this.props.redirect;
        this.props.history.push(addr);
    }

    closeModal() {

        var element = document.getElementById(this.props.id);
        element.style.left = '100%';
    }

    getOkayButton(okayClass, okayId) {
    
        var okay, clickFunction;
        var buttonText = (this.props.buttonText != undefined)
            ? this.props.buttonText
            : 'Okay';
        if (this.props.redirect != undefined) clickFunction = this.redirect;
        else if (this.props.clickFunction != undefined) clickFunction = this.props.clickFunction;
        else clickFunction = this.closeModal;
        return (
            <div
                className={ okayClass }
                onClick={ clickFunction }
                id={ okayId }
            >
            { buttonText }
            </div>
        );
    }

    render() {

        var classes = 'modal ';
        var okayId = this.props.id + '-confirm-button';
        var src, alt, okay, okayClass;

        if (this.props.type == 'success') {
            classes += "success-modal";
            src = "/img/valid.svg";
            alt = "A green checkmark.";
            okayClass = "button primary-button";
        }
        if (this.props.type == 'error') {
            classes += "error-modal";
            src = "/img/error.svg";
            alt = "An orange warning sign.";
            okayClass = "button error-button";
        }
        if (this.props.type == 'info') {
            classes += "info-modal";
            src = "/img/info.svg";
            alt = "Information.";
            okayClass = "button primary-button";
        }

        okay = this.getOkayButton(okayClass, okayId);

        return (
            <React.Fragment>
            <div className={classes} id={this.props.id}>
                <div className="rel-abs-container">
                <div className="rel-abs-inner">
                <img src={src} alt={alt} />
                <h1>{ this.props.title }</h1>
                <p>{ this.props.message }</p>
                { okay }
                </div></div>
            </div>
            </React.Fragment>
        );
    }
}

export default withRouter(ModalBox);

