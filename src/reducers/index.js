import {CHANGE_FORM_TYPE, CHANGE_PAGE, TOGGLE_EDIT_LISTING, UPDATE_LISTING, RENEW_LISTING, ADD_LISTING, CHANGE_ADD_LISTING_STATUS, DELETE_FROM_WISHLIST, TOGGLE_EDIT_WISHLIST, DELETE_LISTING, UPDATE_WISHLIST_ITEM, ADD_WISHLIST_ITEM, CHANGE_WISHLIST_STATUS} from '../actions';

const dummyState = {
    navLinks: ['Login', 'Signup'],
    formType: 'Signup',
    headingType: 'landing-header',
    currentPage: 'landing',
    itemListings: [
        {
            title: `TV - 32" with stand and mounting equipment`,
            description: `Sony branded smart tv. Comes with screws for mounting into the wall and free chromecast.`,
            price: 100,
            expiresIn: 10,
            editing: false
        },
        {
            title: `Blendtec Blender`,
            description: `Great blender only 2 years old. Still has 6 years left on warranty.`,
            price: 50,
            expiresIn: 5,
            editing: false
        },
    ],
    addingListing: false,
    addingWishlistItem: false,
    wishListArray: [
        {name: 'iPhone 8 or up', editing: false}, 
        {name: 'Macbook charger', editing: false}, 
        {name: 'Sandals in size 5 womens', editing: false}
    ],
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
    if (action.type === CHANGE_FORM_TYPE) {
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
    if (action.type === CHANGE_PAGE) {
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

    if (action.type === TOGGLE_EDIT_LISTING) {
        let itemListings = state.itemListings.map((listing, index) => {
            if (index !== action.listingIndex) return listing;
            return Object.assign({}, listing, {
                editing: !listing.editing
            });
        });
        return Object.assign({}, state, {itemListings});
    }

    if (action.type === UPDATE_LISTING) {
        let itemListings = state.itemListings.map((listing, index) => {
            if (index !== action.listingIndex) return listing;
            return Object.assign({}, listing, {
                title: action.title,
                description: action.description,
                price: action.price,
                editing: false
            });
        });

        return Object.assign({}, state, {itemListings});
    }

    if (action.type === DELETE_LISTING){
        const itemListings = state.itemListings.slice();
        itemListings.splice(action.listingIndex, 1);
        return Object.assign({}, state, {itemListings});
    }

    if (action.type === RENEW_LISTING) {
        let itemListings = state.itemListings.map((listing, index) => {
            if (index !== action.listingIndex) return listing;
            return Object.assign({}, listing, {
                expiresIn: 14
            });
        });

        return Object.assign({}, state, {itemListings});
    }

    if (action.type === CHANGE_ADD_LISTING_STATUS){
        return Object.assign({}, state, {
            addingListing: !state.addingListing
        });
    }

    if (action.type === ADD_LISTING){
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

    if (action.type === DELETE_FROM_WISHLIST){
        const wishListArray = state.wishListArray.slice();
        wishListArray.splice(action.itemIndex, 1);
        return Object.assign({}, state, {wishListArray});
    }

    if (action.type === TOGGLE_EDIT_WISHLIST){
        let wishListArray = state.wishListArray.map((item, index) => {
            if (index !== action.itemIndex) return item;
            return Object.assign({}, item, {
                editing: !item.editing
            });
        });
        return Object.assign({}, state, {wishListArray});
    }

    if (action.type === UPDATE_WISHLIST_ITEM){
        let wishListArray = state.wishListArray.map((item, index) => {
            if (index !== action.itemIndex) return item;
            return Object.assign({}, item, {
                name: action.name,
                editing: false
            });
        });
        return Object.assign({}, state, {wishListArray});
    }

    if (action.type === CHANGE_WISHLIST_STATUS){
        return Object.assign({}, state, {
            addingWishlistItem: !state.addingWishlistItem
        });
    }

    if (action.type === ADD_WISHLIST_ITEM){
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