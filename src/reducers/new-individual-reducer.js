import { combineReducers } from 'redux';
import { auth } from '../auth';
import {
    NEW_INDIVIDUAL_UPDATE_REQUIRED_FIELDS,
    STAGE_IMAGE_BEGIN,
    STAGE_IMAGE_END,
    STAGE_IMAGE_ERROR,
    SUBMIT_NEW_INDIVIDUAL_BEGIN,
    SUBMIT_NEW_INDIVIDUAL_END,
    SUBMIT_NEW_INDIVIDUAL_ERROR,
    TOGGLE_ADD_NEW_PLANT_CONDITION,
    UPDATE_NEW_INDIVIDUAL_FIELD,
    UPDATE_NEW_INDIVIDUAL_NEW_CONDITION,
} from '../actions';

/*
 * The id of the `unit` record to set as the default temperature unit.
 */
const celciusUnitId = 28;

const field = {
    error: null,
    isRequired: false,
    isValid: null,
    isValidating: false,
    message: '',
    serverData: {},
    value: null,
}

const conditionField = {
    ...field,
    newEntry: false,
    label: null,
    description: null
}

const temperatureField = {
    ...conditionField,
    lowerTemp: null,
    upperTemp: null,
    unitId: celciusUnitId,
    notLowerThan: null,
}

export default function newIndividual(

    state = {
        form: {
            isBeingSubmitted: false,
            submittedSuccessfully: null,
            hasErrors: false,
            error: null,
            message: '',
            email: null,
        },
        fields: {
            image: {...field, imageTempPath: null, isLoading: false},
            nickname: field,
            serial: {...field, isRequired: true},
            family: field,
            genus: field,
            species: field,
            subspecies: field,
            variety: field,
            commonName: field,
            origin: field,
            description: field,
            light: {...conditionField},
            water: {...conditionField},
            temperature: {...temperatureField},
            humidity: {...conditionField},
            soil: {...conditionField},
            fertilizer: {...conditionField},
        }
    },
    action
) {

    switch (action.type) {

        case UPDATE_NEW_INDIVIDUAL_FIELD:
            var fieldName = action.payload.fieldName;
            var value = action.payload.value;
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [fieldName]: {
                        ...state.fields[fieldName],
                        value: value,
                    }
                }
            };

        case UPDATE_NEW_INDIVIDUAL_NEW_CONDITION:
            var condition = action.payload.condition;
            var field = action.payload.field;
            var value = action.payload.value;
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [condition]: {
                        ...state.fields[condition],
                        [field]: value
                    }
                }
            };

        case STAGE_IMAGE_BEGIN:
            return {
                ...state,
                fields: {
                    ...state.fields,
                    image: {
                        ...state.fields.image,
                        error: null,
                        isLoading: true,
                        isValid: null,
                        imageTempPath: null,
                    }
                }
            };

        case STAGE_IMAGE_END:
            var imagePath = action.payload.image_data[0].filename;
            return {
                ...state,
                fields: {
                    ...state.fields,
                    image: {
                        ...state.fields.image,
                        isLoading: false,
                        isValid: true,
                        imageTempPath: '/img/tmp/' + imagePath,
                    }
                }
            };

        case STAGE_IMAGE_ERROR:
            return {
                ...state,
                fields: {
                    ...state.fields,
                    image: {
                        ...state.fields.image,
                        isLoading: false,
                        isValid: false,
                        error: action.payload.error,
                    }
                }
            }

        case SUBMIT_NEW_INDIVIDUAL_BEGIN:
            return {
                ...state,
                form: {
                    ...state.form,
                    isBeingSubmitted: true,
                    submittedSuccessfully: null,
                    hasErrors: false,
                    error: null,
                    message: '',
                },
            };

        case SUBMIT_NEW_INDIVIDUAL_END:
            return {
                ...state,
                form: {
                    ...state.form,
                    isBeingSubmitted: false,
                    submittedSuccessfully: action.payload.response.data.success,
                    message: '',
                },
            };

        case SUBMIT_NEW_INDIVIDUAL_ERROR:
            return {
                ...state,
                form: {
                    ...state.form,
                    isBeingSubmitted: false,
                    submittedSuccessfully: false,
                    message: action.payload.error.message,
                    error: action.payload.error,
                    hasErrors: true,
                },
            };

        case TOGGLE_ADD_NEW_PLANT_CONDITION:
            var fieldName = action.payload.fieldName
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [fieldName]: {
                        ...state.fields[fieldName],
                        newEntry: !state.fields[fieldName].newEntry,
                    },
                },
            };

        case NEW_INDIVIDUAL_UPDATE_REQUIRED_FIELDS:
            const fields = action.payload.requiredFields;
            const operation = action.payload.operation;
            if (operation !== 'add' && operation !== 'remove') {
                throw new Error('Operation must be `add` or `remove`.');
            }
            var newFields = {};
            for (var i=0 ; i<fields.length ; i++) {

                newFields[fields[i]] = {

                    ...state.fields[fields[i]],
                    isRequired: (operation === 'add') ? true : false,
                }
            }
            return {
                ...state,
                fields: {
                    ...state.fields,
                    ...newFields,
                }
            };

        default:
            return state;
    }
}

