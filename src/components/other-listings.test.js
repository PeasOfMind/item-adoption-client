import React from 'react';
import {shallow} from 'enzyme';

import OtherListings from './other-listings';

describe('<OtherListings />', () => {
    it('Renders without crashing', () => {
        shallow(<OtherListings />);
    });
});