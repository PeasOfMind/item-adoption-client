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

    const viewOtherListings = () => {
        props.dispatch(changePage("otherListings"));
    }

    if(props.currentPage === "otherlistings"){
        return <Redirect to="/otherlistings"/>
    }

    if (props.itemListings.length === 0){
        listings = <p>You don't have any active listings. Do you want to get rid of any items?</p>
    } else {
        listings = props.itemListings.map((item, index) => {
            let renewButton = '';
            if (item.editing) {
                const formId = `edit-listing-${index}`;
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
    } else addListingText = <button onClick={handleAdd}>Add a listing</button>

    return(
        <section className="active-listings">
            <h2>Active Listings</h2>
            {listings}
            {addListingText}
            <button onClick={viewOtherListings}>Check out wishlists in your area</button>
        </section>
    )
}

const mapStateToProps = state => ({
    itemListings: state.app.itemListings,
    addingListing: state.app.addingListing
})

export default connect(mapStateToProps)(ActiveListings);