import * as actions from './auth';
import {API_BASE_URL} from '../config';
import { changePage } from '.';

describe('setAuthToken', () => {
    it('Should return the action', () => {
        const authToken = 'auth123';
        const action = actions.setAuthToken(authToken);
        expect(action.type).toEqual(actions.SET_AUTH_TOKEN);
        expect(action.authToken).toEqual(authToken);
    });
});

describe('clearAuth', () => {
    it('Should return the action', () => {
        const action = actions.clearAuth();
        expect(action.type).toEqual(actions.CLEAR_AUTH);
    });
});

describe('authRequest', () => {
    it('Should return the action', () => {
        const action = actions.authRequest();
        expect(action.type).toEqual(actions.AUTH_REQUEST);
    });
});

describe('authSuccess', () => {
    it('Should return the action', () => {
        const currentUser = 'testUser123'
        const userId = 'id456'
        const action = actions.authSuccess(currentUser, userId);
        expect(action.type).toEqual(actions.AUTH_SUCCESS);
        expect(action.currentUser).toEqual(currentUser);
        expect(action.userId).toEqual(userId);
    });
});

describe('authError', () => {
    it('Should return the action', () => {
        const error = 'some error';
        const action = actions.authError(error);
        expect(action.type).toEqual(actions.AUTH_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('registerUser', () => {
    it('should dispatch changePage', () => {
        const mockRegisterData = {username: 'testUser', password: 'test123'};
        const expectedHeaders = {
            "body": "{\"username\":\"testUser\",\"password\":\"test123\"}", 
            "headers": {"Content-Type": "application/json; charset=utf-8"}, 
            "method": "POST", 
            "mode": "cors"
        }

        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: true,
                json() {
                    return {
                        username: mockRegisterData.username,
                        authToken: 'mockAuth123',
                        id: 'id456'
                    }
                }
            });
        });

        const dispatch = jest.fn();
        return actions.registerUser(mockRegisterData)(dispatch).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/users`, expectedHeaders);
            expect(dispatch).toHaveBeenCalledWith(changePage('dashboard'));
        });

    });
});

describe('login', () => {
    it('should dispatch changePage', () => {
        const mockLoginData = {username: 'testUser', password: 'test123'};
        const expectedHeaders = {
            "body": "{\"username\":\"testUser\",\"password\":\"test123\"}", 
            "headers": {"Content-Type": "application/json; charset=utf-8"}, 
            "method": "POST"
        }

        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: true,
                json() {
                    return {
                        username: mockLoginData.username,
                        authToken: 'mockAuth123',
                        id: 'id456'
                    }
                }
            });
        });

        const dispatch = jest.fn();
        return actions.login(mockLoginData)(dispatch).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/login`, expectedHeaders);
            expect(dispatch).toHaveBeenCalledWith(changePage('dashboard'));
        });

    });
});

describe('refreshAuthToken', () => {
    it('should call the refresh endpoint', () => {
        const authToken = 'mockAuth123';
        const expectedHeaders = {
            "headers": {"Authorization": `Bearer ${authToken}`},
            "method": "POST"
        }

        const getState = () => ({auth: {authToken}})

        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: true,
                json() {
                    return {
                        username: 'testUser',
                        authToken,
                        id: 'id456'
                    }
                }
            });
        });

        const dispatch = jest.fn();
        return actions.refreshAuthToken()(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/refresh`, expectedHeaders);
        });

    });
});

describe('fetchUserInfoSuccess', () => {
    it('Should return the action', () => {
        const userInfo = {zipcode: '12345', email: 'test@test.test'};
        const action = actions.fetchUserInfoSuccess(userInfo);
        expect(action.type).toEqual(actions.FETCH_USER_INFO_SUCCESS);
        expect(action.zipcode).toEqual(userInfo.zipcode);
        expect(action.email).toEqual(userInfo.email);
    });
});

describe('fetchUserInfoError', () => {
    it('Should return the action', () => {
        const error = 'some error';
        const action = actions.fetchUserInfoError(error);
        expect(action.type).toEqual(actions.FETCH_USER_INFO_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('fetchUserInfo', () => {
    it('should dispatch fetchUserInfoSuccess', () => {
        const authToken = 'mockAuth123';
        const userId = 'testUser123';
        const mockUserInfo = {zipcode: '12345', email: 'test@test.test'};
        const expectedHeaders = {
            "headers": {"Authorization": `Bearer ${authToken}`},
            "method": "GET"
        }

        const getState = () => ({auth: {authToken, userId}})

        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: true,
                json() {
                    return mockUserInfo
                }
            });
        });

        const dispatch = jest.fn();
        actions.fetchUserInfo()(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/users/${userId}`, expectedHeaders);
        });
    });
});

describe('updateUserInfoSuccess', () => {
    it('Should return the action', () => {
        const action = actions.updateUserInfoSuccess();
        expect(action.type).toEqual(actions.UPDATE_USER_INFO_SUCCESS);
    });
});

describe('updateUserInfoError', () => {
    it('Should return the action', () => {
        const error = 'some error';
        const action = actions.updateUserInfoError(error);
        expect(action.type).toEqual(actions.UPDATE_USER_INFO_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('updateUserInfo', () => {
    it('should dispatch updateUserInfoSuccess', () => {
        const authToken = 'mockAuth123';
        const userId = 'testUser123';
        const mockUpdateData = {userId, zipcode: '12345', email: 'test@test.test'};
        const expectedHeaders = {
            "body": "{\"userId\":\"testUser123\",\"zipcode\":\"12345\",\"email\":\"test@test.test\"}",
            "headers": {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${authToken}`},
            "method": "PUT"
        }

        const getState = () => ({auth: {authToken, userId}})

        global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                ok: true
            });
        });

        const dispatch = jest.fn();
        return actions.updateUserInfo(mockUpdateData)(dispatch, getState).then(() => {
            expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/users/${userId}`, expectedHeaders);
        });
    });
});

describe('toggleUserEdit', () => {
    it('Should return the action', () => {
        const action = actions.toggleUserEdit();
        expect(action.type).toEqual(actions.TOGGLE_USER_EDIT);
    });
});