/**
 * This file provides text inputs.
 *
 */
import React, { Component } from 'react';
import {
    EMAIL_VALIDATOR,
} from "../../validators";
import {
    USER_REGISTER_FORM,
} from "../../forms";
import {
    TEXT_INPUT,
    TEXTAREA_INPUT,
    PASSWORD_INPUT,
} from "../../config/user-input-types";

export default class TextInput extends Component {

    constructor() {

        super();
        this.determineInputType = this.determineInputType.bind(this);
        this.getValidateFunction = this.getValidateFunction.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    determineInputType() {

        switch (this.props.type) {

            case TEXT_INPUT:
                return 'text';

            case TEXTAREA_INPUT:
                return 'textarea';

            case PASSWORD_INPUT:
                return 'password';

            default return 'text';
        }
    }

    getValidateFunction() {

        switch (this.props.validator) {

            case EMAIL_VALIDATOR:
                return validator.validateEmail.bind(this);

            case USERNAME_VALIDATOR:
                return validator.validateUsername.bind(this);

            case PASSWORD_VALIDATOR:
                return validator.validatePassword.bind(this);

            case PASSWORD_MATCH_VALIDATOR:
                return validator.validatePasswordMatch.bind(this);

            case NAME_VALIDATOR:
                return validator.validateName.bind(this);

            default
                return '';
        }
    }

    updateAndValidateField(e) {

        var newValue = e.target.value;
        var validator = this.getValidateFunction();
        this.props.update(
            this.props.form,
            this.props.field,
            newValue
        );
        if (validator != '') validator(e);
    }

    render() {

        var inputClass = (this.props.isValid)
            ? "validated-input"
            : "validated-input invalid";
        var statusIconClass = (this.props.isValid)
            ? "input-validation validated-input"
            : "input-validation validated-input invalid";

        return (
            <React.Fragment>
                <input
                    type={ this.determineInputType(); }
                    placeholder={ this.props.placeholder }
                    onFocus={ this.props.onFocus }
                    onBlur={ this.updateAndValidateField }
                    id={ this.props.id }
                    className={ inputClass }
                />
                <div className={ statusIconClass }>
                    <ValidationStatusIcon isValid={ this.props.isValid } />
                </div>
                <ValidationMessage
                    isValid={ this.props.isValid }
                    message={ this.props.validationMessage }
                />
            </React.Fragment>
        );
    }
}

