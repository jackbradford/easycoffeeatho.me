/**
 * @file equipment-list.js
 * This file provides a list of equipment.
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '../component/list';
import {
    attemptLoginRequest,
} from '../actions';
import Sorter from '../../lib/js/sorter';
import Filter from '../../lib/js/filter';


const getVisibleEquipment = (equipment, filters, sortOrder) => {

    return Sorter.sortEquipment(Filter.filterEquipment(equipment, filters), sortOrder);
}

const mapStateToProps = function(state) {

    var equipment = state.list.equipment;
    var filters = equipment.filters;
    var sort = equipment.sort;
    return {

        items: getVisibleEquipment(equipment, filters, sort)
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
)(List);

