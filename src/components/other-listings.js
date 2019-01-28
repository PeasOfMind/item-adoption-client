import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {changePage} from '../actions';
import './other-listings.css';

export function OtherListings(props){

    const handleChangePage = () => {
        props.dispatch(changePage("dashboard"));
    }

    if (props.currentPage === "dashboard"){
        return <Redirect to="/dashboard" />
    }

    const listingsText = props.otherListingsInArea.map((item, index) => {
        let price = `$${item.price}`;
        if (item.price === 0){
            price = <strong>FREE</strong>;
        }
        return (
            <article className="other-listing" key={index}>
                <h3>{item.title}</h3>
                <p>Description: {item.description}</p>
                <p>Price: {price}</p>
                <p>Owned By: {item.owner}</p>
                <button>Contact Owner About This Item</button>
            </article>
        )
    })
    return (
        <section className="listings-in-area">
            <h2>Listings In Your Area</h2>
            {listingsText}
            <button onClick={handleChangePage}>Back to Dashboard</button>
        </section>
    )
}

const mapStateToProps = state => ({
    otherListingsInArea: state.app.otherListingsInArea,
    currentPage: state.app.currentPage
})

export default connect(mapStateToProps)(OtherListings);