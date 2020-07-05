/**
 * @file register-container.js
 * This file provides the container for the Register page.
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Register from '../component/pages/register';
import { USER_REGISTER_FORM } from '../config/forms';
import {
    attemptRegisterUser,
    registerUserEnd,
} from '../actions/register-actions';
import {
    resetForm,
    resetFormSubmissionStatus,
} from '../actions/form-actions';

const mapStateToProps = function(state) {

    return {

        emailAddress: state.register.fields.emailAddress,
        firstName: state.register.fields.firstName,
        formStatus: state.register.form,
        lastName: state.register.fields.lastName,
        password: state.register.fields.password,
        passwordMatch: state.register.fields.passwordMatch,
        username: state.register.fields.username,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        attemptRegisterUser: (formData) => {
            dispatch(attemptRegisterUser(formData))
        },
        registerUserEnd: (response) => {
            dispatch(registerUserEnd(response))
        },
        resetForm: () => {
            dispatch(resetForm({ form: USER_REGISTER_FORM }))
        },
        resetFormSubmissionStatus: () => {
            dispatch(resetFormSubmissionStatus({ form: USER_REGISTER_FORM }))
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

