/**
 * @file activate-actions.js
 * Actions for the Activate features.
 *
 */
export const ACTIVATE_USER_BEGIN = 'ACTIVATE_USER_BEGIN';
export const ACTIVATE_USER_END = 'ACTIVATE_USER_END';
export const ACTIVATE_USER_ERROR = 'ACTIVATE_USER_ERROR';
export const GENERATE_NEW_ACTIVATION_LINK_BEGIN = 'GENERATE_NEW_ACTIVATION_LINK_BEGIN';
export const GENERATE_NEW_ACTIVATION_LINK_END = 'GENERATE_NEW_ACTIVATION_LINK_END';
export const GENERATE_NEW_ACTIVATION_LINK_ERROR = 'GENERATE_NEW_ACTIVATION_LINK_ERROR';
export const RESET_GENERATE_NEW_ACTIVATION_LINK = 'RESET_GENERATE_NEW_ACTIVATION_LINK';

export const resetGenerateNewActivationLink = () => {

    return {
        type: RESET_GENERATE_NEW_ACTIVATION_LINK
    };
}

export const attemptGenerateNewActivationLink = (userId) => {

    return (dispatch) => {
        dispatch(generateNewActivationLinkBegin(userId));
        return async.request({
            url: '/index.php?ctrl=public&actn=generateNewActivationLink',
            data: {
                userId: userId,
            }
        }).then(
            (serverResponse) => {
                var response = JSON.parse(serverResponse);
                dispatch(generateNewActivationLinkEnd(
                    response.data.success,
                    response.data.message,
                ));
            }
        )
        .catch (
            (error) => {
                dispatch(generateNewActivationLinkError(error));
            }
        )
    }
}

export const generateNewActivationLinkBegin = (userId) => {

    return {
        type: GENERATE_NEW_ACTIVATION_LINK_BEGIN,
        payload: {
            userId: userId
        }
    };
};

export const generateNewActivationLinkEnd = (success, message) => {

    return {
        type: GENERATE_NEW_ACTIVATION_LINK_END,
        payload: {
            success: success,
            message: message,
        }
    };
};

export const generateNewActivationLinkError = (error) => {

    return {
        type: GENERATE_NEW_ACTIVATION_LINK_ERROR,
        payload: {
            error: error
        }
    };
};

export const attemptActivateUser = (userId, activationCode) => {

    return (dispatch) => {
        dispatch(activateUserBegin(userId, activationCode));
        return async.request({
            url: '/activate/' + userId + '/' + activationCode,
            data: {
                userId: userId,
                activationCode: activationCode
            }
        }).then(
            (serverResponse) => {
                var response = JSON.parse(serverResponse);
                dispatch(activateUserEnd(
                    response.data.success,
                    response.data.userId,
                    response.data.message
                ));
            }
        )
        .catch(
            (error) => {
                dispatch(activateUserError(error));
            }
        );
    };
};

export const activateUserBegin = (userId, code) => {

    return {
        type: ACTIVATE_USER_BEGIN,
        payload: {
            userId: userId,
            activationCode: code,
        }
    };
};

export const activateUserEnd = (success, userId, message) => {

    return {
        type: ACTIVATE_USER_END,
        payload: {
            success: success,
            userId: userId,
            message: message,
        }
    };
};

export const activateUserError = (error) => {

    return {
        type: ACTIVATE_USER_ERROR,
        payload: { error: error }
    };
};

