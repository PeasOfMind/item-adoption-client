import React from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import {deleteWishItem, toggleEditWishlist, changeWishlistStatus, changePage, fetchOtherListings} from '../actions';
import WishlistForm from './wishlist-form';

import './wishlist.css';

export function WishList(props){
    
    const handleEdit = wishItemId => {
        props.dispatch(toggleEditWishlist(wishItemId));
    }

    const handleDelete = wishItemId => {
        props.dispatch(deleteWishItem(wishItemId));
    }
    
    const handleChange = () => {
        props.dispatch(changeWishlistStatus());
    }

    const viewOtherListings = () => {
        props.dispatch(fetchOtherListings(props.userZip));
        props.dispatch(changePage("otherlistings"));
    }

    if(props.currentPage === "otherlistings"){
        return <Redirect to="/otherlistings"/>
    }

    if(props.wishlistError){
        return <p className="error wishlist-error">Problem retrieving your listings. Error code {props.wishlistError.code}: {props.wishlistError.message}</p> 
    }

    let wishListItems, addWishlistText;
    if (props.wishlist.length === 0){
        wishListItems = <p>You don't have any items on your wishlist.</p>
    } else {
        wishListItems = props.wishlist.map((item, index) => {
            if (item.editing) {
                const formId = `edit-wishlist-${item.id}`;
                return (
                    <li className="wish-item" key={index} >
                        <WishlistForm id={item.id} index={index} form={formId} />
                    </li>
                )
            }
            return (
                <li className="wish-item" key={index} index={index}>
                <button className="edit-wish-item" onClick={() => handleEdit(item.id)}>Edit</button>
                <button className="delete-wish-item" onClick={() => handleDelete(item.id)}>Delete</button>
                {item.title}
                </li>
            )
        });
    }

    if (props.addingWishItem) {
        addWishlistText = (
            <article>
                <WishlistForm form="add-wishlist-item"/>

            </article>);
    } else if(!props.userZip && !props.userEmail) {
        //if the user doesn't have a zipcode set up, don't allow adding to wishlist
        addWishlistText = <p>Add user info to be able to add a wishlist.</p>; 
    } else if (!props.userZip || !props.userEmail) {
        //if the user hasn't completed user info, don't allow adding to wishlist
        addWishlistText = <p>Complete your user info to add a wishlist.</p>;
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
    addingWishItem: state.app.addingWishItem,
    wishlist: state.app.wishlist,
    wishlistError: state.app.wishlistError,
    currentPage: state.app.currentPage,
    userEmail: state.auth.userEmail,
    userZip: state.auth.userZip
})

export default connect(mapStateToProps)(WishList);