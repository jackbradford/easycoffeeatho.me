/**
 * @file component/store-listing.js
 * This file is responsible for rendering listings.
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";

export default class StoreListing extends Component {

    componentDidMount() {

    }

    constructor() {

        super();
    }

    render() {

        return (

            <React.Fragment>
            <Breadcrumbs crumbs={ this.props.breadcrumbs } />
            { this.props.content }
                
            </React.Fragment>
        );
    }
}

