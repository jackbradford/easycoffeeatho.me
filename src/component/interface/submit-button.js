/**
 * This file provides text inputs.
 *
 */
import React, { Component } from 'react';
import { TailSpin } from "svg-loaders-react"

export default class SubmitButton extends Component {

    render() {

        switch (this.props.isBeingSubmitted) {

            case true:
                return (
                    <div className={this.props.className}>
                        <span><TailSpin /><span>
                    </div>
                );

            default:
                return (
                    <div
                        className={ this.props.className }
                        onClick={ this.props.submitFunction }
                    >
                        <span>{ this.props.buttonText }</span>
                    </div>
                );
        }
    }
}

