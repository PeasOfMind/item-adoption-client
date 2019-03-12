import React from 'react';
import {shallow} from 'enzyme';

import AddListingForm from './add-listing-form';

describe('<AddListingForm />', () => {
    it('Renders without crashing', () => {
        shallow(<AddListingForm />);
    });
});