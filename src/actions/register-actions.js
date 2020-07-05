/**
 * @file register-actions.js
 * Actions for the Register page.
 *
 */
export const REGISTER_USER_BEGIN = 'REGISTER_USER_BEGIN';
export const REGISTER_USER_END = 'REGISTER_USER_END';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const attemptRegisterUser = (formData) => {

    return (dispatch) => {

        dispatch(registerUserBegin());
        return async.request({
            url: 'index.php?ctrl=public&actn=registerUser',
            data: formData
        })
        .then(
            (response) => {
                response = JSON.parse(response);
                dispatch(registerUserEnd(response));
            }
        )
        .catch(
            (error) => {
                dispatch(registerUserError(error));
            }
        );
    };
};

export const registerUserBegin = () => {

    return {
        type: REGISTER_USER_BEGIN,
    }
}

export const registerUserEnd = (response) => {

    return {
        type: REGISTER_USER_END,
        payload: { response: response }
    };
};

export const registerUserError = (error) => {

    return {
        type: REGISTER_USER_ERROR,
        payload: {
            error: error,
        }
    };
};

