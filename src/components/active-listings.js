import React from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import {toggleEditListing, changeAddListingStatus, deleteListing, changePage, fetchOtherWishlists, updateListing} from '../actions';
import ListingForm from './listing-form';
import AddListingForm from './add-listing-form';

import './active-listings.css';

export function ActiveListings(props){
    let listings, addListingText;

    const handleRenew = listingId => {
        const updateData = {id: listingId}
        //set new expiration date to 14 days after today
        updateData.expirationDate = (new Date()).getTime() + 14*24*60*60*1000;
        props.dispatch(updateListing(updateData));
    }

    const handleEdit = listingId => {
        props.dispatch(toggleEditListing(listingId));
    }

    const handleDelete = listingId => {
        props.dispatch(deleteListing(listingId));
    }

    const handleAdd = () => {
        props.dispatch(changeAddListingStatus());
    }

    const viewOtherWishlists = () => {
        props.dispatch(fetchOtherWishlists(props.userZip));
        props.dispatch(changePage("otherwishlists"));
    }

    if(props.currentPage === "otherwishlists"){
        return <Redirect to="/otherwishlists"/>
    }

    if (props.itemListings.length === 0){
        listings = <p>You don't have any active listings. </p>
    } else {
        listings = props.itemListings.map(item => {
            let renewButton = '';
            let altText = '';
            let price = `$${item.price}`;
            if (item.editing) {
                return(<ListingForm form={`edit-listing-${item.id}`} key={item.id} index={item.id} />)
            } 
            //give user the option to renew the listing if the listing expires in 5 days or less
            if (item.expiresIn <= 5) {
                renewButton = <button onClick={() => handleRenew(item.id)}>Renew Listing</button>
            }
            //if the item zipcode is different than the user homebase zipcode, display it
            if (item.zipcode && item.zipcode !== props.userZip) {
                altText = <p>Listed at Alternative Location: {item.zipcode}</p>
            }
            if (item.price === 0){
                price = <strong>FREE</strong>;
            }
            return (
            <article className="item-ad" key={item.id}>
                <h3>{item.title}</h3>
                <p>Description: {item.description}</p>
                <p>Price: {price}</p>
                <p>Listing Expires In: {item.expiresIn} days</p>
                {altText}
                <button onClick={() => handleEdit(item.id)}>Edit Listing</button>
                <button className="delete-listing" onClick={() => handleDelete(item.id)}>Delete Listing</button>
                {renewButton}
            </article>)
        });
    }

    if (props.addingListing){
        addListingText = <AddListingForm />
    } else if (!props.userZip && !props.userEmail) {
        //if the user doesn't have a zipcode or email set up, don't allow adding listings
        addListingText = <p>Add user info to be able to add listings and look at wishlists in your area.</p>;
    } else if (!props.userZip || !props.userEmail) {
                //if the user hasn't completed user info, don't allow adding listings
                addListingText = <p>Complete your user info to add listings and look at wishlists in your area.</p>;
    } else {
        addListingText = <button onClick={handleAdd}>Add a Listing</button>;
    }

    return(
        <section className="active-listings">
            <h2>Active Listings</h2>
            {listings}
            {addListingText}
            <button onClick={viewOtherWishlists}>See What Others Are Looking For</button>
        </section>
    )
}

const mapStateToProps = state => ({
    username: state.auth.currentUser,
    itemListings: state.app.itemListings,
    addingListing: state.app.addingListing,
    currentPage: state.app.currentPage,
    userEmail: state.auth.userEmail,
    userZip: state.auth.userZip
    
})

export default connect(mapStateToProps)(ActiveListings);