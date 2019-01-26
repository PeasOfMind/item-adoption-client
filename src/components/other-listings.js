import React from 'react';
import {connect} from 'react-redux';

export function OtherListings(props){
    const listingsText = props.otherListingsInArea.map((item, index) => (
        <article className="other-listing" key={index}>
            <h3>{item.title}</h3>
            <p>Description: {item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Owned By: ${item.owner}</p>
            <button>Contact Owner About This Item</button>
        </article>
    ))
    return (
        <section className="listings-in-area">
            {listingsText}
        </section>
    )
}

const mapStateToProps = state => ({
    otherListingsInArea: state.app.otherListingsInArea
})

export default connect(mapStateToProps)(OtherListings)