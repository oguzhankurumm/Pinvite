import axios from 'axios';
import {
    GET_FOLLOWINGS_USER_POSTS_START,
    GET_FOLLOWINGS_USER_POSTS_SUCCESS,
    GET_FOLLOWINGS_USER_POSTS_FAILED,
    GET_LOCAL_POSTS_START,
    GET_LOCAL_POSTS_SUCCESS,
    GET_LOCAL_POSTS_FAILED,
    GET_MY_POSTS_START,
    GET_MY_POSTS_SUCCESS,
    GET_MY_POSTS_FAILED,
    GET_SAVED_POSTS_START,
    GET_SAVED_POSTS_SUCCESS,
    GET_SAVED_POSTS_FAILED,
    UPLOAD_POST_START,
    UPLOAD_POST_SUCCESS,
    UPLOAD_POST_FAILED,
} from '../constants/posts';
import { BASE_URL } from '@env'
import { saveMediaToStorage } from '../../helpers';
import { uuidv4 } from 'react-native-compressor';

export const createPost = ({ data, userId }) => async dispatch => {
    const randomUid = uuidv4();
    try {
        dispatch({ type: UPLOAD_POST_START });
        const response = await saveMediaToStorage(data.media, `post/${userId}/${randomUid}`)
        const generateThumbnail = data.type === "video" ? await saveMediaToStorage(data.thumbnail, `post/${userId}/thumbnail`) : null;
        const saveToFirestore = await axios.post(`${BASE_URL}/posts/createPost`, {
            ...data,
            media: response,
            thumbnail: generateThumbnail,
            userId
        });
        if (saveToFirestore.status === 200) {
            dispatch({ type: UPLOAD_POST_SUCCESS, post: saveToFirestore.data.post });
        } else {
            dispatch({ type: UPLOAD_POST_FAILED, message: saveToFirestore.data.message });
        }
    } catch (error) {
        console.log('hata', error)
        dispatch({ type: UPLOAD_POST_FAILED, message: error.message });
    }
};



export const getUserPosts = userId => async dispatch => {
    try {
        dispatch({ type: GET_MY_POSTS_START });
        const response = await axios.get(`${BASE_URL}/posts/getUserPosts?id=${userId}`);
        if (response.status === 200) {
            dispatch({ type: GET_MY_POSTS_SUCCESS, posts: response.data.posts });
        } else {
            dispatch({ type: GET_MY_POSTS_FAILED, message: response.data.message });
        }
    } catch (error) {
        dispatch({ type: GET_MY_POSTS_FAILED, message: error });
    }
};

export const getFollowingUserPosts = (followingUsers, userId) => async dispatch => {
    try {
        dispatch({ type: GET_FOLLOWINGS_USER_POSTS_START });
        let formattedFollowingUsers = followingUsers.map(user => user._id);
        formattedFollowingUsers.push(userId);
        const response = await axios.post(`${BASE_URL}/posts/getFollowingUserPosts`, formattedFollowingUsers);
        if (response.status === 200) {
            dispatch({ type: GET_FOLLOWINGS_USER_POSTS_SUCCESS, followingUserPosts: response.data.posts });
        } else {
            dispatch({ type: GET_FOLLOWINGS_USER_POSTS_FAILED, message: response.data.message });
        }
    } catch (error) {
        dispatch({ type: GET_FOLLOWINGS_USER_POSTS_FAILED, message: error });
    }
};

export const getLocalPost = location => async dispatch => {
    try {
        dispatch({ type: GET_LOCAL_POSTS_START });
        const response = await axios.post(`${BASE_URL}/posts/getNearestPostsByLocation`, location);
        if (response.status === 200) {
            dispatch({ type: GET_LOCAL_POSTS_SUCCESS, localPosts: response.data.posts });
        } else {
            dispatch({ type: GET_LOCAL_POSTS_FAILED, message: response.data.message });
        }
    } catch (error) {
        console.log('get local error:', error);
        dispatch({ type: GET_LOCAL_POSTS_FAILED, message: error });
    }
};


export const likePost = ({ postId, userId, myUserId }) => async dispatch => {
    try {
        await axios.put(`${BASE_URL}/posts/likePost`, { postId, userId, myUserId });
    } catch (error) {
        console.log('like error:', error);
    }
}

export const unlikePost = ({ postId, userId, myUserId }) => async dispatch => {
    try {
        await axios.put(`${BASE_URL}/posts/unlikePost`, { postId, userId, myUserId });
    } catch (error) {
        console.log('unlike error:', error);
    }
}

export const getSavedPosts = userId => async dispatch => {
    try {
        dispatch({ type: GET_SAVED_POSTS_START });
        const response = await axios.get(`${BASE_URL}/posts/getSavedPosts?id=${userId}`);
        if (response.status === 200) {
            dispatch({ type: GET_SAVED_POSTS_SUCCESS, savedPosts: response.data.posts });
        } else {
            dispatch({ type: GET_SAVED_POSTS_FAILED, message: response.data.message });
        }
    } catch (error) {
        dispatch({ type: GET_SAVED_POSTS_FAILED, message: error });
    }
}

export const savePost = ({ postId, userId, myUserId }) => async dispatch => {
    try {
        await axios.put(`${BASE_URL}/posts/savePost`, { postId, userId, myUserId });
    } catch (error) {
        console.log('save error:', error);
    }
}

export const unsavePost = ({ postId, userId, myUserId }) => async dispatch => {
    try {
        await axios.put(`${BASE_URL}/posts/unsavePost`, { postId, userId, myUserId });
    } catch (error) {
        console.log('unsave error:', error);
    }
}