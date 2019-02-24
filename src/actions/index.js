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
    error
});

export const fetchListings = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/lists/listings`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${authToken}`
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
    error
});

export const fetchWishlist = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/lists/wishlist`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${authToken}`
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
    error
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
        dispatch(postListingSuccess(resJson));
    })
    .catch(err => {
        dispatch(postListingError(err));
    });
}

export const POST_WISHITEM_SUCCESS = 'POST_WISHITEM_SUCCESS';
export const postWishItemSuccess = wishItem => ({
    type: POST_WISHITEM_SUCCESS,
    wishItem
});

export const POST_WISHITEM_ERROR = 'POST_WISHITEM_ERROR';
export const postWishItemError = error => ({
    type: POST_WISHITEM_ERROR,
    postWishItemError: error
});

export const postWishItem = newItem => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/lists/wishlist`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify(newItem)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(resJson => {
        dispatch(postWishItemSuccess(resJson));
    })
    .catch(err => {
        dispatch(postWishItemError(err));
    });
}

export const UPDATE_LISTING_SUCCESS = 'UPDATE_LISTING_SUCCESS';
export const updateListingSuccess = () => ({
    type: UPDATE_LISTING_SUCCESS
});

export const UPDATE_LISTING_ERROR = 'UPDATE_LISTING_ERROR';
export const updateListingError = error => ({
    type: UPDATE_LISTING_ERROR,
    error
});

export const updateListing = updateData => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/lists/listings/${updateData.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify(updateData)
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
        dispatch(updateListingSuccess());
        //TODO: change this to fetch the individual listing
        dispatch(fetchListings());
    })
    .catch(err => {
        dispatch(updateListingError(err));
    });
}

export const UPDATE_WISHITEM_SUCCESS = 'UPDATE_WISHITEM_SUCCESS';
export const updateWishItemSuccess = () => ({
    type: UPDATE_WISHITEM_SUCCESS
});

export const UPDATE_WISHITEM_ERROR = 'UPDATE_WISHITEM_ERROR';
export const updateWishItemError = error => ({
    type: UPDATE_WISHITEM_ERROR,
    error
});

export const updateWishItem = updateData => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/lists/listings/${updateData.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify(updateData)
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
        dispatch(updateWishItemSuccess());
        //TODO: change this to fetch the individual wish item
        dispatch(fetchWishlist());
    })
    .catch(err => {
        dispatch(updateWishItemError(err));
    });
}

export const DELETE_LISTING_SUCCESS = 'DELETE_LISTING_SUCCESS';
export const deleteListingSuccess = () => ({
    type: DELETE_LISTING_SUCCESS
});

export const DELETE_LISTING_ERROR = 'DELETE_LISTING_ERROR';
export const deleteListingError = error => ({
    type: DELETE_LISTING_ERROR,
    error
});

export const deleteListing = listingId => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/lists/listings/${listingId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
        dispatch(deleteListingSuccess());
        dispatch(fetchListings());
    })
    .catch(err => {
        dispatch(deleteListingError(err));
    })
}

export const DELETE_WISHITEM_SUCCESS = 'DELETE_WISHITEM_SUCCESS';
export const deleteWishItemSuccess = () => ({
    type: DELETE_WISHITEM_SUCCESS
});

export const DELETE_WISHITEM_ERROR = 'DELETE_WISHITEM_ERROR';
export const deleteWishItemError = error => ({
    type: DELETE_WISHITEM_ERROR,
    error
});

export const deleteWishItem = wishItemId => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/lists/wishlist/${wishItemId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
        dispatch(fetchWishlist());
    })
    .catch(err => {
        dispatch(deleteWishItemError(err));
    })
}

export const FETCH_OTHER_LISTINGS_SUCCESS = 'FETCH_OTHER_LISTINGS_SUCCESS';
export const fetchOtherListingsSuccess = otherListings => ({
    type: FETCH_OTHER_LISTINGS_SUCCESS,
    otherListings
});

export const FETCH_OTHER_LISTINGS_ERROR = 'FETCH_OTHER_LISTINGS_ERROR';
export const fetchOtherListingsError = error => ({
    type: FETCH_OTHER_LISTINGS_ERROR,
    error
});

export const fetchOtherListings = zipcode => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/lists/listings/${zipcode}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(resJson => {
        dispatch(fetchOtherListingsSuccess(resJson.listings));
    })
    .catch(err => {
        dispatch(fetchOtherListingsError(err));
    });
}

export const FETCH_OTHER_WISHLISTS_SUCCESS = 'FETCH_OTHER_WISHLISTS_SUCCESS';
export const fetchOtherWishlistsSuccess = otherWishlists => ({
    type: FETCH_OTHER_WISHLISTS_SUCCESS,
    otherWishlists
});

export const FETCH_OTHER_WISHLISTS_ERROR = 'FETCH_OTHER_WISHLISTS_ERROR';
export const fetchOtherWishlistsError = error => ({
    type: FETCH_OTHER_WISHLISTS_ERROR,
    error
});

export const fetchOtherWishlists = zipcode => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/lists/wishlist/${zipcode}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(resJson => {
        dispatch(fetchOtherWishlistsSuccess(resJson));
    })
    .catch(err => {
        dispatch(fetchOtherWishlistsError(err));
    });
}

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
export const toggleEditListing = listingId => ({
    type: TOGGLE_EDIT_LISTING,
    listingId
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

export const TOGGLE_EDIT_WISHLIST = 'TOGGLE_EDIT_WISHLIST';
export const toggleEditWishlist = itemId => ({
    type: TOGGLE_EDIT_WISHLIST,
    itemId
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