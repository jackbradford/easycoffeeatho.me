import {
    TEXT_INPUT,
    TEXTAREA_INPUT,
    PASSWORD_INPUT,
} from '../config/user-input-types';
import {
    EMAIL_VALIDATOR,
} from '../validators';

export const userRegisterFormFields = {
    emailAddress: {
        type: TEXT_INPUT,
        placeholder: 'your email',
        onFocus: 'this.props.resetFormStatus',
        validator: EMAIL_VALIDATOR,
        id: 'register-email-address',
    },
    username: {
        type: TEXT_INPUT,
        placeholder: 'a new username',
        onFocus: '',
        validator: USERNAME_VALIDATOR,
        id: 'register-username',
    },
    password: {
        type: PASSWORD_INPUT,
        placeholder: 'a new password',
        onFocus: '',
        validator: PASSWORD_VALIDATOR,
        id: 'register-password',
    },
    passwordMatch: {
        type: PASSWORD_MATCH_INPUT,
        placeholder: 'please retype your password'
        onFocus: '',
        validator: PASSWORD_MATCH_VALIDATOR,
        id: 'register-password-match',
        matchInputId: 'register-password',
    },
    firstName: {
        type: TEXT_INPUT,
        placeholder: 'first name (optional)',
        onFocus: '',
        validator: NAME_VALIDATOR,
        id: 'register-first-name',
    },
    lastName: {
        type: TEXT_INPUT,
        placeholder: 'last name (optional)',
        onFocus: 'this.props.resetFormStatus',
        validator: NAME_VALIDATOR,
        id: 'register-last-name',
    },
};

