/**
 * validator.js
 * This file provides a means to validate user inputs.
 *
 */
import { bindActionCreators } from 'redux';
import {
    EMAIL_VALIDATOR,
    USERNAME_VALIDATOR,
    PASSWORD_VALIDATOR,
    PASSWORD_MATCH_VALIDATOR,
    NAME_VALIDATOR,
} from './validators';

var validator = (function() {

    /**
     * @method validator.validateEmail
     * This function requires the caller to bind their `this` variable
     * to it prior to calling the function.
     *
     */
    var email = function(e) {

        this.props.serverValidate(EMAIL_VALIDATOR, e.target.value);
    };

    var username = function(e) {

        this.props.serverValidate(USERNAME_VALIDATOR, e.target.value);
    };

    /**
     * Passwords must be at least 8 characters and include at least one of 
     * each of the following:
     *  lowercase letter
     *  uppercase letter
     *  number
     *  special character
     *
     */
    var password = function(e) {

        var password = e.target.value;
        try {
            if (!password.match(/.{12,}/)) {
                throw new Error('Password must be at least 12 characters long.');
            }
            this.props.clientValidate({
                isValid: true,
                form: this.props.form,
                field: this.props.field,
                message: 'password is valid',
            });
        }
        catch (error) {

            this.props.clientValidate({
                isValid: false,
                form: this.props.form,
                field: this.props.field,
                message: error.message,
            });
        }
    }

    var passwordMatch = function(e) {

        var retype = e.target.value;
        var password = document.getElementById('register-password').value;
        try {
            if (retype !== password) {
                throw new Error('Passwords do not match.');
            }
            this.props.validate.passwordMatch({
                success: true,
                data: {
                    success: true,
                    message: 'Passwords match.',
                    fieldType: 'passwordMatch'
                }
            });
        }
        catch (error) {
            this.props.validate.passwordMatch({
                success: true,
                data: {
                    success: false,
                    message: error.message,
                    fieldType: 'passwordMatch'
                }
            });
        }
    }

    var name = function(e) {

        var name = e.target.value;
        if (!name.match(/.{1,}/)) {

            this.props.clientValidate({
                isValid: null,
                form: this.props.form,
                field: this.props.field,
                message: '',
            });
            return;
        }
        this.props.clientValidate({
            isValid: true,
            form: this.props.form,
            field: this.props.field,
            message: '',
        });
    }

    return {

        validateEmail: email,
        validateUsername: username,
        validatePassword: password,
        validatePasswordMatch: passwordMatch,
        validateName: name,
    }
}());

export { validator };

