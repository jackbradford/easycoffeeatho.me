/**
 * @file login-bar-container.js
 * This file renders a login bar.
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginBar from '../../component/interface/login-bar';
import {
    attemptLoginRequest,
    resetLoginMessage,
} from '../../actions/login-actions';

import {

const mapStateToProps = function(state) {

    return {
        loginMessage: state.user.loginRequest.message,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        attemptLogin: (un, pw, history, redirectURL) => {

            dispatch(attemptLoginRequest(un, pw, history, redirectURL));
        },
        resetLoginMessage: () => {

            dispatch(resetLoginMessage());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginBar);

