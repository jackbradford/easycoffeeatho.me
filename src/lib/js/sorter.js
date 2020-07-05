/**
 * @file sorter.js
 * This file provides the Sorter class, which is responsible for sorting
 * lists.
 *
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";

export default class Sorter {

    /**
     * Sorter.sortEquipment
     * Sort a collection/list of equipment items into an array.
     *
     * If the equipment collection is passed as an object it will
     * be converted and returned as an array.
     */
    sortEquipment(equipment, sortOrder) {

        var list = [];
        if (equipment.constructor === Array) list = equipment;
        else for (item in equipment) list.push(item);
        switch (sortOrder) {

            case NAME_ASC:
                return list.sort(function(a, b) {
                    var nameA = a.item_name.toLowerCase();
                    var nameB = b.item_name.toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                });

            case NAME_DESC:
                return list.sort(function(a, b) {
                    var nameA = a.item_name.toLowerCase();
                    var nameB = b.item_name.toLowerCase();
                    if (nameA > nameB) return -1;
                    if (nameA < nameB) return 1;
                    return 0;
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

