/**
 * @file form-submission-result.js
 * This file renders a modal box that displays the result of a form
 * submission.
 *
 * This component will render nothing if `formSubmitted` is passed as null.
 *
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router'; 
import ModalBox from '../modal-box';

class FormSubmissionResult extends Component {

    render() {

        switch (this.props.formSubmitted) {

            case true:
                var id = this.props.form + '_SUBMIT_SUCCESS';
                return (
                    <ModalBox
                        type="success"
                        title={ this.props.title }
                        message={ this.props.message }
                        redirect={ this.props.redirect }
                        history={ this.props.history }
                        id={ id }
                    />
                );

            case false:
                var message = "Something went wrong! Please try again later.";
                var title = "Error";
                var id = this.props.form + '_SUBMIT_ERROR';
                return (
                    <ModalBox
                        type="error"
                        title={ title }
                        message={ message }
                        id={ id }
                        reset={this.props.resetFormStatus}
                    />
                );
            default return;
        }
    }
}

export default withRouter(FormSubmissionResult);

