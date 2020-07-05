/**
 * @file easycoffeeathome.jsx
 * This file is the entry point of the app.
 *
 */
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';
import RootContainer from './container/root-container';

console.log('Running easycoffeeathome.js');
if (process.env.NODE_ENV !== 'production') {

    console.log('easycoffeeathome.js running in DEVELOPMENT mode.');
}

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk
    )
);
const history = syncHistoryWithStore(createBrowserHistory(), store);

/**
 * @class App
 * This is the main React component for the front-end app.
 *
 */
class App extends Component {

    render() {

        return (
            <Provider store={store}>
                <Router history={history}>
                    <RootContainer history={history}/>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render( <App />, document.getElementById('easycoffeeathome') );

