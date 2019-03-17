import {appReducer} from '.';
import {initialState} from '.';
import * as actions from '../actions';

describe('appReducer', () => {
    const generateMockWishlist = num => {
        let mockWishlist = [];
        for (let i = 0; i < num; i++) {
            mockWishlist.push({
                title: `Test wish item ${i}`,
                id: `abcde${i}`
            });
        }
        return mockWishlist;
    }

    const generateMockListings = num => {
        let mockListings = [];
        for (let i = 0; i < 4; i++) {
            mockListings.push({
                expiresIn: `${i+3}`,
                zipcode: '10000',
                price: `${i*2}`,
                title: `Test listing ${i}`,
                description: `Test test test`,
                id: `abcde${i}`
            });
        }
        return mockListings;
    }

    it('Should set the initial state when nothing is passed in', () => {
        const state = appReducer(undefined, {type: '__UNKNOWN'});
        expect(state).toEqual(initialState);
    });

    it('Should return the current state on an unknown action', () => {
        const currentState = {};
        const state = appReducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

    describe('fetchListingsSuccess', () => {
        it('Should update the state with listings', () => {
            let mockListings = [];
            for (let i = 0; i < 4; i++) {
                mockListings.push({
                    expiresIn: `${i+3}`,
                    zipcode: '10000',
                    price: `${i*2}`,
                    title: `Test listing ${i}`,
                    description: `Test test test`,
                    id: `abcde${i}`
                });
            }

            const state = appReducer(initialState, actions.fetchListingsSuccess(mockListings));
            expect(state.itemListings.length).toEqual(mockListings.length);
            //now compare one listing
            const listing = state.itemListings[0];
            const mockListing = mockListings[0];
            expect(listing.editing).toBe(mockListing.editing);
            expect(listing.expiresIn).toEqual(mockListing.expiresIn);
            expect(listing.zipcode).toEqual(mockListing.zipcode);
            expect(listing.price).toEqual(mockListing.price);
            expect(listing.title).toEqual(mockListing.title);
            expect(listing.description).toEqual(mockListing.description);
            expect(listing.id).toEqual(mockListing.id);
        });
    });

    describe('fetchListingsError', () => {
        it('Should set the listingsError in state', () => {
            const error = 'some error';
            const state = appReducer(initialState, actions.fetchListingsError(error));
            expect(state.listingsError).toEqual(error);
        });
    });

    describe('fetchWishlistSuccess', () => {
        it('Should update the state with the wishlist', () => {
            let mockWishlist = [];
            for (let i = 0; i < 4; i++) {
                mockWishlist.push({
                    title: `Test wish item ${i}`,
                    id: `abcde${i}`
                });
            }

            const state = appReducer(initialState, actions.fetchWishlistSuccess(mockWishlist));
            expect(state.wishlist.length).toEqual(mockWishlist.length);
            //now compare one wish item
            const wishItem = state.wishlist[0];
            const mockWishItem = mockWishlist[0];
            expect(wishItem.editing).toBe(mockWishItem.editing);
            expect(wishItem.title).toEqual(mockWishItem.title);
            expect(wishItem.id).toEqual(mockWishItem.id);
        });
    });

    describe('fetchWishlistError', () => {
        it('Should set the wishlistError in state', () => {
            const error = 'some error';
            const state = appReducer(initialState, actions.fetchWishlistError(error));
            expect(state.wishlistError).toEqual(error);
        });
    });

    describe('fetchOneListingSuccess', () => {
        it('Should update the one fetched listing in the itemListings array', () => {
            let oldListings = [];
            for (let i = 0; i < 4; i++) {
                oldListings.push({
                    expiresIn: `${i+3}`,
                    zipcode: '10000',
                    price: `${i*2}`,
                    title: `Test listing ${i}`,
                    description: `Test test test`,
                    id: `abcde${i}`
                });
            }

            //replace listing at index 2
            const index = 2;
            const fetchedListing = {
                expiresIn: `${index+3}`,
                zipcode: '10000',
                price: `${index * 2}`,
                title: `fetched test listing`,
                description: `Testing the one fetched test listing`,
                id: `abcde${index}`
            }

            const oldState = {itemListings: oldListings}
            const state = appReducer(oldState, actions.fetchOneListingSuccess(fetchedListing));
            //length of itemListings should stay the same
            expect(state.itemListings.length).toEqual(oldListings.length);
            //now compare the listing at the replaced index
            const listing = state.itemListings[index];
            expect(listing.editing).toBe(false);
            expect(listing.expiresIn).toEqual(fetchedListing.expiresIn);
            expect(listing.zipcode).toEqual(fetchedListing.zipcode);
            expect(listing.price).toEqual(fetchedListing.price);
            expect(listing.title).toEqual(fetchedListing.title);
            expect(listing.description).toEqual(fetchedListing.description);
            expect(listing.id).toEqual(fetchedListing.id);
            expect(listing.fetchError).toBe(null);
        });
    });

    describe('fetchOneListingError', () => {
        it('Should assign a fetch error to the specific listing in itemListings array', () => {
            let oldListings = [];
            for (let i = 0; i < 4; i++) {
                oldListings.push({
                    expiresIn: `${i+3}`,
                    zipcode: '10000',
                    price: `${i*2}`,
                    title: `Test listing ${i}`,
                    description: `Test test test`,
                    id: `abcde${i}`
                });
            }

            const index = 1;
            const fetchedListingId = `abcde${index}`;
            const error = 'some error';

            const oldState = {itemListings: oldListings}
            const state = appReducer(oldState, actions.fetchOneListingError(fetchedListingId, error));
            //length of itemListings should stay the same
            expect(state.itemListings.length).toEqual(oldListings.length);
            const listing = state.itemListings[index];
            expect(listing.fetchError).toBe(error);
        });
    });

    describe('fetchWishItemSuccess', () => {
        it('Should update the one fetched wish item in the wishlist array', () => {
            let oldWishlist = [];
            for (let i = 0; i < 4; i++) {
                oldWishlist.push({
                    title: `Test wish item ${i}`,
                    id: `abcde${i}`
                });
            }

            //replace wish item at index 2
            const index = 2;
            const fetchedWishItem = {
                title: `fetched test wish item`,
                id: `abcde${index}`
            }

            const oldState = {wishlist: oldWishlist}
            const state = appReducer(oldState, actions.fetchWishItemSuccess(fetchedWishItem));
            //length of wish item should stay the same
            expect(state.wishlist.length).toEqual(oldWishlist.length);
            //now compare the wish item at the replaced index
            const wishItem = state.wishlist[index];
            expect(wishItem.editing).toBe(false);
            expect(wishItem.title).toEqual(fetchedWishItem.title);
            expect(wishItem.id).toEqual(fetchedWishItem.id);
            expect(wishItem.fetchError).toBe(null);
        });
    });

    describe('fetchWishItemError', () => {
        it('Should assign a fetch error to the specific wish item in wishlist array', () => {
            let oldWishlist = [];
            for (let i = 0; i < 4; i++) {
                oldWishlist.push({
                    title: `Test wish item ${i}`,
                    id: `abcde${i}`
                });
            }

            const index = 1;
            const fetchedItemId = `abcde${index}`;
            const error = 'some error';

            const oldState = {wishlist: oldWishlist}
            const state = appReducer(oldState, actions.fetchWishItemError(fetchedItemId, error));
            //length of itemListings should stay the same
            expect(state.wishlist.length).toEqual(oldWishlist.length);
            const wishItem = state.wishlist[index];
            expect(wishItem.fetchError).toBe(error);
        });
    });

    describe('postListingSuccess', () => {
        it('Should add the new listing in the itemListings array', () => {
            let oldListings = [];
            for (let i = 0; i < 4; i++) {
                oldListings.push({
                    expiresIn: `${i+3}`,
                    zipcode: '10000',
                    price: `${i*2}`,
                    title: `Test listing ${i}`,
                    description: `Test test test`,
                    id: `abcde${i}`
                });
            }

            const newListing = {
                expiresIn: 5,
                zipcode: '10000',
                price: 60,
                title: `new test listing`,
                description: `info about new test listing`,
                id: `newTestId1`
            }

            const oldState = {itemListings: oldListings}
            const state = appReducer(oldState, actions.postListingSuccess(newListing));
            expect(state.addingListing).toBe(false);
            expect(state.postListingError).toBe(null);
            //now compare the listing at the last index
            const listing = state.itemListings[state.itemListings.length-1];
            expect(listing.editing).toBe(newListing.editing);
            expect(listing.expiresIn).toEqual(newListing.expiresIn);
            expect(listing.zipcode).toEqual(newListing.zipcode);
            expect(listing.price).toEqual(newListing.price);
            expect(listing.title).toEqual(newListing.title);
            expect(listing.description).toEqual(newListing.description);
            expect(listing.id).toEqual(newListing.id);
        });
    });

    describe('postListingError', () => {
        it('Should update state with a postListingError', () => {
            let oldListings = [];
            for (let i = 0; i < 4; i++) {
                oldListings.push({
                    expiresIn: `${i+3}`,
                    zipcode: '10000',
                    price: `${i*2}`,
                    title: `Test listing ${i}`,
                    description: `Test test test`,
                    id: `abcde${i}`
                });
            }

            const error = 'some error';
            const oldState = {itemListings: oldListings}
            const state = appReducer(oldState, actions.postListingError(error));
            expect(state.postListingError).toEqual(error);
        });
    });

    describe('postWishItemSuccess', () => {
        it('Should add the new wish item in the wishlist array', () => {
            let oldWishlist = [];
            for (let i = 0; i < 4; i++) {
                oldWishlist.push({
                    title: `Test wish item ${i}`,
                    id: `abcde${i}`
                });
            }

            const newWishItem = {
                title: `fetched test wish item`,
                id: `newTestId1`
            }

            const oldState = {wishlist: oldWishlist}
            const state = appReducer(oldState, actions.postWishItemSuccess(newWishItem));
            expect(state.addingWishItem).toBe(false);
            expect(state.postWishItemError).toBe(null);
            //now compare the wish item at the last index
            const wishItem = state.wishlist[state.wishlist.length-1];
            expect(wishItem.editing).toBe(newWishItem.editing);
            expect(wishItem.title).toEqual(newWishItem.title);
            expect(wishItem.id).toEqual(newWishItem.id);
        });
    });

    describe('postWishItemError', () => {
        it('Should update state with a postWishItemError', () => {
            let oldWishlist = [];
            for (let i = 0; i < 4; i++) {
                oldWishlist.push({
                    title: `Test wish item ${i}`,
                    id: `abcde${i}`
                });
            }

            const error = 'some error';
            const oldState = {wishlist: oldWishlist};
            const state = appReducer(oldState, actions.postWishItemError(error));
            expect(state.postWishItemError).toBe(error);
        });
    });

    describe('updateListingSuccess', () => {
        it('Should update the specified listing in the itemListings array', () => {
            let oldListings = [];
            for (let i = 0; i < 4; i++) {
                oldListings.push({
                    expiresIn: `${i+3}`,
                    zipcode: '10000',
                    price: `${i*2}`,
                    title: `Test listing ${i}`,
                    description: `Test test test`,
                    id: `abcde${i}`
                });
            }

            const updateIndex = 1;
            const listingId = `abcde${updateIndex}`;
            const oldState = {itemListings: oldListings};
            const state = appReducer(oldState, actions.updateListingSuccess(listingId));
            //now compare the listing at the specified index
            const listing = state.itemListings[updateIndex];
            expect(listing.updateError).toBe(null);
            expect(listing.id).toEqual(listingId);
        });
    });

    describe('updateListingError', () => {
        it('Should update state with a updateListingError', () => {
            let oldListings = [];
            for (let i = 0; i < 4; i++) {
                oldListings.push({
                    expiresIn: `${i+3}`,
                    zipcode: '10000',
                    price: `${i*2}`,
                    title: `Test listing ${i}`,
                    description: `Test test test`,
                    id: `abcde${i}`
                });
            }

            const updateIndex = 1;
            const listingId = `abcde${updateIndex}`;
            const error = 'some error';
            const oldState = {itemListings: oldListings};
            const state = appReducer(oldState, actions.updateListingError(listingId, error));
            //now compare the listing at the specified index
            const listing = state.itemListings[updateIndex];
            expect(listing.updateError).toEqual(error);
            expect(listing.id).toEqual(listingId);
        });
    });

    describe('updateWishItemSuccess', () => {
        it('Should update the specified wish item in the wishlist array', () => {
            let oldWishlist = [];
            for (let i = 0; i < 4; i++) {
                oldWishlist.push({
                    title: `Test wish item ${i}`,
                    id: `abcde${i}`
                });
            }

            const updateIndex = 1;
            const itemId = `abcde${updateIndex}`
            const oldState = {wishlist: oldWishlist};
            const state = appReducer(oldState, actions.updateWishItemSuccess(itemId));
            //now compare the wish item at the specified index
            const wishItem = state.wishlist[updateIndex];
            expect(wishItem.updateError).toBe(null);
            expect(wishItem.id).toEqual(itemId);
        });
    });

    describe('updateWishItemError', () => {
        it('Should update state with a updateWishItemError', () => {
            let oldWishlist = [];
            for (let i = 0; i < 4; i++) {
                oldWishlist.push({
                    title: `Test wish item ${i}`,
                    id: `abcde${i}`
                });
            }

            const updateIndex = 1;
            const itemId = `abcde${updateIndex}`
            const error = 'some error';
            const oldState = {wishlist: oldWishlist}
            const state = appReducer(oldState, actions.updateWishItemError(itemId, error));
            //now compare the listing at the specified index
            const wishItem = state.wishlist[updateIndex];
            expect(wishItem.updateError).toEqual(error);
            expect(wishItem.id).toEqual(itemId);
        });
    });

    describe('updateListingSuccess', () => {
        it('Should update the specified listing in the itemListings array', () => {
            let oldListings = [];
            for (let i = 0; i < 4; i++) {
                oldListings.push({
                    expiresIn: `${i+3}`,
                    zipcode: '10000',
                    price: `${i*2}`,
                    title: `Test listing ${i}`,
                    description: `Test test test`,
                    id: `abcde${i}`
                });
            }

            const updateIndex = 1;
            const listingId = `abcde${updateIndex}`
            const oldState = {itemListings: oldListings};
            const state = appReducer(oldState, actions.updateListingSuccess(listingId));
            //now compare the listing at the specified index
            const listing = state.itemListings[updateIndex];
            expect(listing.updateError).toBe(null);
            expect(listing.id).toEqual(listingId);
        });
    });

    describe('deleteListingError', () => {
        it('Should update specified listing with a deleteError', () => {
            let oldListings = [];
            for (let i = 0; i < 4; i++) {
                oldListings.push({
                    expiresIn: `${i+3}`,
                    zipcode: '10000',
                    price: `${i*2}`,
                    title: `Test listing ${i}`,
                    description: `Test test test`,
                    id: `abcde${i}`
                });
            }

            const deleteIndex = 1;
            const listingId = `abcde${deleteIndex}`
            const error = 'some error';
            const oldState = {itemListings: oldListings};
            const state = appReducer(oldState, actions.deleteListingError(listingId, error));
            //now compare the listing at the specified index
            const listing = state.itemListings[deleteIndex];
            expect(listing.deleteError).toEqual(error);
            expect(listing.id).toEqual(listingId);
        });
    });

    describe('deleteWishItemError', () => {
        it('Should update specified listing with a deleteError', () => {
            let oldWishlist = [];
            for (let i = 0; i < 4; i++) {
                oldWishlist.push({
                    title: `Test wish item ${i}`,
                    id: `abcde${i}`
                });
            }

            const deleteIndex = 1;
            const itemId = `abcde${deleteIndex}`
            const error = 'some error';
            const oldState = {wishlist: oldWishlist};
            const state = appReducer(oldState, actions.deleteWishItemError(itemId, error));
            //now compare the listing at the specified index
            const wishItem = state.wishlist[deleteIndex];
            expect(wishItem.deleteError).toEqual(error);
            expect(wishItem.id).toEqual(itemId);
        });
    });

    describe('fetchOtherListingsSuccess', () => {
        it('Should update state with otherListings', () => {
            let mockOtherListings = [];
            for (let i = 0; i < 4; i++) {
                mockOtherListings.push({
                    expiresIn: `${i+3}`,
                    zipcode: '10000',
                    price: `${i*2}`,
                    title: `Test listing ${i}`,
                    description: `Test test test`,
                    id: `abcde${i}`
                });
            }

            const state = appReducer(initialState, actions.fetchOtherListingsSuccess(mockOtherListings));
            expect(state.otherListings.length).toEqual(mockOtherListings.length);
            //now compare one listing
            const listing = state.otherListings[0];
            const mockListing = mockOtherListings[0];
            expect(listing.editing).toBe(mockListing.editing);
            expect(listing.expiresIn).toEqual(mockListing.expiresIn);
            expect(listing.zipcode).toEqual(mockListing.zipcode);
            expect(listing.price).toEqual(mockListing.price);
            expect(listing.title).toEqual(mockListing.title);
            expect(listing.description).toEqual(mockListing.description);
            expect(listing.id).toEqual(mockListing.id);
        });
    });

    describe('fetchOtherListingsError', () => {
        it('Should set the otherListingsError in state', () => {
            const error = 'some error';
            const state = appReducer(initialState, actions.fetchOtherListingsError(error));
            expect(state.otherListingsError).toEqual(error);
        });
    });

    describe('fetchOtherWishlistsSuccess', () => {
        it('Should update state with otherWishlists', () => {
            let mockOtherWishlists = {};
            for (let j = 0; j < 2; j++) {
                const username = `TestUser${j}`;
                mockOtherWishlists[username] = {
                    zipcode: `10000`,
                    userId: `${j}testId`,
                    wishlist: generateMockWishlist(2)
                }
            }

            const state = appReducer(initialState, actions.fetchOtherWishlistsSuccess(mockOtherWishlists));
            expect(state.otherWishlists).toMatchObject(mockOtherWishlists);
        });
    });

    describe('fetchOtherWishlistsError', () => {
        it('Should set the otherWishlistsError in state', () => {
            const error = 'some error';
            const state = appReducer(initialState, actions.fetchOtherWishlistsError(error));
            expect(state.otherWishlistsError).toEqual(error);
        });
    });

    describe('contactListingUserSuccess', () => {
        it('Should update contactSuccess to specified listing', () => {
            let mockOtherListings = [];
            for (let i = 0; i < 4; i++) {
                mockOtherListings.push({
                    expiresIn: `${i+3}`,
                    zipcode: '10000',
                    price: `${i*2}`,
                    title: `Test listing ${i}`,
                    description: `Test test test`,
                    id: `abcde${i}`
                });
            }

            const updateIndex = 1;
            const listingId = `abcde${updateIndex}`;
            const oldState = {otherListings: mockOtherListings};

            const state = appReducer(oldState, actions.contactListingUserSuccess(listingId));
            expect(state.otherListings.length).toEqual(mockOtherListings.length);
            //now check the updated listing
            const listing = state.otherListings[updateIndex];
            expect(listing.contactSuccess).toBe(true);
            expect(listing.contactError).toBe(null);
            expect(listing.id).toEqual(listingId);
        });
    });

    describe('contactListingUserError', () => {
        it('Should update contactError to specified listing', () => {
            let mockOtherListings = [];
            for (let i = 0; i < 4; i++) {
                mockOtherListings.push({
                    expiresIn: `${i+3}`,
                    zipcode: '10000',
                    price: `${i*2}`,
                    title: `Test listing ${i}`,
                    description: `Test test test`,
                    id: `abcde${i}`
                });
            }

            const updateIndex = 1;
            const listingId = `abcde${updateIndex}`;
            const oldState = {otherListings: mockOtherListings};

            const error = 'some error';
            const state = appReducer(oldState, actions.contactListingUserError(listingId, error));
            expect(state.otherListings.length).toEqual(mockOtherListings.length);
            //now check the updated listing
            const listing = state.otherListings[updateIndex];
            expect(listing.contactSuccess).toBe(null);
            expect(listing.contactError).toEqual(error);
            expect(listing.id).toEqual(listingId);
        });
    });

    describe('contactWishlistUserSuccess', () => {
        it('Should update contactSuccess to specified wish item', () => {
            let mockOtherWishlists = {};
            for (let j = 0; j < 2; j++) {
                const username = `TestUser${j}`;
                mockOtherWishlists[username] = {
                    zipcode: `10000`,
                    userId: `${j}testId`,
                    wishlist: generateMockWishlist(2)
                }
            }

            const updateIndex = 1;
            const itemId = `abcde${updateIndex}`;
            const user = `TestUser${updateIndex}`;
            const oldState = {otherWishlists: mockOtherWishlists};

            const error = 'some error';
            const state = appReducer(oldState, actions.contactWishlistUserSuccess(user, itemId, error));
            const updatedItem = state.otherWishlists[user].wishlist[updateIndex];
            //now check the updated wish item
            expect(updatedItem.id).toEqual(itemId);
            expect(updatedItem.contactSuccess).toBe(true);
            expect(updatedItem.contactError).toBe(null);
        });
    });

    describe('contactWishlistUserError', () => {
        it('Should update contactError to specified listing', () => {
            let mockOtherWishlists = {};
            for (let j = 0; j < 2; j++) {
                const username = `TestUser${j}`;
                mockOtherWishlists[username] = {
                    zipcode: `10000`,
                    userId: `${j}testId`,
                    wishlist: generateMockWishlist(2)
                }
            }

            const updateIndex = 1;
            const itemId = `abcde${updateIndex}`;
            const user = `TestUser${updateIndex}`;
            const oldState = {otherWishlists: mockOtherWishlists};

            const error = 'some error';
            const state = appReducer(oldState, actions.contactWishlistUserError(user, itemId, error));
            const updatedItem = state.otherWishlists[user].wishlist[updateIndex];
            //now check the updated wish item
            expect(updatedItem.id).toEqual(itemId);
            expect(updatedItem.contactSuccess).toBe(null);
            expect(updatedItem.contactError).toBe(error);
        });
    });

    describe('changePage', () => {
        it('Should set the current page heading type and navigation links', () => {
            const pageType = 'landing';
            const state = appReducer(initialState, actions.changePage(pageType));
            expect(state.currentPage).toEqual(pageType);
            expect(state.navLinks).toEqual(['Login', 'Signup']);
            expect(state.headingType).toEqual('landing-header');
        });
    });

    describe('toggleEditListing', () => {
        it('Should set the editing status of the specified listing to true', () => {
            const mockListings = generateMockListings(4);
            mockListings.forEach(listing => listing.editing = false);
            const updateIndex = 0;
            const listingId = `abcde${updateIndex}`;
            const oldState = {itemListings: mockListings};
            const state = appReducer(oldState, actions.toggleEditListing(listingId));
            const listing = state.itemListings[updateIndex];
            expect(listing.id).toEqual(listingId);
            expect(listing.editing).toBe(true);
        });
    });

    describe('changeAddListingStatus', () => {
        it('Should set the add listing status to true', () => {
            const oldState = {addingListing: false};
            const state = appReducer(oldState, actions.changeAddListingStatus());
            expect(state.addingListing).toBe(true);
        });
    });

    describe('toggleEditWishlist', () => {
        it('Should set the editing status of the specified wish item to true', () => {
            const mockWishlist = generateMockWishlist(4);
            mockWishlist.forEach(item => item.editing = false);
            const updateIndex = 0;
            const itemId = `abcde${updateIndex}`;
            const oldState = {wishlist: mockWishlist};
            const state = appReducer(oldState, actions.toggleEditWishlist(itemId));
            const item = state.wishlist[updateIndex];
            expect(item.id).toEqual(itemId);
            expect(item.editing).toBe(true);
        });
    });

    describe('changeWishlistStatus', () => {
        it('Should set the add wish item status to true', () => {
            const oldState = {addingWishItem: false};
            const state = appReducer(oldState, actions.changeWishlistStatus());
            expect(state.addingWishItem).toBe(true);
        });
    });

    describe('toggleZipEntry', () => {
        it('Should set the add listing zip status to true', () => {
            const oldState = {addingListingZip: false};
            const state = appReducer(oldState, actions.toggleZipEntry());
            expect(state.addingListingZip).toBe(true);
        });
    });

});