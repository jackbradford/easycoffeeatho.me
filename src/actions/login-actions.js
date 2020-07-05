/**
 * Actions for the Login.
 *
 */
export const LOGIN_REQUEST_BEGIN = 'LOGIN_REQUEST_BEGIN';
export const LOGIN_REQUEST_END = 'LOGIN_REQUEST_END';
export const LOGIN_REQUEST_ERROR = 'LOGIN_REQUEST_ERROR';
export const RESET_LOGIN_MESSAGE = 'RESET_LOGIN_MESSAGE';

/**
 * @function attemptLoginRequest
 * Send an asynchronous request to the server to attempt a login.
 *
 * IMPORTANT:
 * This function has a side effect: it redirects the user to a
 * location you specify if the login is a success.
 *
 *
 * @param string un
 * The username.
 *
 * @param string pw
 * The user's password.
 *
 * @param obj history
 * The history object is needed to fulfill a redirect.
 *
 * @param string redirectPath
 * The path to redirect the user to once login is successful. Defaults to '/'.
 *
 * return void
 */
export const attemptLoginRequest = (un, pw, history, redirectPath) => {

    redirectPath = redirectPath || '/';
    return (dispatch) => {

        dispatch(loginRequestBegin());
        return auth.login()
            .then(
                (response) => { 
                    response = JSON.parse(response);
                    dispatch(loginRequestEnd(response));
                    if (response.success === true) {
                        history.push(redirectPath);
                        dispatch(toggleMenu());
                        dispatch(tryLoadUserAndAppData());
                    }
                }
            )
            .catch(
                (error) => { dispatch(loginRequestError(error)); }
            );
    };
}

export const loginRequestBegin = () => {

    return {

        type: LOGIN_REQUEST_BEGIN
    };
};

/**
 * Even though the login REQUEST has ended successfully, the user may still not
 * be logged in.
 */
export const loginRequestEnd = (serverResponse) => {

    return {

        type: LOGIN_REQUEST_END,
        payload: { 
            serverResponse: serverResponse
        }
    };
};

/**
 * This error occurs when the server returns (e.g.) a 500 error. This error
 * does NOT occur when the server denies the login due to invalid credentials,
 * for example.
 */
export const loginRequestError = (error) => {

    return {

        type: LOGIN_REQUEST_ERROR,
        payload: { error: error }
    };
};

export const resetLoginMessage = () => {

    return {

        type: RESET_LOGIN_MESSAGE
    };
};
