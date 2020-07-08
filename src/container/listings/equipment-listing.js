/**
 * @file equipment-listing.js
 * This file provides an equipment listing for the store.
 *
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '../../component/list';
import {
    attemptLoginRequest,
} from '../../actions';
import { fetchListItems } from '../../actions/list-actions';
import Sorter from '../../lib/js/sorter';
import Filter from '../../lib/js/filter';
import { EQUIPMENT_LIST } from '../../config/lists';

const equipmentItem = {
    id: null,
    images: [],
    code: null,
    mpn: null,
    list_price: 0,
    quantity: 0,
    description: '',
    short_description: '',
    how_to: '',
    reviews: [],
    questions: [],
    brand: null,
    tags: [],
    add_ons: []
};

const getEquipmentListingContent = function(item) {

    /**
     * TODO
     * Components:
     *  Gallery (lazy load)
     *  IsInStock
     *  ShippingInfo
     *  AddOns (lazy load)
     *  StoreItemDescription (lazy load)
     */
    return (
        <React.Fragment>
        <div className="store-listing">
            <Gallery images={ item.images } />
            <div className="listing-details">
                <h1>{item.name}</h1>
                <h2>Product code: {item.code}</h2>
                <h2>Mfg. Part No: {item.mpn}</h2>
                <p className="price">$\{item.list_price}</p>
                <IsInStock inStock={ itemIsInStock(item) } />
                <ShippingInfo />
            </div>
            <AddOns addOnItems={ item.add_ons } />
            <div className="equipment-listing-descriptions">
                <StoreItemDescription description={ item.description } />
                <StoreItemHowTo text={ item.how_to } />
            </div>
            <ItemReviewsAndQuestions reviews={ item.reviews } questions={ items.questions } />
        </div>
        </React.Fragment>
    );
}

const mapStateToProps = function(state, ownProps) {

    var equip = state.list.EQUIPMENT_LIST;
    var id = ownProps.item_id;
    return {

        ...equip,
        items: getVisibleEquipment(equip.items, equip.filters, equip.sort),
        itemClass: 'equipment-list-item',
        listType: EQUIPMENT_LIST,
        getListItemContent: getEquipmentListItemContent,
        breadcrumbs: [
            { home: '/'},
            { equipment: '/equipment'},
        ]
    }
};

const mapDispatchToProps = function(dispatch) {

    return {

        fetch: () => {
            var fetch_url = "/index.php?ctrl=public&actn=fetchAllEquipment";
            dispatch(fetchListItems(EQUIPMENT_LIST, fetch_url));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

