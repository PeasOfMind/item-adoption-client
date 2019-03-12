import React from 'react';
import {shallow} from 'enzyme';

import ListingForm from './listing-form';

describe('<ListingForm />', () => {
    it('Renders without crashing', () => {
        shallow(<ListingForm />);
    });
});