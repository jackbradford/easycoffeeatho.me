/**
 * @file page-container.js
 * This file lets the Page component dispatch actions by providing the
 * connection to Redux.
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from '../../component/page';
import {
    resetLoginMessage,
} from '../../actions/login-actions';
import {
    resetMenuExpand,
} from '../../actions/header-actions';

const mapStateToProps = function(state, ownProps) {

    return {}
};

const mapDispatchToProps = function(dispatch) {

    return {

        resetMenuExpand: () => {

            dispatch(resetMenuExpand());
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

