/**
 * This file provides the container component for the Activation page.
 * plantlo.gg/activate
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginPage from '../component/pages/login';
import {
    attemptLoginRequest,
} from '../actions';

const mapStateToProps = function(state) {

    return {

        user: state.user,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        attemptLogin: (un, pw, history, redirectURL) => {
            dispatch(attemptLoginRequest(un, pw, history, redirectURL))
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);

