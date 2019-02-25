import React from 'react';
import requiresLogin from './requires-login';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {changePage} from '../actions';

import './other-wishlists.css';

export function OtherWishlists(props){

    const handleChangePage = () => {
        props.dispatch(changePage("dashboard"));
    }

    if (props.currentPage === "dashboard"){
        return <Redirect to="/dashboard" />
    }

    const wishlistUsers = Object.keys(props.otherWishlists);
    let wishlistsText;
    if (wishlistUsers.length === 0){
        wishlistsText = <p>There are no wishlists in your area :(</p>;
    } else {
        wishlistsText = wishlistUsers.map(user => {
            const userInfo = props.otherWishlists[user];
            const wishlist = userInfo.wishlist.map(item => <li key={item.id}>{item.title}</li>)
            return (
                <article className="other-wishlist" key={userInfo.userId}>
                    <h3>{user}</h3>
                    <ul>{wishlist}</ul>            
                </article>
            )
        });
    }

    return (
        <section className="wishlists-in-area">
            <h2>What Other Users Are Looking For</h2>
            {wishlistsText}
            <button onClick={handleChangePage}>Back to Dashboard</button>
        </section>
    )
}

const mapStateToProps = state => ({
    otherWishlists: state.app.otherWishlists,
    currentPage: state.app.currentPage
})

export default requiresLogin()(connect(mapStateToProps)(OtherWishlists));