import authReducer from './auth';
import {initialState} from './auth';
import * as actions from '../actions/auth';

describe('authReducer', () => {

    it('Should set the initial state when nothing is passed in', () => {
        const state = authReducer(undefined, {type: '__UNKNOWN'});
        expect(state).toEqual(initialState);
    });

    it('Should return the current state on an unknown action', () => {
        const currentState = {};
        const state = authReducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

    describe('setAuthToken', () => {
        it('Should set the auth token and set loading to false', () => {
            const oldState = {loading: true, authToken: null};
            const mockAuth = 'mockAuth123';
            const state = authReducer(oldState, actions.setAuthToken(mockAuth));
            expect(state.loading).toEqual(false);
            expect(state.authToken).toEqual(mockAuth);
        });
    });

    describe('clearAuth', () => {
        it('Should reset all specific user information to null', () => {
            const oldState = {
                authToken: 'mockAuth123',
                currentUser: 'testUser123',
                userZip: '12345',
                userEmail: 'test@test.com',
                userId: 'test123'
            }
            const state = authReducer(oldState, actions.clearAuth());
            expect(state.authToken).toBe(null);
            expect(state.currentUser).toBe(null);
            expect(state.userZip).toBe(null);
            expect(state.userEmail).toBe(null);
            expect(state.userId).toBe(null);
        });
    });

    describe('authRequest', () => {
        it('Should set loading to true and loginError to null', () => {
            const oldState = {
                loading: false,
                loginError: 'some error'
            }
            const state = authReducer(oldState, actions.authRequest());
            expect(state.loading).toBe(true);
            expect(state.loginError).toBe(null);
        });
    });


    describe('authSuccess', () => {
        it('Should set the currentUser and userId and set loading and editing to false', () => {
            const oldState = {
                loading: true,
                currentUser: null,
                userId: null,
                editing: true
            }
            const currentUser = 'testUser123';
            const userId = 'test123';
            const state = authReducer(oldState, actions.authSuccess(currentUser, userId));
            expect(state.loading).toBe(false);
            expect(state.editing).toBe(false);
            expect(state.currentUser).toEqual(currentUser);
            expect(state.userId).toEqual(userId);
        });
    });

    describe('authError', () => {
        it('Should set an login error and set loading to false', () => {
            const oldState = {
                loginError: null,
                loading: true
            }
            const error = 'some error';
            const state = authReducer(oldState, actions.authError(error));
            expect(state.loading).toBe(false);
            expect(state.loginError).toEqual(error);
        });
    });

    describe('fetchUserInfoSuccess', () => {
        it('Should set userZip and userEmail', () => {
            const oldState = {
                userZip: null,
                userEmail: null,
                fetchZipError: 'some error'
            }
            const userInfo = {
                zipcode: '12345',
                email: 'test@test.com'
            }
            const state = authReducer(oldState, actions.fetchUserInfoSuccess(userInfo));
            expect(state.fetchZipError).toBe(null);
            expect(state.userZip).toEqual(userInfo.zipcode);
            expect(state.userEmail).toEqual(userInfo.email);
        });
    });

    describe('fetchUserInfoError', () => {
        it('Should set a fetch user info error', () => {
            const oldState = {
                fetchZipError: null
            }
            const error = 'some error';
            const state = authReducer(oldState, actions.fetchUserInfoError(error));
            expect(state.fetchZipError).toEqual(error);
        });
    });

    describe('updateUserInfoSuccess', () => {
        it('Should set the update user info error to null', () => {
            const oldState = {
                updateZipError: 'some error'
            }
            const state = authReducer(oldState, actions.updateUserInfoSuccess());
            expect(state.updateZipError).toBe(null);
        });
    });


    describe('updateUserInfoError', () => {
        it('Should set a update user info error', () => {
            const oldState = {
                updateZipError: null
            }
            const error = 'some error';
            const state = authReducer(oldState, actions.updateUserInfoError(error));
            expect(state.updateZipError).toEqual(error);
        });
    });

    describe('toggleUserEdit', () => {
        it('Should toggle the editing state', () => {
            const oldState = {editing: false}
            const state = authReducer(oldState, actions.toggleUserEdit());
            expect(state.editing).toBe(true);
        })
    })

});