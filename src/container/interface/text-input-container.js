/**
 * @file text-input-container.js
 * This file renders a text input.
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextInput from '../../component/interface/text-input';
import {
    attemptValidateFormField,
    resetForm,
    resetFormStatus,
    resetRegisterName,
    validateFormFieldEnd,
} from '../../actions';
import {
    clientValidateInput,
    serverValidateInput,
} from '../../actions/interface/text-input-actions';
import {
    PASSWORD_MATCH_INPUT,
} from "../../config/user-input-types";

const mapStateToProps = function(state, ownProps) {

    var matchInputId = (ownProps.type == PASSWORD_MATCH_INPUT)
        ? ownProps.options.matchInputId
        : null;
    return {
        fieldState: state.forms[ownProps.form][ownProps.field],
        matchInputId: matchInputId,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        clientValidate: (isValid, form, field) => {
            dispatch(clientValidateInput({
                isValid: isValid,
                form: form,
                field: field,
            }));
        },
        serverValidate: (validator, input, form, field) => {
            dispatch(serverValidateInput({
                validator: validator,
                input: input,
                form: form,
                field: field,
            }));
        },
        update: (form, field, newValue) => {
            dispatch(updateTextInput({
                form: form,
                field: field,
                newValue: newValue,
            }));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextInput);

