/**
 * This file provides the container component for the Activation page.
 * plantlo.gg/activate
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Activate from '../component/pages/activate';
import {
    attemptActivateUser,
    attemptGenerateNewActivationLink,
    resetGenerateNewActivationLink,
    resetMenuExpand,
} from '../actions/activate-actions';

const mapStateToProps = function(state) {

    return {

        activationCode: state.activate.activationCode,
        error: state.activate.error,
        isActivating: state.activate.isActivating,
        serverMessage: state.activate.serverMessage,
        success: state.activate.success,
        userId: state.activate.userId,
        newLink: state.activate.newLink,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        attemptActivateUser: (userId, activationCode) => {
            dispatch(attemptActivateUser(userId, activationCode))
        },
        attemptGenerateNewActivationLink: (userId) => {
            dispatch(attemptGenerateNewActivationLink(userId));
        },
        resetGenerateNewLink: () => {
            dispatch(resetGenerateNewActivationLink());
        },
        resetMenuExpand: () => {
            dispatch(resetMenuExpand());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Activate);

