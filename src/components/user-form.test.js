import React from 'react';
import {shallow} from 'enzyme';

import {UserForm} from './user-form';

describe('<UserForm />', () => {
    let submitting, touched, error, callback;
    const testUser = 'user123';
    const testPass = 'pass456';
    beforeEach(() => {
        submitting = false;
		touched = false;
		error = null;
        callback = jest.fn();
    })

    const buildSubject = () => {
        const props = {
            submitting,
            handleSubmit: callback,
            fields: {
                username: {
                    value: testUser,
                    touched,
                    error
                },
                password: {
                    value: testPass,
                    touched,
                    error
                }
            }
        }
        return shallow(<UserForm {...props} />)
    }
    it('Renders without crashing', () => {
        buildSubject();
    });

    it('Should fire the login action when the form is submitted', () => {
        const wrapper = buildSubject();
        wrapper.find('form').simulate('submit');
        expect(callback).toHaveBeenCalled();
    });
});