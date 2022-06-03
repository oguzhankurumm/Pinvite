import axios from 'axios';
import {
    GET_MY_POSTS_START,
    GET_MY_POSTS_SUCCESS,
    GET_MY_POSTS_FAILED,
    FOLLOW_USER_START,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAILED,
    UNFOLLOW_USER_START,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_FAILED,
    GET_FOLLOWERS_START,
    GET_FOLLOWERS_SUCCESS,
    GET_FOLLOWERS_FAILED,
    GET_FOLLOWINGS_START,
    GET_FOLLOWINGS_SUCCESS,
    GET_FOLLOWINGS_FAILED,
    SET_FOLLOWINGS,
    GET_MOST_FOLLOWED_USERS_START,
    GET_MOST_FOLLOWED_USERS_SUCCESS,
    GET_MOST_FOLLOWED_USERS_FAILED
} from '../constants/user';
import { BASE_URL } from '@env'

export const getUserPosts = userId => async dispatch => {
    try {
        dispatch({ type: GET_MY_POSTS_START });
        const response = await axios.get(`${BASE_URL}/user/getUserPosts?id=${userId}`);
        if (response.status === 200) {
            dispatch({ type: GET_MY_POSTS_SUCCESS, posts: response.data.posts });
        } else {
            dispatch({ type: GET_MY_POSTS_FAILED, message: response.data.message });
        }
    } catch (error) {
        dispatch({ type: GET_MY_POSTS_FAILED, message: error });
    }
};

export const getFollowers = userId => async dispatch => {
    try {
        dispatch({ type: GET_FOLLOWERS_START });
        const response = await axios.get(`${BASE_URL}/user/getFollowers?id=${userId}`);
        if (response.status === 200) {
            dispatch({ type: GET_FOLLOWERS_SUCCESS, followers: response.data.followers });
        } else {
            dispatch({ type: GET_FOLLOWERS_FAILED, message: response.data.message });
        }
    } catch (error) {
        dispatch({ type: GET_FOLLOWERS_FAILED, message: error });
    }
};

export const getFollowings = userId => async dispatch => {
    try {
        dispatch({ type: GET_FOLLOWINGS_START });
        const response = await axios.get(`${BASE_URL}/user/getFollowings?id=${userId}`);
        if (response.status === 200) {
            dispatch({ type: GET_FOLLOWINGS_SUCCESS, followings: response.data.followings });
        } else {
            dispatch({ type: GET_FOLLOWINGS_FAILED, message: response.data.message });
        }
    } catch (error) {
        dispatch({ type: GET_FOLLOWINGS_FAILED, message: error });
    }
};

export const setFollowings = followings => async dispatch => {
    dispatch({ type: SET_FOLLOWINGS, followings });
};

export const followUser = ({ userId, id }) => async dispatch => {
    try {
        await dispatch({ type: FOLLOW_USER_START });
        const response = await axios.put(`${BASE_URL}/user/followUser?id=${id}&userId=${userId}`);
        if (response.status === 200) {
            dispatch({ type: FOLLOW_USER_SUCCESS, user: response.data.user });
        } else {
            dispatch({ type: FOLLOW_USER_FAILED, message: 'Error while following user' });
        }
    } catch (error) {
        console.log('hata:', error)
        dispatch({ type: FOLLOW_USER_FAILED, message: error.message });
    }
}

export const unfollowUser = ({ userId, id }) => async dispatch => {
    try {
        await dispatch({ type: UNFOLLOW_USER_START });
        const response = await axios.delete(`${BASE_URL}/user/unfollowUser?id=${id}&userId=${userId}`);
        console.log('status ok', response)
        if (response.status === 200) {
            dispatch({ type: UNFOLLOW_USER_SUCCESS, selectedId: id });
        } else {
            dispatch({ type: UNFOLLOW_USER_FAILED, message: 'Error while unfollowing user' });
        }
    } catch (error) {
        console.log('hata:', error)
        dispatch({ type: UNFOLLOW_USER_FAILED, message: error.message });
    }
}

export const getMostFollowedUsers = () => async dispatch => {
    try {
        dispatch({ type: GET_MOST_FOLLOWED_USERS_START });
        const response = await axios.get(`${BASE_URL}/user/getMostFollowedUsers`);
        if (response.status === 200) {
            dispatch({ type: GET_MOST_FOLLOWED_USERS_SUCCESS, mostFollowedUsers: response.data.users });
        } else {
            dispatch({ type: GET_MOST_FOLLOWED_USERS_FAILED, message: response.data.message });
        }
    } catch (error) {
        dispatch({ type: GET_MOST_FOLLOWED_USERS_FAILED, message: error.message });
    }
}
