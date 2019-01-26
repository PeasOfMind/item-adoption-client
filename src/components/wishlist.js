import React from 'react';
import { connect } from 'react-redux';

import {deleteFromWishlist, toggleEditWishlist, changeWishlistStatus} from '../actions';
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

    let wishListItems, addWishlistText;
    if (props.wishListArray.length === 0){
        wishListItems = <p>You don't have any items on your wishlist. Do you want to add something?</p>
    } else {
        wishListItems = props.wishListArray.map((item, index) => {
            if (item.editing) {
                const formId = `edit-wishlist-${index}`;
                return (
                    <li className="wish-item" key={index} >
                        <WishlistForm index={index} form={formId} />
                    </li>
                )
            }
            return (
                <li className="wish-item" key={index} index={index}>
                    {item.name}
                    <button className="edit-wish-item" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="delete-wish-item" onClick={() => handleDelete(index)}>Delete</button>
                </li>
            )
        });
    }

    if (props.addingWishlistItem) {
        addWishlistText = (
            <section>
                <WishlistForm form="add-wishlist-item"/>
                <button type="button" onClick={handleChange}>Cancel</button>
            </section>);
    } else addWishlistText=<button type="button" onClick={handleChange}>Add to wishlist</button>;

    return (
        <section className="wish-list">
        <h2>Wishlist</h2>
        <ul className="item-wish-list">{wishListItems}</ul>
        {addWishlistText}
        <button>Look for active listings in your area</button>
        </section>
    )
}

const mapStateToProps = state => ({
    addingWishlistItem: state.app.addingWishlistItem,
    wishListArray: state.app.wishListArray
})

export default connect(mapStateToProps)(WishList);