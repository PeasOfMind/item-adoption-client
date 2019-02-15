import React from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import {toggleEditListing, renewListing, changeAddListingStatus, deleteListing, changePage} from '../actions';
import ListingForm from './listing-form';
import AddListingForm from './add-listing-form';

import './active-listings.css';

export function ActiveListings(props){
    let listings, addListingText;

    const handleRenew = index => {
        props.dispatch(renewListing(index));
    }

    const handleEdit = index => {
        props.dispatch(toggleEditListing(index));
    }

    const handleDelete = index => {
        props.dispatch(deleteListing(index));
    }

    const handleAdd = () => {
        props.dispatch(changeAddListingStatus());
    }

    const viewOtherWishlists = () => {
        props.dispatch(changePage("otherwishlists"));
    }

    if(props.currentPage === "otherwishlists"){
        return <Redirect to="/otherwishlists"/>
    }

    if (props.itemListings.length === 0){
        listings = <p>You don't have any active listings. Do you want to put up any items for adoption?</p>
    } else {
        listings = props.itemListings.map((item, index) => {
            let renewButton = '';
            if (item.editing) {
                const formId = `edit-listing-${index}`;
                //When adding backend, change the formId to reference the listing id from the database
                return(<ListingForm form={formId} key={index} index={index} />)
            } 
            if (item.expiresIn <= 5) {
                renewButton = <button onClick={() => handleRenew(index)}>Renew Listing</button>
            }
            return (
            <article className="item-ad" key={index}>
                <h3>{item.title}</h3>
                <p>Description: {item.description}</p>
                <p>Price: ${item.price}</p>
                <p>Listing Expires In: {item.expiresIn} days</p>
                <button onClick={() => handleEdit(index)}>Edit Listing</button>
                <button onClick={() => handleDelete(index)}>Delete Listing</button>
                {renewButton}
            </article>)
        });
    }

    if (props.addingListing){
        addListingText = <AddListingForm />
    } else addListingText = <button onClick={handleAdd}>Add a Listing</button>

    return(
        <section className="active-listings">
            <h2>Active Listings for {props.username}</h2>
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
    currentPage: state.app.currentPage
})

export default connect(mapStateToProps)(ActiveListings);