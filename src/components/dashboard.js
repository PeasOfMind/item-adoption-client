import React from 'react';
import UserInfo from './user-info';
import ActiveListings from './active-listings';
import WishList from './wishlist'

export default function Dashboard(props){
    return(
        <main>
            <UserInfo />
            <ActiveListings />
            <WishList />
        </main>
    )
}