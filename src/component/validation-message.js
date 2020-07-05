/**
 * This page allows users to register an account on PlantLogg.
 *
 */
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default class ValidationMessage extends Component {

    /**
     * @method ValidationMessage.render
     * This method only renders the component if there's an error to
     * report.
     *
     */
    render() {

        var classNames = '';
        if (this.props.message) classNames += "validation-message ";
        classNames += (this.props.isValid) ? "valid" : "invalid";
        classNames += (this.props.className) ? " " + this.props.className : '';
        switch (this.props.isValid) {
            case true:
                return;

            case false:
                return (
                    <React.Fragment>
                    <div className={classNames}>{ this.props.message }</div>
                    </React.Fragment>
                );
        }
    }
}

