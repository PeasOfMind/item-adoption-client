import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {changePage} from '../actions';

export function OtherWishlists(props){
    
    const handleChangePage = () => {
        props.dispatch(changePage("dashboard"));
    }

    if (props.currentPage === "dashboard"){
        return <Redirect to="/dashboard" />
    }

    const wishlistsText = props.otherWishLists.map((userInfo, index) => {
        const wishlist = userInfo.wishlist.map((item, nestedIndex) => <li key={nestedIndex}>{item}</li>);
        return (
            <article className="other-wishlists" key={index}>
                <h3>{userInfo.username}</h3>
                <ul>{wishlist}</ul>
            </article>
        )
    })

    return (
        <section>
            {wishlistsText}
            <button onClick={handleChangePage}>Back to Dashboard</button>
        </section>
    )
}

const mapStateToProps = state => ({
    otherWishLists: state.app.otherWishLists,
    currentPage: state.app.currentPage
})

export default connect(mapStateToProps)(OtherWishlists);