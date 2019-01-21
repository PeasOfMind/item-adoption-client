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