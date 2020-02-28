/**
 * async.js
 * This file provides a means through which to communicate with the server
 * asyncronously.
 *
 */
var async = (function() {

    /**
     * send()
     * Send an asynchronous request.
     *
     * object options
     * An object with the properties 'url' and 'data'.
     *
     * string options.url
     * The URL of the request.
     *
     * object options.data
     * This object will be converted to JSON and URI encoded before being
     * passed to the server via post.
     *
     * 
     *
     */
    var send = function(options) {

        var url = options.url;
        var data = encodeURIComponent(JSON.stringify(options.data));
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
                errorMsg = 'Internal server error (500).'
            }
            else errorMsg = response.statusText;
            throw Error(errorMsg);
        }
        return response;
    };

    return { request: send };
}());

export { async };

