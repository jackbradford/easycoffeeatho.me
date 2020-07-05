/**
 * This file displays lists and galleries. It can be used to list articles,
 * display a gallery of photos, offer a grid of products for sale, etc.
 *
 * It features:
 *  - Pagination
 *  - Sorting
 *  - Search
 *  - Filters
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";

export default class List extends Component {

    componentDidMount() {

    }

    constructor() {

        super();
    }

    render() {

        return (

            <React.Fragment>
            </React.Fragment>
        );
    }
}

List.propTypes = {

    items: PropTypes.object.isRequired,
    layout: PropTypes.string,
    pagination: PropTypes.object,
}

