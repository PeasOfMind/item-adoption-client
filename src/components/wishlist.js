import React from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import {deleteFromWishlist, toggleEditWishlist, changeWishlistStatus, changePage} from '../actions';
import WishlistForm from './wishlist-form';

import './wishlist.css';

export function WishList(props){
    
    const handleEdit = index => {
        props.dispatch(toggleEditWishlist(index));
    }

    const handleDelete = index => {
        props.dispatch(deleteFromWishlist(index));
    }
    
    const handleChange = () => {
        props.dispatch(changeWishlistStatus());
    }

    const viewOtherListings = () => {
        props.dispatch(changePage("otherlistings"));
    }

    if(props.currentPage === "otherlistings"){
        return <Redirect to="/otherlistings"/>
    }

    let wishListItems, addWishlistText;
    if (props.wishListArray.length === 0){
        wishListItems = <p>You don't have any items on your wishlist. Do you want to add something?</p>
    } else {
        wishListItems = props.wishListArray.map((item, index) => {
            if (item.editing) {
                const formId = `edit-wishlist-${index}`;
                //When adding backend, change the formId to reference the wishlist ID from the database
                return (
                    <li className="wish-item" key={index} >
                        <WishlistForm index={index} form={formId} />
                    </li>
                )
            }
            return (
                <li className="wish-item" key={index} index={index}>
                <button className="edit-wish-item" onClick={() => handleEdit(index)}>Edit</button>
                <button className="delete-wish-item" onClick={() => handleDelete(index)}>Delete</button>
                {item.name}
                </li>
            )
        });
    }

    if (props.addingWishlistItem) {
        addWishlistText = (
            <section>
                <WishlistForm form="add-wishlist-item"/>
                <button type="button" className="cancel-add" onClick={handleChange}>Cancel</button>
            </section>);
    } else addWishlistText=<button type="button" onClick={handleChange}>Add to wishlist</button>;

    return (
        <section className="wish-list">
        <h2>Wishlist</h2>
        <ul className="item-wish-list">{wishListItems}</ul>
        {addWishlistText}
        <button onClick={viewOtherListings}>See What Others Are Selling</button>
        </section>
    )
}

const mapStateToProps = state => ({
    addingWishlistItem: state.app.addingWishlistItem,
    wishListArray: state.app.wishListArray,
    currentPage: state.app.currentPage
})

export default connect(mapStateToProps)(WishList);