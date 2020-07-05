/**
 * This file provides the container component for the Root component.
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Root from '../component/root';
import {
    checkUserIsLoggedIn,
    tryLoadUserAndAppData,
} from '../actions';

const mapStateToProps = function(state) {

    return {

        user: state.user,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

//        checkUserIsLoggedIn: () => {
//            dispatch(checkUserIsLoggedIn())
//        },
        loadUserAndAppData: () => {
            dispatch(tryLoadUserAndAppData());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);


