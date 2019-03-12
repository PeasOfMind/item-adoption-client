import React from 'react';
import {shallow} from 'enzyme';

import UserForm from './user-form';

describe('<UserForm />', () => {
    it('Renders without crashing', () => {
        shallow(<UserForm />);
    });
});