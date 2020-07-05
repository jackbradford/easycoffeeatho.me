/**
 * This file defines, as constants, each action that can be taken on or by
 * means of a text input.
 *
 * It also defines the functions which create the true "action" objects.
 *
 */
export const SERVER_VALIDATE_INPUT_BEGIN = 'SERVER_VALIDATE_INPUT_BEGIN';
export const SERVER_VALIDATE_INPUT_END = 'SERVER_VALIDATE_INPUT_END';
export const SERVER_VALIDATE_INPUT_ERROR = 'SERVER_VALIDATE_INPUT_ERROR';
export const UPDATE_TEXT_INPUT = 'UPDATE_TEXT_INPUT';

export const updateTextInput = (options) => {

    return {

        type: UPDATE_TEXT_INPUT,
        payload: {
            form: options.form,
            field: options.field,
            newValue: options.newValue;
        }
    };
};

export const clientValidateInput = (options) => {

    var validator = options.validator;
    switch (validator) {

        case PASSWORD_VALIDATOR:
            return;
    }
    return {

        type: CLIENT_VALIDATE_INPUT,
        payload: {
            
        }
    }
}

/**
 * @function serverValidateInput
 * This function attempts to validate user inputs with the server.
 *
 * @param object `options`
 *  options.validator (string)
 *  Indicates the set of criteria that will be used to check the input agaist.
 *
 *  options.input (string)
 *  The user input.
 */
export const serverValidateInput = (options) => {

    return (dispatch) => {

        dispatch(serverValidateInputBegin(options));
        return async.send(
            url: '/index.php?ctrl=public&actn=validateInput',
            data: {
                validator: options.validator,
                userInput: options.input,
            },
        )
        .then(
            (response) => {
                response = JSON.parse(response);
                dispatch(serverValidateInputEnd(response));
            }
        )
        .catch(
            (error) => {
                dispatch(serverValidateInputError(error));
            }
        );
    };
};

export const serverValidateInputBegin = (options) => {

    return {

        type: SERVER_VALIDATE_INPUT_BEGIN,
        payload: {

            fieldType: options.fieldType,
            fieldId: options.fieldId,
            matchFieldId: options.matchFieldId,
            e: options.e
        }
    };
};

export const serverValidateInputEnd = (serverResponse) => {

    return {

        type: SERVER_VALIDATE_INPUT_END,
        payload: {
            serverResponse: serverResponse,
        }
    };
};

export const serverValidateInputError = (error) => {

    return {

        type: SERVER_VALIDATE_INPUT_ERROR,
        payload: {
            error: error
        }
        
    };
};

