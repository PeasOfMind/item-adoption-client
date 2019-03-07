import {
    CHANGE_FORM_TYPE, 
    CHANGE_PAGE, 
    TOGGLE_EDIT_LISTING,  
    ADD_LISTING, 
    CHANGE_ADD_LISTING_STATUS,  
    TOGGLE_EDIT_WISHLIST, 
    CHANGE_WISHLIST_STATUS, 
    FETCH_LISTINGS_SUCCESS, 
    FETCH_LISTINGS_ERROR, 
    FETCH_WISHLIST_SUCCESS, 
    FETCH_WISHLIST_ERROR, 
    POST_LISTING_SUCCESS, 
    POST_LISTING_ERROR, 
    DELETE_LISTING_ERROR,
    POST_WISHITEM_ERROR,
    POST_WISHITEM_SUCCESS,
    DELETE_WISHITEM_ERROR,
    UPDATE_LISTING_SUCCESS,
    UPDATE_LISTING_ERROR,
    UPDATE_WISHITEM_SUCCESS,
    UPDATE_WISHITEM_ERROR,
    FETCH_OTHER_LISTINGS_SUCCESS,
    FETCH_OTHER_LISTINGS_ERROR,
    FETCH_OTHER_WISHLISTS_SUCCESS,
    FETCH_ONE_LISTING_SUCCESS,
    FETCH_ONE_LISTING_ERROR,
    FETCH_WISHITEM_SUCCESS,
    FETCH_WISHITEM_ERROR,
    TOGGLE_ZIP_ENTRY,
    CONTACT_LISTING_USER_SUCCESS,
    CONTACT_LISTING_USER_ERROR,
    CONTACT_WISHLIST_USER_SUCCESS,
    CONTACT_WISHLIST_USER_ERROR} from '../actions';

const initialState = {
    navLinks: ['Login', 'Signup'],
    formType: 'Signup',
    headingType: 'landing-header',
    currentPage: 'landing',
    itemListings: [],
    listingsError: null,
    postListingError: null,
    addingListing: false,
    addingListingZip: false,
    addingWishItem: false,
    wishlist: [],
    wishlistError: null,
    wishItemError: null,
    postWishItemError: null,
    updateWishItemError: null,
    deleteWishItemError: null,
    otherListings: [],
    otherListingsError: null,
    otherWishlists: [],
    otherWishlistsError: null
}

export const appReducer = (state=initialState, action) => {
    if (action.type === FETCH_LISTINGS_SUCCESS){
        //add an editing property to each listing
        action.listings.forEach(listing => {
            listing.editing = false;
        });
        return Object.assign({}, state, {
            itemListings: action.listings,
            listingsError: null
        });
    }

    else if (action.type === FETCH_LISTINGS_ERROR){
        return Object.assign({}, state, {
            listingsError: action.error
        });
    }

    else if (action.type === FETCH_WISHLIST_SUCCESS){
        //add an editing property to each wish item
        action.wishlist.forEach(item => {
            item.editing = false;
        });
        return Object.assign({}, state, {
            wishlist: action.wishlist,
            wishlistError: null
        });
    }

    else if (action.type === FETCH_WISHLIST_ERROR){
        return Object.assign({}, state, {
            wishlistError: action.error
        });
    }

    if (action.type === FETCH_ONE_LISTING_SUCCESS){
        //find the index of the listing in state
        const index = state.itemListings.findIndex(listing => {
            return listing.id === action.listing.id;
        });
        //make copy of the state item listings
        const newListings = state.itemListings.slice();
        //replace the listing with the one retrieved from the API
        newListings[index] =  action.listing;
        //set editing status to false
        newListings[index].editing = false;
        //set the error status to null
        newListings[index].fetchError = null;
        return Object.assign({}, state, {
            itemListings: newListings
        });
    }

    else if (action.type === FETCH_ONE_LISTING_ERROR){
        //find the index of the listing in state
        const index = state.itemListings.findIndex(listing => {
            return listing.id === action.listingId;
        });
        //make copy of the state item listings
        const newListings = state.itemListings.slice();
        //set the error property for this listing
        newListings[index].fetchError = action.error;
        return Object.assign({}, state, {
            itemListings: newListings
        });
    }
 
    if (action.type === FETCH_WISHITEM_SUCCESS){
        //find the index of the wish item in state
        const index = state.wishlist.findIndex(wishItem => {
            return wishItem.id === action.wishItem.id;
        });
        //make copy of the state wishlist
        const newWishList = state.wishlist.slice();
        //replace the wish item with the one retrieved from the API
        newWishList[index] = action.wishItem;
        //set editing status to false
        newWishList[index].editing = false;
        //set the error status to null
        newWishList[index].fetchError = null;        
        return Object.assign({}, state, {
            wishlist: newWishList
        });
    }

    else if (action.type === FETCH_WISHITEM_ERROR){
        //find the index of the wish item in state
        const index = state.wishlist.findIndex(wishItem => {
            return wishItem.id === action.wishItem.id;
        });
        //make copy of the state wishlist
        const newWishList = state.wishlist.slice();
        //set the error status
        newWishList[index].fetchError = action.error;        
        return Object.assign({}, state, {
            wishlist: newWishList
        });
    }
       
    else if (action.type === POST_LISTING_SUCCESS){
        action.listing.editing = false;
        return Object.assign({}, state, {
            addingListing: false,
            itemListings: [...state.itemListings, action.listing],
            postListingError: null
        });
    }

    else if (action.type === POST_LISTING_ERROR){
        return Object.assign({}, state, {postListingError: action.error});
    }

    else if (action.type === POST_WISHITEM_SUCCESS){
        action.wishItem.editing = false;
        return Object.assign({}, state, {
            addingWishItem: false,
            wishlist: [...state.wishlist, action.wishItem],
            postWishItemError: null
        })
    }

    else if (action.type === POST_WISHITEM_ERROR){
        return Object.assign({}, state, {postWishItemError: action.error});
    }

    else if (action.type === UPDATE_LISTING_SUCCESS){
        //find the index of the listing in state
        const index = state.itemListings.findIndex(listing => {
            return listing.id === action.listingId;
        });
        //make copy of the state item listings
        const newListings = state.itemListings.slice();
        //set the error status of this one listing to null
        newListings[index].updateError = null;
        return Object.assign({}, state, {
            itemListings: newListings
        });
    }

    else if (action.type === UPDATE_LISTING_ERROR){
        //find the index of the listing in state
        const index = state.itemListings.findIndex(listing => {
            return listing.id === action.listingId;
        });
        //make copy of the state item listings
        const newListings = state.itemListings.slice();
        //set the error status of this one listing
        newListings[index].updateError = action.error;
        return Object.assign({}, state, {
            itemListings: newListings
        });
    }

    else if (action.type === UPDATE_WISHITEM_SUCCESS){
        //find the index of the wish item in state
        const index = state.wishlist.findIndex(wishItem => {
            return wishItem.id === action.itemId;
        });
        //make copy of the state wishlist
        const newWishList = state.wishlist.slice();
        //set editing status to false
        newWishList[index].editing = false;
        //set the error status to null
        newWishList[index].updateError = null;        
        return Object.assign({}, state, {
            wishlist: newWishList
        });
    }

    else if (action.type === UPDATE_WISHITEM_ERROR){
        //find the index of the wish item in state
        const index = state.wishlist.findIndex(wishItem => {
            return wishItem.id === action.itemId;
        });
        //make copy of the state wishlist
        const newWishList = state.wishlist.slice();
        //set the error status
        newWishList[index].updateError = action.error;        
        return Object.assign({}, state, {
            wishlist: newWishList
        });
    }
    
    else if (action.type === DELETE_LISTING_ERROR){
        //find the index of the listing in state
        const index = state.itemListings.findIndex(listing => {
            return listing.id === action.listingId;
        });
        //make copy of the state item listings
        const newListings = state.itemListings.slice();
        //set the error status of this one listing
        newListings[index].deleteError = action.error;
        return Object.assign({}, state, {
            itemListings: newListings
        });
    }

    else if (action.type === DELETE_WISHITEM_ERROR){
        //find the index of the wish item in state
        const index = state.wishlist.findIndex(wishItem => {
            return wishItem.id === action.itemId;
        });
        //make copy of the state wishlist
        const newWishList = state.wishlist.slice();
        //set the error status
        newWishList[index].deleteError = action.error;        
        return Object.assign({}, state, {
            wishlist: newWishList
        });
    }

    else if (action.type === FETCH_OTHER_LISTINGS_SUCCESS){
        return Object.assign({}, state, {
            otherListings: action.otherListings,
            otherListingsError: null
        });
    }

    else if (action.type === FETCH_OTHER_LISTINGS_ERROR){
        return Object.assign({}, state, {otherListingsError: action.error});
    }

    else if (action.type === FETCH_OTHER_WISHLISTS_SUCCESS){
        return Object.assign({}, state, {
            otherWishlists: action.otherWishlists,
            otherWishlistsError: null
        });
    }

    else if (action.type === FETCH_OTHER_LISTINGS_ERROR){
        return Object.assign({}, state, {otherWishlistsError: action.error});
    }

    else if (action.type === CONTACT_LISTING_USER_SUCCESS){
        let otherListings = state.otherListings.map(listing => {
            if (listing.id !== action.itemId) return listing;
            return Object.assign({}, listing, {
                contactSuccess: true,
                contactError: null
            });
        });
        return Object.assign({}, state, {otherListings})
    }

    else if (action.type === CONTACT_LISTING_USER_ERROR){
        let otherListings = state.otherListings.map(listing => {
            if (listing.id !== action.itemId) return listing;
            return Object.assign({}, listing, {
                contactSuccess: null,
                contactError: action.error
            });
        });
        return Object.assign({}, state, {otherListings})
    }

    else if (action.type === CONTACT_WISHLIST_USER_SUCCESS){
        let updatedWishlist = state.otherWishlists[action.wishUser].wishlist.map(wishItem => {
            if (wishItem.id !== action.itemId) return wishItem;
            return Object.assign({}, wishItem, {
                contactSuccess: true,
                contactError: null

            });
        });
        const updatedWishlistObj = Object.assign({}, state.otherWishlists[action.wishUser], {wishlist: updatedWishlist})
        console.log('the updatedWishlistObj is:', updatedWishlistObj);
        const wishUserObj = {};
        wishUserObj[action.wishUser] = updatedWishlistObj;
        console.log('the wishUserObj obj is:', wishUserObj);
        const otherWishlists = Object.assign({}, state.otherWishlists, wishUserObj);
        console.log('the otherWishlist obj is:', otherWishlists);
        // Object.keys(state.otherWishlists).forEach(username => {
        //     otherWishlists[username] = state.otherWishlists[username];
        //     if(username === action.wishUser) {
        //         otherWishlists[username].wishlist = updatedWishlist;
        //     }
        // })
        return Object.assign({}, state, {otherWishlists})
    }

    else if (action.type === CONTACT_WISHLIST_USER_ERROR){
        let updatedWishlist = state.otherWishlists[action.wishUser].wishlist.map(wishItem => {
            if (wishItem.id !== action.itemId) return wishItem;
            return Object.assign({}, wishItem, {
                contactSuccess: null,
                contactError: action.error
            });
        });
        return Object.assign({}, state[action.wishUser], {wishlist: updatedWishlist})
    }

    else if (action.type === CHANGE_FORM_TYPE) {
        if (!action.formType){
            if (state.formType === 'Login'){
                action.formType = 'Signup';
            } else if (state.formType === 'Signup'){
                action.formType = 'Login';
            }
        }
        return Object.assign({}, state, {
            formType: action.formType
        })
    }
    else if (action.type === CHANGE_PAGE) {
        if (action.currentPage === 'landing' || action.currentPage === 'login'){
            action.navLinks = ['Login', 'Signup'];
            action.headingType = 'landing-header';
        } else {
            action.navLinks = ['Logout'];
            action.headingType = 'dashboard-header';
        }
        return Object.assign({}, state, {
            currentPage: action.currentPage,
            navLinks: action.navLinks,
            headingType: action.headingType
        })
    }

    else if (action.type === TOGGLE_EDIT_LISTING) {
        let itemListings = state.itemListings.map(listing => {
            if (listing.id !== action.listingId) return listing;
            return Object.assign({}, listing, {
                editing: !listing.editing
            });
        });
        return Object.assign({}, state, {itemListings});
    }

    else if (action.type === CHANGE_ADD_LISTING_STATUS){
        return Object.assign({}, state, {
            addingListing: !state.addingListing
        });
    }

    else if (action.type === ADD_LISTING){
        return Object.assign({}, state, {
            addingListing: false,
            itemListings: [...state.itemListings, {
                title: action.title,
                description: action.description,
                price: action.price,
                expiresIn: 14,
                editing: false
            }]
        });
    }

    else if (action.type === TOGGLE_EDIT_WISHLIST){
        let wishlist = state.wishlist.map((item) => {
            if (item.id !== action.itemId) return item;
            return Object.assign({}, item, {
                editing: !item.editing
            });
        });
        return Object.assign({}, state, {wishlist});
    }

    else if (action.type === CHANGE_WISHLIST_STATUS){
        return Object.assign({}, state, {
            addingWishItem: !state.addingWishItem
        });
    }

    else if (action.type === TOGGLE_ZIP_ENTRY) {
        return Object.assign({}, state, {
            addingListingZip: !state.addingListingZip
        })
    }

    return state;
};