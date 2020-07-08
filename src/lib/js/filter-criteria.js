/**
 * @file filter-criteria.js
 * This file provides a means to generate criteria for each filter.
 *
 */
export const getCriterion = (list, filter, value) => {

    switch (list) {

        case BEANS_LIST:
            return getBeansCriterion(filter, value);

        case WATER_LIST:
            return getWaterCriterion(filter, value);

        case EQUIPMENT_LIST:
            return getEquipmentCriterion(filter, value);

        case ARTICLE_LIST:
            return getArticleCriterion(filter, value);

        default:
            throw new Error('Unknown list: ' + listType);
    }
}

export const getBeansCriterion = (filter, value) => {

    switch (filter) {

        case BEANS_ROAST:
            return {
                roast: value,
            };

        case BEANS_PROCESS:
            return {
                process: value,
            };

        case BEANS_ORIGIN:
            return {
                origin: value,
            };

        default:
            throw new Error('Unknown filter: ' + filter);
    }
}

export const getWaterCriterion = (filter, value) => {

    switch (filter) {

        case WATER_BRAND:
            return {
                brand: value
            };

        default:
            throw new Error('Unknown filter: ' + filter);
    }
}

export const getEquipmentCriterion = (filter, value) => {

    switch (filter) {

        case EQUIPMENT_BRAND:
            return {
                brand: value,
            };

        case EQUIPMENT_TYPE:
            return {
                type: value,
            };

        default:
            throw new Error('Unknown filter: ' + filter);
    }
}

export const getArticleCriterion = (filter, value) => {

    switch (filter) {

        case ARTICLES_CATEGORY:
            return {
                category: value
            };

        default:
            throw new Error('Unknown filter: ' + filter);
    }
}

