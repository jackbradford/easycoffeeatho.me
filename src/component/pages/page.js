/**
 * This file provides Plantlogg's activation page.
 * The activation links emailed to new users will refer to this page.
 *
 */
import React, { Component } from 'react';
import HeaderContainer from '../../container/header-container';

export default class Page extends Component {

    componentDidMount() {

        this.props.resetLoginMessage();
        this.props.resetMenuExpand();
    }

    render() {

        return (
            <React.Fragment>
            <HeaderContainer />
                { this.props.content }
            <footer></footer>
            </React.Fragment>
        );
    }
}

