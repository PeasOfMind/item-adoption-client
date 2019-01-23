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

export const RENEW_LISTING = 'RENEW_LISTING';
export const renewListing = listingIndex => ({
    type: RENEW_LISTING,
    listingIndex
})