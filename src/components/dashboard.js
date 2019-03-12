import React from 'react';
import requiresLogin from './requires-login';
import {fetchListings, fetchWishlist} from '../actions';
import {fetchUserInfo} from '../actions/auth';
import UserInfo from './user-info';
import ActiveListings from './active-listings';
import WishList from './wishlist'

import {changePage} from '../actions';

export class Dashboard extends React.Component{

    componentDidMount() {
        this.props.dispatch(changePage('dashboard'));
        this.props.dispatch(fetchListings());
        this.props.dispatch(fetchWishlist());
        this.props.dispatch(fetchUserInfo());
    }

    render(){
        return(
            <main>
                <UserInfo />
                <ActiveListings />
                <WishList />
            </main>
        )
    }
}

export default requiresLogin()(Dashboard);