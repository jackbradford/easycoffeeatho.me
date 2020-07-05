/**
 * @file form-actions.js
 * Actions for Forms. A 'form' is defined via constant in src/config/forms.js.
 *
 */
export const RESET_FORM = 'RESET_FORM';
export const RESET_FORM_SUBMISSION_STATUS = 'RESET_FORM_SUBMISSION_STATUS';

export const resetForm = (options) => {

    return {
        type: RESET_FORM,
        payload: {
            form: options.form,
        }
    }
}

export const resetFormSubmissionStatus = (options) => {

    return {
        type: RESET_FORM_SUBMISSION_STATUS,
        payload: {
            form: options.form,
        }
    }
}

