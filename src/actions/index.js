import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_LISTINGS_SUCCESS = 'FETCH_LISTINGS_SUCCESS';
export const fetchListingsSuccess = listings => ({
    type: FETCH_LISTINGS_SUCCESS,
    listings
});

export const FETCH_LISTINGS_ERROR = 'FETCH_LISTINGS_ERROR';
export const fetchListingsError = error => ({
    type: FETCH_LISTINGS_ERROR,
    listingsError: error
});

export const fetchListings = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/lists/listings`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(resJson => {
        dispatch(fetchListingsSuccess(resJson.listings));
    })
    .catch(err => {
        dispatch(fetchListingsError(err));
    });
}

export const FETCH_WISHLIST_SUCCESS = 'FETCH_WISHLIST_SUCCESS';
export const fetchWishlistSuccess = wishlist => ({
    type: FETCH_WISHLIST_SUCCESS,
    wishlist
});

export const FETCH_WISHLIST_ERROR = 'FETCH_WISHLIST_ERROR';
export const fetchWishlistError = error => ({
    type: FETCH_WISHLIST_ERROR,
    wishlistError: error
});

export const fetchWishlist = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/lists/wishlist`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(resJson => {
        dispatch(fetchWishlistSuccess(resJson.wishlist));
    })
    .catch(err => {
        dispatch(fetchWishlistError(err));
    });
}

export const POST_LISTING_SUCCESS = 'POST_LISTING_SUCCESS';
export const postListingSuccess = listing => ({
    type: POST_LISTING_SUCCESS,
    listing
});

export const POST_LISTING_ERROR = 'POST_LISTING_ERROR';
export const postListingError = error => ({
    type: POST_LISTING_ERROR,
    postListingError: error
});

export const postListing = newListing => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/lists/listings`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify(newListing)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(resJson => {
        dispatch(fetchListings(resJson));
    })
    .catch(err => {
        dispatch(postListingError(err));
    });
}

// export const POST_WISHITEM_SUCCESS = 'POST_WISHITEM_SUCCESS';
// export const postWishItemSuccess = wishItem => ({
//     type: POST_WISHITEM_SUCCESS,
//     wishItem
// });

// export const POST_WISHITEM_ERROR = 'POST_WISHITEM_ERROR';
// export const postWishItemError = error => ({
//     type: POST_WISHITEM_ERROR,
//     postWishItemError: error
// });

// export const postWishItem = newItem => (dispatch, getState) => {
//     const authToken = getState().auth.authToken;
//     fetch(`${API_BASE_URL}/lists/wishlist`, {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${authToken}`
//         },
//         body: JSON.stringify(newItem)
//     })
//     .then(res => normalizeResponseErrors(res))
//     .then(res => res.json())
//     .then(resJson => {
//         dispatch(postWishItemSuccess(resJson.wishItem));
//     })
//     .catch(err => {
//         dispatch(postWishItemError(err));
//     });
// }

export const CHANGE_FORM_TYPE = 'CHANGE_FORM_TYPE';
export const changeFormType = formType => ({
    type: CHANGE_FORM_TYPE,
    formType
});

export const CHANGE_PAGE = 'CHANGE_PAGE';
export const changePage = currentPage =>  ({
    type: CHANGE_PAGE,
    currentPage
});

export const TOGGLE_EDIT_LISTING = 'TOGGLE_EDIT_LISTING';
export const toggleEditListing = listingIndex => ({
    type: TOGGLE_EDIT_LISTING,
    listingIndex
});

export const UPDATE_LISTING = 'UPDATE_LISTING';
export const updateListing = (title, description, price, listingIndex) => ({
    type: UPDATE_LISTING,
    title,
    description,
    price,
    listingIndex
});


export const DELETE_LISTING = 'DELETE_LISTING';
export const deleteListing = listingIndex => ({
    type: DELETE_LISTING,
    listingIndex
});

export const RENEW_LISTING = 'RENEW_LISTING';
export const renewListing = listingIndex => ({
    type: RENEW_LISTING,
    listingIndex
});

export const CHANGE_ADD_LISTING_STATUS = 'CHANGE_ADD_LISTING_STATUS';
export const changeAddListingStatus = () => ({
    type: CHANGE_ADD_LISTING_STATUS,
});

export const ADD_LISTING = 'ADD_LISTING';
export const addListing = (title, description, price) => ({
    type: ADD_LISTING,
    title,
    description,
    price
});

export const DELETE_FROM_WISHLIST = 'DELETE_FROM_WISHLIST';
export const deleteFromWishlist = itemIndex => ({
    type: DELETE_FROM_WISHLIST,
    itemIndex
});

export const TOGGLE_EDIT_WISHLIST = 'TOGGLE_EDIT_WISHLIST';
export const toggleEditWishlist = itemIndex => ({
    type: TOGGLE_EDIT_WISHLIST,
    itemIndex
});

export const UPDATE_WISHLIST_ITEM = 'UPDATE_WISHLIST_ITEM';
export const updateWishlistItem = (name, itemIndex) => ({
    type: UPDATE_WISHLIST_ITEM,
    name,
    itemIndex
});

export const CHANGE_WISHLIST_STATUS = 'CHANGE_WISHLIST_STATUS';
export const changeWishlistStatus = () => ({
    type: CHANGE_WISHLIST_STATUS
});

export const ADD_WISHLIST_ITEM = 'ADD_WISHLIST_ITEM';
export const addWishlistItem = name => ({
    type: ADD_WISHLIST_ITEM,
    name
});