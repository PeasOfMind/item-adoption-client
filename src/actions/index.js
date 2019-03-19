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
    return fetch(`${API_BASE_URL}/lists/listings`, {
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
    return fetch(`${API_BASE_URL}/lists/wishlist`, {
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

export const FETCH_ONE_LISTING_SUCCESS = 'FETCH_ONE_LISTING_SUCCESS';
export const fetchOneListingSuccess = listing => ({
    type: FETCH_ONE_LISTING_SUCCESS,
    listing
});

export const FETCH_ONE_LISTING_ERROR = 'FETCH_ONE_LISTING_ERROR';
export const fetchOneListingError = (listingId, error) => ({
    type: FETCH_ONE_LISTING_ERROR,
    error,
    listingId
});

export const fetchOneListing = listingId => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/lists/listings/${listingId}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(resJson => {
        dispatch(fetchOneListingSuccess(resJson));
    })
    .catch(err => {
        dispatch(fetchOneListingError(listingId, err));
    });
}

export const FETCH_WISHITEM_SUCCESS = 'FETCH_WISHITEM_SUCCESS';
export const fetchWishItemSuccess = wishItem => ({
    type: FETCH_WISHITEM_SUCCESS,
    wishItem
});

export const FETCH_WISHITEM_ERROR = 'FETCH_WISHITEM_ERROR';
export const fetchWishItemError = (itemId, error) => ({
    type: FETCH_WISHITEM_ERROR,
    itemId,
    error
});

export const fetchWishItem = itemId => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/lists/wishlist/${itemId}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(resJson => {
        dispatch(fetchWishItemSuccess(resJson));
    })
    .catch(err => {
        dispatch(fetchWishItemError(err));
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
    return fetch(`${API_BASE_URL}/lists/listings`, {
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
    error
});

export const postWishItem = newItem => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/lists/wishlist`, {
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
export const updateListingSuccess = listingId => ({
    type: UPDATE_LISTING_SUCCESS,
    listingId
});

export const UPDATE_LISTING_ERROR = 'UPDATE_LISTING_ERROR';
export const updateListingError = (listingId, error) => ({
    type: UPDATE_LISTING_ERROR,
    listingId,
    error
});

export const updateListing = updateData => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/lists/listings/${updateData.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify(updateData)
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
        dispatch(updateListingSuccess(updateData.id));
    })
    .then(() => {
        dispatch(fetchOneListing(updateData.id));
    })
    .catch(err => {
        dispatch(updateListingError(updateData.id, err));
    });
}

export const UPDATE_WISHITEM_SUCCESS = 'UPDATE_WISHITEM_SUCCESS';
export const updateWishItemSuccess = itemId => ({
    type: UPDATE_WISHITEM_SUCCESS,
    itemId
});

export const UPDATE_WISHITEM_ERROR = 'UPDATE_WISHITEM_ERROR';
export const updateWishItemError = (itemId, error) => ({
    type: UPDATE_WISHITEM_ERROR,
    itemId,
    error
});

export const updateWishItem = updateData => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/lists/wishlist/${updateData.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify(updateData)
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
        dispatch(updateWishItemSuccess(updateData.id));
    })
    .then(() => {
        dispatch(fetchWishItem(updateData.id));
    })
    .catch(err => {
        dispatch(updateWishItemError(updateData.id, err));
    });
}

export const DELETE_LISTING_ERROR = 'DELETE_LISTING_ERROR';
export const deleteListingError = (listingId, error) => ({
    type: DELETE_LISTING_ERROR,
    listingId,
    error
});

export const deleteListing = listingId => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/lists/listings/${listingId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
        dispatch(fetchListings());
    })
    .catch(err => {
        dispatch(deleteListingError(listingId, err));
    })
}

export const DELETE_WISHITEM_ERROR = 'DELETE_WISHITEM_ERROR';
export const deleteWishItemError = (itemId, error) => ({
    type: DELETE_WISHITEM_ERROR,
    itemId,
    error
});

export const deleteWishItem = wishItemId => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/lists/wishlist/${wishItemId}`, {
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
        dispatch(deleteWishItemError(wishItemId, err));
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
    return fetch(`${API_BASE_URL}/lists/listings/search/${zipcode}`, {
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
    return fetch(`${API_BASE_URL}/lists/wishlist/search/${zipcode}`, {
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

export const CONTACT_LISTING_USER_SUCCESS = 'CONTACT_LISTING_USER_SUCCESS';
export const contactListingUserSuccess = itemId => ({
    type: CONTACT_LISTING_USER_SUCCESS,
    itemId
});

export const CONTACT_LISTING_USER_ERROR = 'CONTACT_LISTING_USER_ERROR';
export const contactListingUserError = (itemId, error) => ({
    type: CONTACT_LISTING_USER_ERROR,
    error,
    itemId
});

export const contactListingUser = itemId => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/lists/listings/contact/${itemId}`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
        dispatch(contactListingUserSuccess(itemId));
    })
    .catch(err => {
        dispatch(contactListingUserError(itemId, err));
    });
}

export const CONTACT_WISHLIST_USER_SUCCESS = 'CONTACT_WISHLIST_USER_SUCCESS';
export const contactWishlistUserSuccess = (wishUser, itemId) => ({
    type: CONTACT_WISHLIST_USER_SUCCESS,
    wishUser,
    itemId
});

export const CONTACT_WISHLIST_USER_ERROR = 'CONTACT_WISHLIST_USER_ERROR';
export const contactWishlistUserError = (wishUser, itemId, error) => ({
    type: CONTACT_WISHLIST_USER_ERROR,
    wishUser,
    itemId,
    error
});

export const contactWishlistUser = (wishUser, itemId) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/lists/wishlist/contact/${itemId}`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
        dispatch(contactWishlistUserSuccess(wishUser, itemId));
    })
    .catch(err => {
        dispatch(contactWishlistUserError(wishUser, itemId, err));
    });
}

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

export const CHANGE_ADD_LISTING_STATUS = 'CHANGE_ADD_LISTING_STATUS';
export const changeAddListingStatus = () => ({
    type: CHANGE_ADD_LISTING_STATUS,
});

export const TOGGLE_EDIT_WISHLIST = 'TOGGLE_EDIT_WISHLIST';
export const toggleEditWishlist = itemId => ({
    type: TOGGLE_EDIT_WISHLIST,
    itemId
});

export const CHANGE_WISHLIST_STATUS = 'CHANGE_WISHLIST_STATUS';
export const changeWishlistStatus = () => ({
    type: CHANGE_WISHLIST_STATUS
});

export const TOGGLE_ZIP_ENTRY = 'TOGGLE_ZIP_ENTRY';
export const toggleZipEntry = () => ({
    type: TOGGLE_ZIP_ENTRY
});