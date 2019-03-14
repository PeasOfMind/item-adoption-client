import * as redActions from './index';
import {API_BASE_URL} from '../config';

describe('fetchListings', () => {
    it('Sould dispatch fetchListingsSuccess', () => {
        const resListings = {
            listings: []
        };

        global.fetch = jest.fn().mockImplementation( () => {
            Promise.resolve({
                ok: true,
                json() {
                    return resListings;
                }
            })
        });

        const dispatch = jest.fn();
        return redActions.fetchListings()(dispatch).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/lists/listings`);
            expect(dispatch).toHaveBeenCalledWith(redActions.fetchListingsSuccess(resListings));
        });

    });
})