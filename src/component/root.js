/**
 * @file root.js
 * This file provides the root component, which contains the router
 * logic.
 *
 */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Page from './pages/page';
import RegisterContainer from '../container/register-container';
import ActivateContainer from '../container/activate-container';
import NewIndividualContainer from '../container/new-individual-container';
import LoginContainer from '../container/login-container';
import Home from './pages/home';

import ContactUs from '';
import UserAccountContainer from '';
import ShoppingCartContainer from '';
import FullCatalog from '';
import BeanCatalog from '';
import BeanListing from '';
import WaterCatalog from '';
import WaterListing from '';
import EquipmentListing from '';
import EquipmentCatalog from '';
import ArticleList from '';
import Article from '';
import HowToArticleList from '';
import InfographicList from '';

export default class Root extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        this.props.loadUserAndAppData();
    }

    render() {

        return (
            <React.Fragment>
                <Route
                    exact path='/'
                    render={(props) => <Page> <Home {...props} /> </Page>}
                />
                <Route
                    exact path='/contact'
                    render={(props) => <Page> <ContactUs {...props} /> </Page>}
                />
                <Route
                    exact path='/register'
                    render={(props) => <Page> <RegisterContainer {...props} /> </Page>}
                />
                <Route 
                    exact path='/login'
                    render={(props) => <Page> <LoginContainer {...props} /> </Page>}
                />
                <Route
                    exact path='/activate'
                    render={(props) => <Page> <ActivateContainer {...props} /> </Page>}
                />
                <Route
                    path='/activate/:userId/:code'
                    render={(props) => <Page> <ActivateContainer {...props} /> </Page>}
                />
                <Route
                    path='/account'
                    render={ (props) => (
                            <Page usersOnly=true>
                                <UserAccountContainer {...props} />
                            </Page>
                    )}
                />
                <Route
                    exact path='/cart'
                    render={(props) => <Page> <ShoppingCartContainer {...props} /> </Page>}
                />
                <Route
                    exact path='/catalog'
                    render={(props) => <Page> <FullCatalog {...props} /> </Page>}
                />
                <Route
                    exact path='/coffee-beans'
                    render={(props) => <Page> <BeanCatalog {...props} /> </Page>}
                />
                <Route
                    path='/coffee-beans/:beanListingId'
                    render={(props) => <Page> <BeanListing {...props} /> </Page}
                />
                <Route
                    exact path='/water'
                    render={(props) => <Page> <WaterCatalog {...props} /> </Page>}
                />
                <Route
                    path='/water/:waterListingId'
                    render={(props) => <Page> <WaterListing {...props} /> </Page}
                />
                <Route
                    exact path='/equipment'
                    render={(props) => <Page> <EquipmentCatalog {...props} /> </Page>}
                />
                <Route
                    path='/equipment/:equipmentListingId'
                    render={(props) => <Page> <EquipmrntListing {...props} /> </Page}
                />
                <Route
                    exact path='/articles'
                    render={(props) => <Page> <ArticleList {...props} /> </Page>}
                />
                <Route
                    exact path='/articles/:articleId'
                    render={(props) => <Page> <Article {...props} /> </Page>}
                />
                <Route
                    exact path='/articles/how-to'
                    render={(props) => <Page> <HowToArticleList {...props} /> </Page>}
                />
                <Route
                    exact path='/infographics'
                    render={(props) => <Page> <InfographicList {...props} /> </Page>}
                />
            </React.Fragment>
        );
    }
}

