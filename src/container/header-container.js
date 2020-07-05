/**
 * @file header-container.js
 * This file provides the container component for the header.
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../component/header';
import {
    attemptLoginRequest,
    resetLoginMessage,
} from '../actions/login-actions';
import {
    resetMenuExpand,
    toggleMenu,
} from '../actions/interface/header-actions';

const mapStateToProps = function(state) {

    return {

        menuExpand: state.header.menuExpand,
        user: state.user,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        resetMenuExpand: () => {

            dispatch(resetMenuExpand());
        },
        toggleMenu: () => {
        
            dispatch(toggleMenu());
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

