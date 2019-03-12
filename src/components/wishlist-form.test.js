import React from 'react';
import {shallow} from 'enzyme';

import WishlistForm from './wishlist-form';

describe('<WishlistForm />', () => {
    it('Renders without crashing', () => {
        shallow(<WishlistForm />);
    });
});