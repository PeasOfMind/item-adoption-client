import React from 'react';
import { connect } from 'react-redux';

import './wishlist.css';

export function WishList(props){
    let wishListItems;
    if (props.wishListArray.length === 0){
        wishListItems = <p>You don't have any items on your wishlist. Do you want to add something?</p>
    } else {
        wishListItems = props.wishListArray.map((item, index) => (
            <li className="wish-item" key={index}>{item}</li>
        ));
    }

    return(
        <section className="wish-list">
        <h2>Wishlist</h2>
        <ul className="item-wish-list">{wishListItems}</ul>
        <button>Add to wishlist</button>
        <button>Look for active listings in your area</button>
        </section>
    )
}

const mapStateToProps = state => ({
    wishListArray: state.app.wishListArray
})

export default connect(mapStateToProps)(WishList);