import React from 'react';
import {shallow} from 'enzyme';

import WishList from './wishlist';

describe('<WishList />', () => {
    it('Renders without crashing', () => {
        shallow(<WishList />);
    });
});