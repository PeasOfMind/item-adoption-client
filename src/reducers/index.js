import {
    CHANGE_FORM_TYPE, 
    CHANGE_PAGE, 
    TOGGLE_EDIT_LISTING,  
    RENEW_LISTING, 
    ADD_LISTING, 
    CHANGE_ADD_LISTING_STATUS, 
    DELETE_FROM_WISHLIST, 
    TOGGLE_EDIT_WISHLIST, 
    UPDATE_WISHLIST_ITEM, 
    ADD_WISHLIST_ITEM, 
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
    DELETE_LISTING_SUCCESS,
    DELETE_WISHITEM_SUCCESS,
    UPDATE_LISTING_SUCCESS,
    UPDATE_LISTING_ERROR} from '../actions';

const dummyState = {
    navLinks: ['Login', 'Signup'],
    formType: 'Signup',
    headingType: 'landing-header',
    currentPage: 'landing',
    itemListings: [],
    listingsError: null,
    postListingError: null,
    updateListingError: null,
    deleteListingError: null,
    addingListing: false,
    addingWishItem: false,
    wishlist: [],
    wishlistError: null,
    postWishItemError: null,
    deleteWishItemError: null,
    otherListingsInArea: [
        {
            title: `Ikea Billy Bookcase`,
            description: `White bookcase, like new condition`,
            price: 70,
            owner: 'user1'

        },
        {
            title: `Step-Ladder`,
            description: `3 step stepladder`,
            price: 0,
            owner: 'someOtherUser'
        }
    ],
    otherWishLists: [
        {   
            username: 'user1',
            wishlist: ['Blender', 'Couch', 'Acoustic Guitar']
        },
        {
            username: 'someOtherUser',
            wishlist: ['Floor lamp', 'Coffee Table']
        }
    ]
}

export const appReducer = (state=dummyState, action) => {
    if (action.type === FETCH_LISTINGS_SUCCESS){
        //add an editing property to each listing
        action.listings.forEach(listing => {
            listing.editing = false;
        });
        return Object.assign({}, state, {
            itemListings: action.listings,
            listingsError: null
        })
    }

    else if (action.type === FETCH_LISTINGS_ERROR){
        return Object.assign({}, state, {
            listingsError: action.error
        })
    }

    else if (action.type === FETCH_WISHLIST_SUCCESS){
        return Object.assign({}, state, {
            wishlist: action.wishlist,
            wishlistError: null
        })
    }

    else if (action.type === FETCH_WISHLIST_ERROR){
        return Object.assign({}, state, {
            wishlistError: action.error
        })
    }

    else if (action.type === POST_LISTING_SUCCESS){
        return Object.assign({}, state, {
            addingListing: false,
            itemListings: [...state.itemListings, action.listing],
            postListingError: null
        })
    }

    else if (action.type === POST_LISTING_ERROR){
        return Object.assign({}, state, {postListingError: action.error});
    }

    else if (action.type === POST_WISHITEM_SUCCESS){
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
        return Object.assign({}, state, {updateListingError: null});
    }

    else if (action.type === UPDATE_LISTING_ERROR){
        return Object.assign({}, state, {updateListingError: action.error});
    }

    else if (action.type === DELETE_LISTING_SUCCESS){
        return Object.assign({}, state, {deleteListingError: null});
    }

    else if (action.type === DELETE_LISTING_ERROR){
        return Object.assign({}, state, {deleteListingError: action.error});
    }

    else if (action.type === DELETE_WISHITEM_SUCCESS){
        return Object.assign({}, state, {deleteWishItemError: null});
    }

    else if (action.type === DELETE_WISHITEM_ERROR){
        return Object.assign({}, state, {deleteWishItemError: action.error});
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
        let itemListings = state.itemListings.map((listing) => {
            if (listing.id !== action.listingId) return listing;
            return Object.assign({}, listing, {
                editing: !listing.editing
            });
        });
        return Object.assign({}, state, {itemListings});
    }

    else if (action.type === RENEW_LISTING) {
        let itemListings = state.itemListings.map((listing, index) => {
            if (index !== action.listingIndex) return listing;
            return Object.assign({}, listing, {
                expiresIn: 14
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

    else if (action.type === DELETE_FROM_WISHLIST){
        const wishListArray = state.wishListArray.slice();
        wishListArray.splice(action.itemIndex, 1);
        return Object.assign({}, state, {wishListArray});
    }

    else if (action.type === TOGGLE_EDIT_WISHLIST){
        let wishListArray = state.wishListArray.map((item, index) => {
            if (index !== action.itemIndex) return item;
            return Object.assign({}, item, {
                editing: !item.editing
            });
        });
        return Object.assign({}, state, {wishListArray});
    }

    else if (action.type === UPDATE_WISHLIST_ITEM){
        let wishListArray = state.wishListArray.map((item, index) => {
            if (index !== action.itemIndex) return item;
            return Object.assign({}, item, {
                name: action.name,
                editing: false
            });
        });
        return Object.assign({}, state, {wishListArray});
    }

    else if (action.type === CHANGE_WISHLIST_STATUS){
        return Object.assign({}, state, {
            addingWishItem: !state.addingWishItem
        });
    }

    else if (action.type === ADD_WISHLIST_ITEM){
        return Object.assign({}, state, {
            addingWishlistItem: false,
            wishListArray: [...state.wishListArray,{
                name: action.name,
                editing: false
            }]
        });
    }

    return state;
};