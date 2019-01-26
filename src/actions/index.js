export const CHANGE_FORM_TYPE = 'CHANGE_FORM_TYPE';
export const changeFormType = formType => ({
    type: CHANGE_FORM_TYPE,
    formType
})

export const CHANGE_PAGE = 'CHANGE_PAGE';
export const changePage = currentPage =>  ({
    type: CHANGE_PAGE,
    currentPage
})

export const TOGGLE_EDIT_LISTING = 'TOGGLE_EDIT_LISTING';
export const toggleEditListing = listingIndex => ({
    type: TOGGLE_EDIT_LISTING,
    listingIndex
})

export const UPDATE_LISTING = 'UPDATE_LISTING';
export const updateListing = (title, description, price, listingIndex) => ({
    type: UPDATE_LISTING,
    title,
    description,
    price,
    listingIndex
})


export const DELETE_LISTING = 'DELETE_LISTING';
export const deleteListing = listingIndex => ({
    type: DELETE_LISTING,
    listingIndex
})

export const RENEW_LISTING = 'RENEW_LISTING';
export const renewListing = listingIndex => ({
    type: RENEW_LISTING,
    listingIndex
})

export const CHANGE_ADD_LISTING_STATUS = 'CHANGE_ADD_LISTING_STATUS';
export const changeAddListingStatus = () => ({
    type: CHANGE_ADD_LISTING_STATUS,
})

export const ADD_LISTING = 'ADD_LISTING';
export const addListing = (title, description, price) => ({
    type: ADD_LISTING,
    title,
    description,
    price
})

export const DELETE_FROM_WISHLIST = 'DELETE_FROM_WISHLIST';
export const deleteFromWishlist = itemIndex => ({
    type: DELETE_FROM_WISHLIST,
    itemIndex
})

export const TOGGLE_EDIT_WISHLIST = 'TOGGLE_EDIT_WISHLIST';
export const toggleEditWishlist = itemIndex => ({
    type: TOGGLE_EDIT_WISHLIST,
    itemIndex
})

export const UPDATE_WISHLIST_ITEM = 'UPDATE_WISHLIST_ITEM';
export const updateWishlistItem = (name, itemIndex) => ({
    type: UPDATE_WISHLIST_ITEM,
    name,
    itemIndex
})

export const CHANGE_WISHLIST_STATUS = 'CHANGE_WISHLIST_STATUS';
export const changeWishlistStatus = () => ({
    type: CHANGE_WISHLIST_STATUS
})

export const ADD_WISHLIST_ITEM = 'ADD_WISHLIST_ITEM';
export const addWishlistItem = name => ({
    type: ADD_WISHLIST_ITEM,
    name
})