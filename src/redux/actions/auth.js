import axios from 'axios';
import {
    USER_STATE_CHANGE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    CHANGE_PROFILE_PICTURE,
    DELETE_ACCOUNT_START,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_FAILED,
    UPDATE_PROFILE_START,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILED,
    UPDATE_LOCATION_START,
    UPDATE_LOCATION_SUCCESS,
    UPDATE_LOCATION_FAILED,
    CHECK_REGISTER_INFO_START,
    CHECK_REGISTER_INFO_SUCCESS,
    CHECK_REGISTER_INFO_FAILED,
} from '../constants/auth';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData, getFollowings } from '../../helpers'
import { BASE_URL } from '@env'
import { getFollowers, getMostFollowedUsers, setFollowings } from './user';
import { getFollowingUserPosts, getUserPosts } from './posts';
import { RESET_CHATS } from '../constants/chat';
import { RESET_POSTS } from '../constants/posts';
import { RESET_FOLLOWINGS_AND_FOLLOWERS } from '../constants/user';

export const userAuthStateListener = () => async dispatch => {
    try {
        const currentUser = await AsyncStorage.getItem('@currentUser');
        if (currentUser !== null) {
            const currentUserObj = JSON.parse(currentUser);
            const { email, password } = currentUserObj;
            const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
            if (response.status !== 400) {
                const userId = response.data.user._id
                const userData = await getUserData(userId);
                const getFollowingsUsers = await getFollowings(userId);
                await dispatch(getFollowers(userId));
                if (getFollowingsUsers.length > 0) {
                    await dispatch(setFollowings(getFollowingsUsers));
                    await dispatch(getFollowingUserPosts(getFollowingsUsers, userId));
                }
                await dispatch(getMostFollowedUsers());
                await dispatch(getUserPosts(userId));
                await dispatch({ type: USER_STATE_CHANGE, currentUser: userData, loaded: true });
            } else {
                await dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true })
            }
        } else {
            await dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true })
        }
    } catch (error) {
        return dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true })
    }
}

export const loginWithEmailAndPassword = ({ email, password }) => async dispatch => {
    try {
        await dispatch({ type: LOGIN_START });
        const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
        const jsonValue = JSON.stringify({ email, password });
        await AsyncStorage.setItem('@currentUser', jsonValue);
        if (response.status === 200) {
            dispatch({ type: LOGIN_SUCCESS, currentUser: response.data.user, loaded: true })
        } else {
            dispatch({ type: LOGIN_FAILED, currentUser: null, message: 'User not found', loaded: true })
        }
    } catch (error) {
        dispatch({ type: LOGIN_FAILED, message: error });
    }
};


export const logout = () => async dispatch => {
    try {
        await dispatch({ type: LOGOUT_START });
        dispatch({ type: RESET_CHATS })
        dispatch({ type: RESET_POSTS })
        dispatch({ type: RESET_FOLLOWINGS_AND_FOLLOWERS })
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
        await auth().signOut();
        await dispatch({ type: LOGOUT_SUCCESS });
    }
    catch (error) {
        dispatch({ type: LOGOUT_FAILED, message: error.message });
    }
}

export const registerWithEmailAndPassword = ({ email, password, name, username }) => async dispatch => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, {
            email,
            password,
            name,
            username
        });
        if (response.status === 200) {
            await dispatch({ type: REGISTER_START });
            const jsonValue = JSON.stringify({ email: email, password: password });
            await AsyncStorage.setItem('@currentUser', jsonValue);
            dispatch({ type: REGISTER_SUCCESS, currentUser: response.data.user, loaded: true });
        } else {
            dispatch({ type: REGISTER_FAILED, message: response.data.message, loaded: true })
        }
    } catch (error) {
        console.log('error', error)
        dispatch({ type: REGISTER_FAILED, message: error.message });
    }
}

export const checkRegisterInfo = ({ email, password, name }) => async dispatch => {
    try {
        await dispatch({ type: CHECK_REGISTER_INFO_START });
        const response = await axios.post(`${BASE_URL}/auth/checkRegisterInfo`, {
            email,
            password,
            name
        });
        console.log('response', response)
        if (response.status === 200) {
            dispatch({ type: CHECK_REGISTER_INFO_SUCCESS, registerInfo: response.data.user, message: response.data.message, changeLoading: false });
        } else {
            dispatch({ type: CHECK_REGISTER_INFO_FAILED, message: response.data.message, changeLoading: false });
        }
    } catch (error) {
        console.log('hata', error)
        dispatch({ type: CHECK_REGISTER_INFO_FAILED, message: error.message, changeLoading: false });
    }
}

export const changeAvatar = avatar => async dispatch => {
    await dispatch({ type: CHANGE_PROFILE_PICTURE, avatar });
}

export const deleteAccount = userId => async dispatch => {
    try {
        await dispatch({ type: DELETE_ACCOUNT_START });
        const currentUser = await AsyncStorage.getItem('@currentUser');
        const currentUserObj = JSON.parse(currentUser);
        const { email, password } = currentUserObj;
        const response = await axios.post(`${BASE_URL}/auth/deleteAccount?id=${userId}`, { email, password });
        if (response.status === 200) {
            await dispatch({ type: DELETE_ACCOUNT_SUCCESS });
        } else {
            await dispatch({ type: DELETE_ACCOUNT_FAILED, message: 'Account can not be deleted. Please try again later.' });
        }
    } catch (error) {
        await dispatch({ type: DELETE_ACCOUNT_FAILED, message: 'Account can not be deleted. Please try again later.' });
    }
}

export const updateProfile = ({ data, userId }) => async dispatch => {
    try {
        await dispatch({ type: UPDATE_PROFILE_START });
        const response = await axios.put(`${BASE_URL}/auth/updateProfile?id=${userId}`, { data });
        if (response.status === 200) {
            await dispatch({ type: UPDATE_PROFILE_SUCCESS, currentUser: response.data.user, message: response.data.message });
        } else {
            await dispatch({ type: UPDATE_PROFILE_FAILED, message: 'Profile can not be updated. Please try again later.' });
        }
    } catch (error) {
        await dispatch({ type: UPDATE_PROFILE_FAILED, message: 'Profile can not be updated. Please try again later.' });
    }
}

export const updateCurrentLocation = ({ location, userId }) => async dispatch => {
    try {
        await dispatch({ type: UPDATE_LOCATION_START });
        const { latitude, longitude } = location;
        const response = await axios.put(`${BASE_URL}/auth/updateLocation?id=${userId}`, { latitude, longitude });
        if (response.status === 200) {
            await dispatch({ type: UPDATE_LOCATION_SUCCESS, location: response.data.location, message: response.data.message });
        } else {
            await dispatch({ type: UPDATE_LOCATION_FAILED, message: 'Location can not be updated. Please try again later.' });
        }
    } catch (error) {
        await dispatch({ type: UPDATE_LOCATION_FAILED, message: 'Location can not be updated. Please try again later.' });
    }
}