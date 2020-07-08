/**
 * @file filter.js
 * This file provides the Filter class, which is responsible for filtering
 * lists.
 *
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";

export default class Filter {

    /**
     * Filter.filterEquipment
     * Filter a collection/list of equipment items.
     *
     * If the equipment collection is passed as an object it will
     * be converted and returned as an array.
     *
     * @param equipment mixed
     * An array or an object containing the set of equipment items.
     *
     * @param filters array
     * An array of filter objects.
     */
    filterEquipment(equipment, filters) {

        var list = [];
        if (equipment.constructor === Array) list = equipment;
        else for (item in equipment) list.push(item);
        filters.forEach(filter => {
            list = this.applyEquipmentFilter(list, filter.type, filter.criteria);
        });
        return list;
    }

    applyEquipmentFilter(list, filter, criteria) {

        switch (filter) {

            case EQUIPMENT_ALL:
                return list;

            case EQUIPMENT_BRAND:
                return list.filter(function(item, index) {
                    return (item.brand == criteria.brand) ? true : false;
                });

            case EQUIPMENT_CATEGORY:
                return list.filter(function(item, index) {
                    return item.tags.includes(criteria.categoryTag);
                });




            case PRICE_LOW_HIGH:
                return list.sort(function(a, b) {
                    var priceA = a.list_price;
                    var priceB = b.list_price;
                    if (priceA < priceB) return -1;
                    if (priceA > priceB) return 1;
                    return 0;
                });

            case PRICE_HIGH_LOW:
                return list.sort(function(a, b) {
                    var priceA = a.list_price;
                    var priceB = b.list_price;
                    if (priceA < priceB) return -1;
                    if (priceA > priceB) return 1;
                    return 0;
                });

            default:
                throw new Error('Unknown sort order: ' + sortOrder);
        }
    }
}

