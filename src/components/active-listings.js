import React from 'react';
import { connect } from 'react-redux';

import {toggleEditListing, renewListing} from '../actions';
import ListingForm from './listing-form';

import './active-listings.css';

export function ActiveListings(props){
    let listings;

    const handleRenew = index => {
        props.dispatch(renewListing(index));
    }

    const handleEdit = index => {
        props.dispatch(toggleEditListing(index));
    }

    if (props.itemListings.length === 0){
        listings = <p>You don't have any active listings. Do you want to get rid of any items?</p>
    } else {
        listings = props.itemListings.map((item, index) => {
            let renewButton = '';
            if (item.editing) {
                return(<ListingForm key={index} index={index} />)
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
                {renewButton}
            </article>)
        });
    }

    return(
        <section className="active-listings">
            <h2>Active Listings</h2>
            {listings}
            <button>Add a listing</button>
            <button>Check out wishlists in your area</button>
        </section>
    )
}

const mapStateToProps = state => ({
    itemListings: state.app.itemListings
})

export default connect(mapStateToProps)(ActiveListings);