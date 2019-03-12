import React from 'react';
import {shallow} from 'enzyme';

import Nav from './nav';

describe('<Nav />', () => {
    it('Renders without crashing', () => {
        shallow(<Nav />);
    });
});