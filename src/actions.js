/*
 * Actions and action-creators.
 *
 */
import { auth } from './auth';
import { async } from './async';
import { validator } from './validator';

export const STAGE_IMAGE_BEGIN = 'STAGE_IMAGE_BEGIN';
export const STAGE_IMAGE_END = 'STAGE_IMAGE_END';
export const STAGE_IMAGE_ERROR = 'STAGE_IMAGE_ERROR';

/**
 * `url` (string) is the address at the remote server where the image will
 * be sent for processing.
 *
 */
export const tryStageImage = (formData, url, data) => {

    return (dispatch) => {

        dispatch(stageImageBegin());
        return async.request({
            url: url,
            data: formData,
            payloadIsFiles: true,
        }).then(
            (serverResponse) => {
                var response = JSON.parse(serverResponse);
                dispatch(stageImageEnd(response));
            }
        )
        .catch (
            (error) => {
                dispatch(stageImageError(error));
            }
        )
    }
}

export const stageImageBegin = () => {

    return {
        type: STAGE_IMAGE_BEGIN,
    };
}

export const stageImageEnd = (response) => {

    return {
        type: STAGE_IMAGE_END,
        payload: response.data
    };
}

export const stageImageError = (error) => {

    return {
        type: STAGE_IMAGE_ERROR,
        payload: {
            error: error
        }
    }
}
export const SUBMIT_NEW_INDIVIDUAL_BEGIN = 'SUBMIT_NEW_INDIVIDUAL_BEGIN';
export const SUBMIT_NEW_INDIVIDUAL_END = 'SUBMIT_NEW_INDIVIDUAL_END';
export const SUBMIT_NEW_INDIVIDUAL_ERROR = 'SUBMIT_NEW_INDIVIDUAL_ERROR';

export const trySubmitNewIndividual = (values) => {

    return (dispatch) => {

        dispatch(submitNewIndividualBegin());
        return async.request({
            url: '/index.php?ctrl=public&actn=addNewIndividual',
            data: values,
        }).then(
            (serverResponse) => {
                var response = JSON.parse(serverResponse);
                dispatch(submitNewIndividualEnd(response));
            }
        )
        .catch (
            (error) => {
                dispatch(submitNewIndividualError(error));
            }
        )
    }
}

export const submitNewIndividualBegin = () => {

    return {
        type: SUBMIT_NEW_INDIVIDUAL_BEGIN,
    };
}

export const submitNewIndividualEnd = (response) => {

    return {
        type: SUBMIT_NEW_INDIVIDUAL_END,
        payload: response.data
    };
}

export const submitNewIndividualError = (error) => {

    return {
        type: SUBMIT_NEW_INDIVIDUAL_ERROR,
        payload: {
            error: error
        }
    }
}
export const UPDATE_NEW_INDIVIDUAL_NEW_CONDITION = 'UPDATE_NEW_INDIVIDUAL_NEW_CONDITION';
export const updateNewIndividualNewCondition = (condition, field, value) => {

    return {
        type: UPDATE_NEW_INDIVIDUAL_NEW_CONDITION,
        payload: {
            condition: condition,
            field: field,
            value: value,
        }
    }
}

export const UPDATE_NEW_INDIVIDUAL_FIELD = 'UPDATE_NEW_INDIVIDUAL_FIELD';

export const updateNewIndividualField = (fieldName, value) => {

    return {
        type: UPDATE_NEW_INDIVIDUAL_FIELD,
        payload: {
            fieldName: fieldName,
            value: value,
        }
    }
}

export const NEW_INDIVIDUAL_UPDATE_REQUIRED_FIELDS = 'NEW_INDIVIDUAL_UPDATE_REQUIRED_FIELDS';
export const TOGGLE_ADD_NEW_PLANT_CONDITION = 'TOGGLE_ADD_NEW_PLANT_CONDITION';

export const toggleAddNewPlantCondition = (fieldName) => {

    return {
        type: TOGGLE_ADD_NEW_PLANT_CONDITION,
        payload: {
            fieldName: fieldName,
        }
    }
}

export const updateRequiredFieldsForNewIndividual = (operation, array) => {

    return {
        type: NEW_INDIVIDUAL_UPDATE_REQUIRED_FIELDS,
        payload: {
            operation: operation,
            requiredFields: array,
        }
    }
};



export const LOAD_USER_AND_APP_DATA_BEGIN = 'LOAD_USER_AND_APP_DATA_BEGIN';
export const LOAD_USER_AND_APP_DATA_END = 'LOAD_USER_AND_APP_DATA_END';
export const LOAD_USER_AND_APP_DATA_ERROR = 'LOAD_USER_AND_APP_DATA_ERROR';

export const tryLoadUserAndAppData = (userId) => {

    return (dispatch) => {

        dispatch(loadUserAndAppDataBegin());
        return async.request({
            url: '/index.php?ctrl=public&actn=getUserAndAppData',
            data: {},
        }).then(
            (serverResponse) => {
                var response = JSON.parse(serverResponse);
                dispatch(loadUserAndAppDataEnd(response));
            }
        )
        .catch (
            (error) => {
                dispatch(loadUserAndAppDataError(error));
            }
        )
    }
}

export const loadUserAndAppDataBegin = () => {

    return {
        type: LOAD_USER_AND_APP_DATA_BEGIN,
    };
}

export const loadUserAndAppDataEnd = (response) => {

    return {
        type: LOAD_USER_AND_APP_DATA_END,
        payload: response.data
    };
}

export const loadUserAndAppDataError = (error) => {

    return {
        type: LOAD_USER_AND_APP_DATA_ERROR,
        payload: {
            error: error
        }
    }
}

export const CHECK_LOGIN_BEGIN = 'CHECK_LOGIN_BEGIN';
export const CHECK_LOGIN_END = 'CHECK_LOGIN_END';
export const CHECK_LOGIN_ERROR = 'CHECK_LOGIN_ERROR';

export const checkUserIsLoggedIn = () => {

    return (dispatch) => {

        dispatch(checkLoginBegin());
        return async.request({
            url: '/index.php?ctrl=public&actn=checkUserIsLoggedIn',
            data: {}
        }).then(
            (serverResponse) => {
                var response = JSON.parse(serverResponse);
                dispatch(checkLoginEnd(response));
            }
        )
        .catch (
            (error) => {
                dispatch(checkLoginError(error));
            }
        )
    }
}

export const checkLoginBegin = () => {

    return {
        type: CHECK_LOGIN_BEGIN,
    }
}

export const checkLoginEnd = (response) => {

    return {
        type: CHECK_LOGIN_END,
        payload: {
            response: response
        }
    }
}

export const checkLoginError = (error) => {

    return {
        type: CHECK_LOGIN_ERROR,
        payload: {
            error: error
        }
    }
}


/**
 * Actions for /register
 *
 * TODO:
 * determine whether this is removeable.
 *
 */
export const RESET_REGISTER_NAME = 'RESET_REGISTER_NAME';
export const RESET_REGISTER_FORM_STATUS = 'RESET_REGISTER_FORM_STATUS';
export const RESET_REGISTER_FORM = 'RESET_REGISTER_FORM';

export const resetFormStatus = () => {

    return {
        type: RESET_REGISTER_FORM_STATUS,
    }
}

export const resetRegisterName = (options) => {

    return {

        type: RESET_REGISTER_NAME,
        payload: {
            fieldType: options.fieldType
        }
    }
};

