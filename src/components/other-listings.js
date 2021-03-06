import React from 'react';
import requiresLogin from './requires-login';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {changePage, contactListingUser} from '../actions';
import './other-listings.css';

export function OtherListings(props){

    const handleChangePage = () => {
        props.dispatch(changePage("dashboard"));
    }

    const handleContact = itemId => {
        props.dispatch(contactListingUser(itemId));
    }

    if (props.currentPage === "dashboard"){
        return <Redirect to="/dashboard" />
    }

    let listingsText;
    if(props.otherListingsError){
        listingsText = <p className="error other-listings-error">Problem retrieving listings in your area. Error code {props.otherListingsError.code}: {props.otherListingsError.message}. Try again later.</p> 
    } else if (props.otherListings.length === 0){
        listingsText = <p>There are no listings in your area :(</p>
    } else {
        listingsText = props.otherListings.map((item, index) => {
            let price = `$${item.price}`;
            if (item.price === 0){
                price = <strong>FREE</strong>;
            }
            let contactText = <button onClick={() => handleContact(item.id)} >Contact Owner About This Item</button>;
            if (item.contactSuccess) {
                contactText = <p className="contact-success"><i className="fas fa-check"></i> Email has been sent to {item.user.username}! Look for their reply in your inbox.</p>
            }
            return (
                <article className="other-listing" key={index}>
                    <h3>{item.title}</h3>
                    <p>Description: {item.description}</p>
                    <p>Price: {price}</p>
                    <p>Owned By: {item.user.username}</p>
                    {contactText}
                </article>
            )
        })
    }

    return (
        <main className="listings-in-area">
        <div className="other-listings-container">
            <h2>Listings In Your Area</h2>
            {listingsText}
            <button onClick={handleChangePage}>Back to Dashboard</button>
        </div>
        </main>
    )
}

const mapStateToProps = state => ({
    otherListings: state.app.otherListings,
    otherListingsError: state.app.otherListingsError,
    currentPage: state.app.currentPage
});

export default requiresLogin()(connect(mapStateToProps)(OtherListings));