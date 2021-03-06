import React from 'react';
import {shallow, mount} from 'enzyme';

import {ActiveListings} from './active-listings';

describe('<ActiveListings />', () => {
    let seedListings = [];
    beforeAll(() => {
        for (let i = 0; i < 4; i++) {
            seedListings.push({
                editing: false,
                expiresIn: `${i+3}`,
                zipcode: '10000',
                price: `${i*2}`,
                title: `Test listing ${i}`,
                description: `Test test test`,
                id: `abcde${i}`
            });
        }
    })

    it('Renders without crashing', () => {
        shallow(<ActiveListings itemListings={seedListings}/>);
    });

    it('Renders the listings', () => {
        const wrapper = mount(<ActiveListings itemListings={seedListings}/>);
        const listings = wrapper.find('.item-listing');
        expect(listings.length).toEqual(seedListings.length);
    });
});