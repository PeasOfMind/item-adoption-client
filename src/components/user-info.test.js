import React from 'react';
import {shallow} from 'enzyme';

import UserInfo from './user-info';

describe('<UserInfo />', () => {
    it('Renders without crashing', () => {
        shallow(<UserInfo />);
    });
});