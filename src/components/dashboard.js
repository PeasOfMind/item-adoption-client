import React from 'react';
import ActiveListings from './active-listings';
import WishList from './wishlist'

export default function Dashboard(props){
    return(
        <main>
            <ActiveListings />
            <WishList />
        </main>
    )
}