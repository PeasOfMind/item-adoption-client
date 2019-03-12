import React from 'react';
import {shallow} from 'enzyme';

import OtherWishlists from './other-wishlists';

describe('<OtherWishlists />', () => {
    it('Renders without crashing', () => {
        shallow(<OtherWishlists />);
    });
});