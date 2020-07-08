/**
 * @file equipment-list.js
 * This file provides a list of equipment.
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '../../component/list';
import {
    attemptLoginRequest,
} from '../../actions';
import Sorter from '../../lib/js/sorter';
import Filter from '../../lib/js/filter';
import { EQUIPMENT_LIST } from '../../config/lists';


const getVisibleEquipment = (equipment, filters, sortOrder) => {

    return Sorter.sortEquipment(Filter.filterEquipment(equipment, filters), sortOrder);
}

const getEquipmentListItemContent = function(item, layout) {

    var className = "list-item " + item.className + ' ' + layout;
    return (
        <div className={className}>
            <img
                className="item-image"
                src={item.catalog_image.src}
                alt={item.catalog_image.alt}
            />
            <h2 className="item-title">{item.title}</h2>
            <h3 className="item-subtitle">{item.subtitle}</h3>
            <p className="item-short-description">{item.short_description}</p>
            <span className="item-price"><ItemPrice price={item.price} /></span>
            <span className="item-unit"><ItemUnit unit={item.unit} /></span>
        </div>
    );
}

const mapStateToProps = function(state) {

    var equip = state.list.EQUIPMENT_LIST;
    return {

        ...equip,
        items: getVisibleEquipment(equip.items, equip.filters, equip.sortOrder),
        itemClass: 'equipment-list-item',
        listType: EQUIPMENT_LIST,
        getListItemContent: getEquipmentListItemContent,
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        fetch: () => {
            dispatch(fetchAllEquipment());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

