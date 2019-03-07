import React from 'react';
import requiresLogin from './requires-login';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {changePage, contactWishlistUser} from '../actions';

import './other-wishlists.css';

export function OtherWishlists(props){

    const handleChangePage = () => {
        props.dispatch(changePage("dashboard"));
    }

    const handleContact = (wishUser, itemId) => {
        props.dispatch(contactWishlistUser(wishUser, itemId));
    }

    if (props.currentPage === "dashboard"){
        return <Redirect to="/dashboard" />
    }


    let wishlistsText;
    if(props.otherWishlistsError){
        wishlistsText = <p className="error other-listings-error">Problem retrieving wishlists in your area. Error code {props.otherWishlistsError.code}: {props.otherWishlistsError.message}. Try again later.</p> 
    } else {
        const wishlistUsers = Object.keys(props.otherWishlists);
        if (wishlistUsers.length === 0){
            wishlistsText = <p>There are no wishlists in your area :(</p>;
        } else {
    
            wishlistsText = wishlistUsers.map(user => {
                const userInfo = props.otherWishlists[user];
                const wishlist = userInfo.wishlist.map(item => {
                    let contactText = <button className="contact-button" aria-label="email" onClick={() => handleContact(user, item.id)}><i className="far fa-envelope"></i></button>;
                    console.log('item.contactSuccess:', item.contactSuccess)
                    if(item.contactSuccess) {
                        console.log('contact was successful!');
                        contactText = <span className="contact-success"><i className="fas fa-check"></i> Sent!</span>;
                    } 
                    return (<li className="other-wish-item" key={item.id}>
                        {item.title} 
                        {contactText}
                        </li>)
                    
                })
                return (
                    <article className="other-wishlist" key={userInfo.userId}>
                        <h3>{user}</h3>
                        <ul>{wishlist}</ul>            
                    </article>
                )
            });
        }
    }

    return (
        <section className="wishlists-in-area">
            <h2>What Other Users Are Looking For</h2>
            <p>If you have something on another user's wishlist, click the mail icon to email them and let them know.</p>
            {wishlistsText}
            <button onClick={handleChangePage}>Back to Dashboard</button>
        </section>
    )
}

const mapStateToProps = state => ({
    otherWishlists: state.app.otherWishlists,
    otherWishlistsError: state.app.otherWishlistsError,
    currentPage: state.app.currentPage
})

export default requiresLogin()(connect(mapStateToProps)(OtherWishlists));