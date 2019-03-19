import * as actions from './index';
// import configureMockStore from 'redux-mock-store';
import {API_BASE_URL} from '../config';

// const mockStore = configureMockStore();
const authToken = 'mockAuth123';
const getState = () => ({auth: {authToken}});

describe('fetchListingsSuccess', () => {
    it('Should return the action', () => {
        const listings = [];
        const action = actions.fetchListingsSuccess(listings);
        expect(action.type).toEqual(actions.FETCH_LISTINGS_SUCCESS);
        expect(action.listings).toEqual(listings);
    });
});

describe('fetchListingsError', () => {
    it('Should return the action', () => {
        const err = 'some err';
        const action = actions.fetchListingsError(err);
        expect(action.type).toEqual(actions.FETCH_LISTINGS_ERROR);
        expect(action.error).toEqual(err);
    });
});

describe('fetchListings', () => {
    // let store;
    // beforeEach(() => {
    //     store = mockStore({
    //         authToken: 'auth123',
    //         currentUser: 'testUser456',
    //         userId: '789',
    //         userZip: '10000',
    //         userEmail: 'testuser@test.com',
    //         loading: false,
    //         loginError: null,
    //         fetchZipError: null,
    //         updateZipError: null,
    //         editing: false
    //     });
    // });

    it('Sould dispatch fetchListingsSuccess', () => {
        const mockListings = {listings: ['listingOne', 'listingTwo']};
        const expectedHeaders = {
            "headers": {"Authorization": `Bearer ${authToken}`},
            "method": "GET"
        }

        global.fetch = jest.fn().mockImplementation( () => {
            return Promise.resolve({
                ok: true,
                json() {
                    return mockListings;
                }
            })
        });

        const dispatch = jest.fn();
        return actions.fetchListings()(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/lists/listings`, expectedHeaders);
            expect(dispatch).toHaveBeenCalledWith(actions.fetchListingsSuccess(mockListings.listings));
        });

    });
});

describe('fetchWishlistSuccess', () => {
    it('Should return the action', () => {
        const wishlist = ['someItem'];
        const action = actions.fetchWishlistSuccess(wishlist);
        expect(action.type).toEqual(actions.FETCH_WISHLIST_SUCCESS);
        expect(action.wishlist).toEqual(wishlist);
    });
});

describe('fetchWishlistError', () => {
    it('Should return the action', () => {
        const err = 'some err';
        const action = actions.fetchWishlistError(err);
        expect(action.type).toEqual(actions.FETCH_WISHLIST_ERROR);
        expect(action.error).toEqual(err);
    })
})

describe('fetchWishlist', () => {
    it('Sould dispatch fetchWishlistSuccess', () => {
        const mockWishlist = {wishlist: ['itemOne', 'itemTwo']};
        const expectedHeaders = {
            "headers": {"Authorization": `Bearer ${authToken}`},
            "method": "GET"
        }

        global.fetch = jest.fn().mockImplementation( () => {
            return Promise.resolve({
                ok: true,
                json() {
                    return mockWishlist;
                }
            })
        });

        const dispatch = jest.fn();
        return actions.fetchWishlist()(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/lists/wishlist`, expectedHeaders);
            expect(dispatch).toHaveBeenCalledWith(actions.fetchWishlistSuccess(mockWishlist.wishlist));
        });
    });
});

describe('fetchOneListingSuccess', () => {
    it('Should return the action', () => {
        const listing = {title: 'some item'};
        const action = actions.fetchOneListingSuccess(listing);
        expect(action.type).toEqual(actions.FETCH_ONE_LISTING_SUCCESS);
        expect(action.listing).toEqual(listing);
    });
});

describe('fetchOneListingError', () => {
    it('Should return the action', () => {
        const err = 'some err';
        const listingId = 'id123'
        const action = actions.fetchOneListingError(listingId, err);
        expect(action.type).toEqual(actions.FETCH_ONE_LISTING_ERROR);
        expect(action.error).toEqual(err);
        expect(action.listingId).toEqual(listingId);
    });
});

describe('fetchOneListing', () => {
    it('Sould dispatch fetchOneListingSuccess', () => {
        const mockListing = {
            id: `mockId123`,
            title:'listingOne'
        };

        const expectedHeaders = {
            "headers": {"Authorization": `Bearer ${authToken}`},
            "method": "GET"
        }

        global.fetch = jest.fn().mockImplementation( () => {
            return Promise.resolve({
                ok: true,
                json() {
                    return mockListing;
                }
            })
        });

        const dispatch = jest.fn();
        return actions.fetchOneListing(mockListing.id)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/lists/listings/${mockListing.id}`, expectedHeaders);
            expect(dispatch).toHaveBeenCalledWith(actions.fetchOneListingSuccess(mockListing));
        });
    });
});

describe('fetchWishItemSuccess', () => {
    it('Should return the action', () => {
        const wishItem = {title: 'some item'};
        const action = actions.fetchWishItemSuccess(wishItem);
        expect(action.type).toEqual(actions.FETCH_WISHITEM_SUCCESS);
        expect(action.wishItem).toEqual(wishItem);
    });
});

describe('fetchWishItemError', () => {
    it('Should return the action', () => {
        const err = 'some err';
        const itemId = 'id123';
        const action = actions.fetchWishItemError(itemId, err);
        expect(action.type).toEqual(actions.FETCH_WISHITEM_ERROR);
        expect(action.error).toEqual(err);
        expect(action.itemId).toEqual(itemId);
    });
});

describe('fetchWishItem', () => {
    it('Sould dispatch fetchWishItemSuccess', () => {
        const mockWishItem = {
            id: `mockItem123`,
            title: 'itemOne'
        };
        const expectedHeaders = {
            "headers": {"Authorization": `Bearer ${authToken}`},
            "method": "GET"
        }

        global.fetch = jest.fn().mockImplementation( () => {
            return Promise.resolve({
                ok: true,
                json() {
                    return mockWishItem;
                }
            })
        });

        const dispatch = jest.fn();
        return actions.fetchWishItem(mockWishItem.id)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/lists/wishlist/${mockWishItem.id}`, expectedHeaders);
            expect(dispatch).toHaveBeenCalledWith(actions.fetchWishItemSuccess(mockWishItem));
        });
    });
});

describe('postListingSuccess', () => {
    it('Should return the action', () => {
        const listing = {title: 'some item'};
        const action = actions.postListingSuccess(listing);
        expect(action.type).toEqual(actions.POST_LISTING_SUCCESS);
        expect(action.listing).toEqual(listing);
    });
});

describe('postListingError', () => {
    it('Should return the action', () => {
        const err = 'some err';
        const action = actions.postListingError(err);
        expect(action.type).toEqual(actions.POST_LISTING_ERROR);
        expect(action.error).toEqual(err);
    });
});

describe('postListing', () => {
    it('Sould dispatch postListingSuccess', () => {
        const mockListing = {
            id: `mockId123`,
            title:'listingOne'
        };

        const expectedHeaders = {
            "body": "{\"id\":\"mockId123\",\"title\":\"listingOne\"}",
            "headers": {
                "Content-Type": "application/json; charset=utf-8", 
                "Authorization": `Bearer ${authToken}`
            },
            "method": "POST"
        }

        global.fetch = jest.fn().mockImplementation( () => {
            return Promise.resolve({
                ok: true,
                json() {
                    return mockListing;
                }
            })
        });

        const dispatch = jest.fn();
        return actions.postListing(mockListing)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/lists/listings`, expectedHeaders);
            expect(dispatch).toHaveBeenCalledWith(actions.postListingSuccess(mockListing));
        });
    });
});

describe('postWishItemSuccess', () => {
    it('Should return the action', () => {
        const wishItem = {title: 'some item'};
        const action = actions.postWishItemSuccess(wishItem);
        expect(action.type).toEqual(actions.POST_WISHITEM_SUCCESS);
        expect(action.wishItem).toEqual(wishItem);
    });
});

describe('postWishItemError', () => {
    it('Should return the action', () => {
        const err = 'some err';
        const action = actions.postWishItemError(err);
        expect(action.type).toEqual(actions.POST_WISHITEM_ERROR);
        expect(action.error).toEqual(err);
    });
});

describe('postWishItem', () => {
    it('Sould dispatch postWishItemSuccess', () => {
        const mockWishItem = {
            id: `mockItem123`,
            title: 'itemOne'
        };

        const expectedHeaders = {
            "body": "{\"id\":\"mockItem123\",\"title\":\"itemOne\"}",
            "headers": {
                "Content-Type": "application/json; charset=utf-8", 
                "Authorization": `Bearer ${authToken}`
            },
            "method": "POST"
        }

        global.fetch = jest.fn().mockImplementation( () => {
            return Promise.resolve({
                ok: true,
                json() {
                    return mockWishItem;
                }
            })
        });

        const dispatch = jest.fn();
        return actions.postWishItem(mockWishItem)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/lists/wishlist`, expectedHeaders);
            expect(dispatch).toHaveBeenCalledWith(actions.postWishItemSuccess(mockWishItem));
        });
    });
});

describe('updateListingSuccess', () => {
    it('Should return the action', () => {
        const listingId = 'id123';
        const action = actions.updateListingSuccess(listingId);
        expect(action.type).toEqual(actions.UPDATE_LISTING_SUCCESS);
        expect(action.listingId).toEqual(listingId);
    });
});

describe('updateListingError', () => {
    it('Should return the action', () => {
        const err = 'some err';
        const listingId = 'id123';
        const action = actions.updateListingError(listingId, err);
        expect(action.type).toEqual(actions.UPDATE_LISTING_ERROR);
        expect(action.error).toEqual(err);
        expect(action.listingId).toEqual(listingId);
    });
});

describe('updateListing', () => {
    it('Sould dispatch updateListingSuccess', () => {
        const mockListing = {
            id: `mockId123`,
            title:'listingOne'
        };

        const expectedHeaders = {
            "body": "{\"id\":\"mockId123\",\"title\":\"listingOne\"}",
            "headers": {
                "Content-Type": "application/json; charset=utf-8", 
                "Authorization": `Bearer ${authToken}`
            },
            "method": "PUT"
        }

        global.fetch = jest.fn().mockImplementation( () => {
            return Promise.resolve({ ok: true })
        });

        const dispatch = jest.fn();
        return actions.updateListing(mockListing)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/lists/listings/${mockListing.id}`, expectedHeaders);
            expect(dispatch).toHaveBeenCalledWith(actions.updateListingSuccess(mockListing.id));
        });
    });
});

describe('updateWishItemSuccess', () => {
    it('Should return the action', () => {
        const itemId = 'id123';
        const action = actions.updateWishItemSuccess(itemId);
        expect(action.type).toEqual(actions.UPDATE_WISHITEM_SUCCESS);
        expect(action.itemId).toEqual(itemId);
    });
});

describe('updateWishItemError', () => {
    it('Should return the action', () => {
        const err = 'some err';
        const itemId = 'id123';
        const action = actions.updateWishItemError(itemId, err);
        expect(action.type).toEqual(actions.UPDATE_WISHITEM_ERROR);
        expect(action.error).toEqual(err);
        expect(action.itemId).toEqual(itemId);
    });
});

describe('updateWishItem', () => {
    it('Sould dispatch updateWishItemSuccess', () => {
        const mockWishItem = {
            id: `mockItem123`,
            title: 'itemOne'
        };

        const expectedHeaders = {
            "body": "{\"id\":\"mockItem123\",\"title\":\"itemOne\"}",
            "headers": {
                "Content-Type": "application/json; charset=utf-8", 
                "Authorization": `Bearer ${authToken}`
            },
            "method": "PUT"
        }

        global.fetch = jest.fn().mockImplementation( () => {
            return Promise.resolve({ ok: true })
        });

        const dispatch = jest.fn();
        return actions.updateWishItem(mockWishItem)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/lists/wishlist/${mockWishItem.id}`, expectedHeaders);
            expect(dispatch).toHaveBeenCalledWith(actions.updateWishItemSuccess(mockWishItem.id));
        });
    });
});

describe('deleteListingError', () => {
    it('Should return the action', () => {
        const err = 'some err';
        const listingId = 'id123';
        const action = actions.deleteListingError(listingId, err);
        expect(action.type).toEqual(actions.DELETE_LISTING_ERROR);
        expect(action.error).toEqual(err);
        expect(action.listingId).toEqual(listingId);
    });
});

describe('deleteListing', () => {
    it('Sould fetch to correct endpoint', () => {
        const mockListing = {id: `mockId123`};
        const expectedHeaders = {
            "headers": {"Authorization": `Bearer ${authToken}`},
            "method": "DELETE"
        }

        global.fetch = jest.fn().mockImplementation( () => {
            return Promise.resolve({ ok: true })
        });

        const dispatch = jest.fn();
        return actions.deleteListing(mockListing.id)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/lists/listings/${mockListing.id}`, expectedHeaders);
        });
    });
});

describe('deleteWishItemError', () => {
    it('Should return the action', () => {
        const err = 'some err';
        const itemId = 'id123';
        const action = actions.deleteWishItemError(itemId, err);
        expect(action.type).toEqual(actions.DELETE_WISHITEM_ERROR);
        expect(action.error).toEqual(err);
        expect(action.itemId).toEqual(itemId);
    });
});

describe('deleteWishItem', () => {
    it('Sould fetch to correct endpoint', () => {
        const mockWishItem = {id: `mockId123`};
        const expectedHeaders = {
            "headers": {"Authorization": `Bearer ${authToken}`},
            "method": "DELETE"
        }

        global.fetch = jest.fn().mockImplementation( () => {
            return Promise.resolve({ ok: true })
        });

        const dispatch = jest.fn();
        return actions.deleteWishItem(mockWishItem.id)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/lists/wishlist/${mockWishItem.id}`, expectedHeaders);
        });
    });
});

describe('fetchOtherListingsSuccess', () => {
    it('Should return the action', () => {
        const listings = ['some listing'];
        const action = actions.fetchOtherListingsSuccess(listings);
        expect(action.type).toEqual(actions.FETCH_OTHER_LISTINGS_SUCCESS);
        expect(action.otherListings).toEqual(listings);
    });
});

describe('fetchOtherListingsError', () => {
    it('Should return the action', () => {
        const err = 'some err';
        const action = actions.fetchOtherListingsError(err);
        expect(action.type).toEqual(actions.FETCH_OTHER_LISTINGS_ERROR);
        expect(action.error).toEqual(err);
    });
});

describe('fetchOtherListings', () => {
    it('Sould dispatch fetchOtherListingsSuccess', () => {
        const mockListings = {listings: ['listingOne', 'listingTwo']};
        const mockZip = '10000';
        const expectedHeaders = {
            "headers": {"Authorization": `Bearer ${authToken}`},
            "method": "GET"
        }

        global.fetch = jest.fn().mockImplementation( () => {
            return Promise.resolve({ 
                ok: true,
                json() {
                    return mockListings;
                }
            })
        });

        const dispatch = jest.fn();
        return actions.fetchOtherListings(mockZip)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/lists/listings/search/${mockZip}`, expectedHeaders);
            expect(dispatch).toHaveBeenCalledWith(actions.fetchOtherListingsSuccess(mockListings.listings));
        });
    });
});

describe('fetchOtherWishlistsSuccess', () => {
    it('Should return the action', () => {
        const wishlists = ['some item'];
        const action = actions.fetchOtherWishlistsSuccess(wishlists);
        expect(action.type).toEqual(actions.FETCH_OTHER_WISHLISTS_SUCCESS);
        expect(action.otherWishlists).toEqual(wishlists);
    });
});

describe('fetchOtherWishlistsError', () => {
    it('Should return the action', () => {
        const err = 'some err';
        const action = actions.fetchOtherWishlistsError(err);
        expect(action.type).toEqual(actions.FETCH_OTHER_WISHLISTS_ERROR);
        expect(action.error).toEqual(err);
    });
});

describe('fetchOtherWishlists', () => {
    it('Sould dispatch fetchOtherWishlistsSuccess', () => {
        const mockWishlist = {wishlist: ['itemOne', 'itemTwo']};
        const mockZip = '10000';
        const expectedHeaders = {
            "headers": {"Authorization": `Bearer ${authToken}`},
            "method": "GET"
        }

        global.fetch = jest.fn().mockImplementation( () => {
            return Promise.resolve({ 
                ok: true,
                json() {
                    return mockWishlist;
                }
            })
        });

        const dispatch = jest.fn();
        return actions.fetchOtherWishlists(mockZip)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/lists/wishlist/search/${mockZip}`, expectedHeaders);
            expect(dispatch).toHaveBeenCalledWith(actions.fetchOtherWishlistsSuccess(mockWishlist));
        });
    });
});

describe('contactListingUserSuccess', () => {
    it('Should return the action', () => {
        const itemId = 'id123';
        const action = actions.contactListingUserSuccess(itemId);
        expect(action.type).toEqual(actions.CONTACT_LISTING_USER_SUCCESS);
        expect(action.itemId).toEqual(itemId);
    });
});

describe('contactListingUserError', () => {
    it('Should return the action', () => {
        const itemId = 'id123';
        const err = 'some err';
        const action = actions.contactListingUserError(itemId, err);
        expect(action.type).toEqual(actions.CONTACT_LISTING_USER_ERROR);
        expect(action.error).toEqual(err);
        expect(action.itemId).toEqual(itemId);
    });
});

describe('contactListingUser', () => {
    it('Sould dispatch contactListingUserSuccess', () => {
        const mockId = '10000';
        const expectedHeaders = {
            "headers": {"Authorization": `Bearer ${authToken}`},
            "method": "POST"
        }

        global.fetch = jest.fn().mockImplementation( () => {
            return Promise.resolve({ ok: true })
        });

        const dispatch = jest.fn();
        return actions.contactListingUser(mockId)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/lists/listings/contact/${mockId}`, expectedHeaders);
            expect(dispatch).toHaveBeenCalledWith(actions.contactListingUserSuccess(mockId));
        });
    });
});

describe('contactWishlistUserSuccess', () => {
    it('Should return the action', () => {
        const wishUser = {username: 'some user'};
        const itemId = 'id123';
        const action = actions.contactWishlistUserSuccess(wishUser, itemId);
        expect(action.type).toEqual(actions.CONTACT_WISHLIST_USER_SUCCESS);
        expect(action.itemId).toEqual(itemId);
        expect(action.wishUser).toEqual(wishUser);
    });
});

describe('contactWishlistUserError', () => {
    it('Should return the action', () => {
        const wishUser = {username: 'some user'};
        const itemId = 'id123';
        const err = 'some err';
        const action = actions.contactWishlistUserError(wishUser, itemId, err);
        expect(action.type).toEqual(actions.CONTACT_WISHLIST_USER_ERROR);
        expect(action.error).toEqual(err);
        expect(action.itemId).toEqual(itemId);
        expect(action.wishUser).toEqual(wishUser);
    });
});

describe('contactWishlistUser', () => {
    it('Sould dispatch contactWishlistUserSuccess', () => {
        const mockId = '10000';
        const mockUser = 'TestUser123'
        const expectedHeaders = {
            "headers": {"Authorization": `Bearer ${authToken}`},
            "method": "POST"
        }

        global.fetch = jest.fn().mockImplementation( () => {
            return Promise.resolve({ ok: true })
        });

        const dispatch = jest.fn();
        return actions.contactWishlistUser(mockUser,mockId)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/lists/wishlist/contact/${mockId}`, expectedHeaders);
            expect(dispatch).toHaveBeenCalledWith(actions.contactWishlistUserSuccess(mockUser, mockId));
        });
    });
});

describe('changePage', () => {
    it('Should return the action', () => {
        const currentPage = 'test page';
        const action = actions.changePage(currentPage);
        expect(action.type).toEqual(actions.CHANGE_PAGE);
        expect(action.currentPage).toEqual(currentPage);
    });
});

describe('toggleEditListing', () => {
    it('Should return the action', () => {
        const listingId = 'id123';
        const action = actions.toggleEditListing(listingId);
        expect(action.type).toEqual(actions.TOGGLE_EDIT_LISTING);
        expect(action.listingId).toEqual(listingId);
    });
});

describe('changeAddListingStatus', () => {
    it('Should return the action', () => {
        const action = actions.changeAddListingStatus();
        expect(action.type).toEqual(actions.CHANGE_ADD_LISTING_STATUS);
    });
});

describe('toggleEditWishlist', () => {
    it('Should return the action', () => {
        const itemId = 'id123';
        const action = actions.toggleEditWishlist(itemId);
        expect(action.type).toEqual(actions.TOGGLE_EDIT_WISHLIST);
        expect(action.itemId).toEqual(itemId);
    });
});

describe('changeWishlistStatus', () => {
    it('Should return the action', () => {
        const action = actions.changeWishlistStatus();
        expect(action.type).toEqual(actions.CHANGE_WISHLIST_STATUS);
    });
});


describe('toggleZipEntry', () => {
    it('Should return the action', () => {
        const action = actions.toggleZipEntry();
        expect(action.type).toEqual(actions.TOGGLE_ZIP_ENTRY);
    });
});