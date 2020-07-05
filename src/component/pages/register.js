/**
 * @file register.js
 * This page allows users to register an account.
 *
 */
import React, { Component } from 'react';
import ValidationMessage from '../validation-message';
import SubmitButton from '../interface/submit-button';
import FormSubmissionResult from '../interface/form-submission-result';
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { USER_REGISTER_FORM } from "../../forms";
import { userRegisterFormFields } from "../../config/user-registration-form-fields";
import { PASSWORD_MATCH_INPUT } from "../../config/user-input-types";

export default class Register extends Component {

    constructor() {
        super();
        this.attemptRegisterUser = this.attemptRegisterUser.bind(this);
        this.getInputs = this.getInputs.bind(this);
    }

    componentDidMount() {

        this.props.resetMenuExpand();
        this.props.resetForm();
    }

    attemptRegisterUser() {

        try {
            if (!this.props.emailAddress.isValid) {
                throw new Error('Email is invalid.');
            }
            if (!this.props.username.isValid) {
                throw new Error('Username is invalid.');
            }
            if (!this.props.password.isValid) {
                throw new Error('Password is invalid.');
            }
            if (!this.props.passwordMatch.isValid) {
                throw new Error('Passwords do not match.');
            }
        }
        catch (error) {

            this.props.registerUserEnd({
                success: true,
                data: {
                    success: false,
                    message: error.message,
                    error: error,
                }
            });
            return;
        }
        this.props.attemptRegisterUser({
            emailAddress: document.getElementById("register-email-address").value,
            username: document.getElementById("register-username").value,
            password: document.getElementById("register-password").value,
            firstName: document.getElementById("register-first-name").value,
            lastName: document.getElementById("register-last-name").value,
        });
    }

    getInputs() {

        var inputs = [];
        for (const field in userRegisterFormFields) {

            var options = (field.type == PASSWORD_MATCH_INPUT)
                ? { matchInputId: field.matchInputId }
                : {}
            inputs.push((
                <TextInputContainer
                    type={ field.type }
                    form={ USER_REGISTER_FORM }
                    field={ field }
                    placeholder={ field.placeholder }
                    onFocus={ field.onFocus }
                    validator={ field.validator }
                    id={ field.id }
                    isValid={ this.props[field].isValid }
                    validationMessage={ this.props[field].message }
                    options={ options }
                />
            ));
        }
        return inputs;
    }

    render() {

        return (
            <React.Fragment>
            <HeaderContainer />
            <main className="registration-form">
                <h1>Create an Account</h1>
                <div className="registration-inputs">
                    { this.getInputs(); }
                    <ValidationMessage
                        isValid={ !this.props.formStatus.hasErrors }
                        message={ this.props.formStatus.message }
                        className="submit-validation"
                    />
                    <SubmitButton 
                        className="primary-button button submit"
                        submitFunction={ this.attemptRegisterUser }
                        isBeingSubmitted={ this.props.formStatus.isBeingSubmitted }
                        buttonText="Register"
                    />
                    <FormSubmissionResult
                        form={ USER_REGISTER_FORM }
                        title="Success!"
                        message="You're almost done! We've sent an activation link to the email address you provided."
                        redirect="/login"
                        formStatusResetFunction={ this.props.resetForm }
                    />
                </div>
            </main>
            </React.Fragment>
        );
    }
}

