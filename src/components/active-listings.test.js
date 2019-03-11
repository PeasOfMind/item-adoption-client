import React from 'react';
import {shallow, mount} from 'enzyme';

import ActiveListings from './active-listings';

describe('<ActiveListings />', () => {
    it('Renders without crashing', () => {
        shallow(<ActiveListings />);
    });
});