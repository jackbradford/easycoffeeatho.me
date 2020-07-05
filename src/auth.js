/**
 * auth.js
 * This file provides a means to authorize users.
 *
 */
import { mediator } from './mediator';
import { bindActionCreators } from 'redux';
import { completeLogin as cl } from './actions';

var auth = (function() {

    /**
     * auth.login()
     * Attempt to log a user into the site. Works with completeLogin(), which
     * handles the response from the server.
     *
     * return void
     */
    var attemptLogin = function(dispatch, username, password) {

        var url = '/index.php?ctrl=public&actn=auth';
        var data = encodeURIComponent(JSON.stringify({
            un: username,
            pw: password,
        }));
        return fetch(url, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "data=" + data + "&async=1"

        })
            .then(handleErrors)
            .then( (response) => { 
            
                return response.text();
            });
    };

    var handleErrors = function(response) {

        if (!response.ok) {
            var errorMsg;
            if (response.status == 500) {
                errorMsg = 'Sorry! The server is having some trouble at the moment.'
            }
            else errorMsg = response.statusText;
            throw Error(errorMsg);
        }
        return response;
    }

    var clearErrors = function(e) {

        while (e.firstChild) e.removeChild(e.firstChild);
    };

    return {

        login: attemptLogin
    }
}());

export { auth };

