import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { BASE_URL } from '@env';
import storage from '@react-native-firebase/storage';

async function changeProfileImage(userId) {
    try {
        const picker = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
            selectionLimit: 1
        });

        const response = await axios.post(`${BASE_URL}/user/uploadAvatar`, {
            image: picker.data,
            userId
        });
        return response;
    } catch (error) {
        return error;
    }
}

const saveMediaToStorage = (media, path) => new Promise((resolve, reject) => {
    try {
        const fileRef = storage().ref().child(path);

        fetch(media)
            .then(res => res.blob())
            .then(blob => {
                fileRef.put(blob).then(() => {
                    fileRef.getDownloadURL().then(url => {
                        resolve(url);
                    }).catch(err => {
                        reject(err);
                    })
                }
                ).catch(err => {
                    reject(err);
                })
            }).catch(err => {
                reject(err);
            })

    } catch (error) {
        console.log('save media error', error);
        reject(error);
    }

})

async function getUserData(userId) {
    try {
        const response = await axios.get(`${BASE_URL}/auth/getUserData?id=${userId}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

async function checkUsername(username) {
    try {
        const response = await axios.get(`${BASE_URL}/auth/checkUsername?username=${username}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

async function getFollowings(userId) {
    try {
        const response = await axios.get(`${BASE_URL}/user/getFollowings?id=${userId}`);
        if (response.status === 200) {
            return response.data.followings;
        } else {
            return [];
        }
    } catch (error) {
        return error;
    }
}


function intlFormat(num) {
    return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
}

function makeNumbersFriendly(num) {
    if (num >= 1000000)
        return intlFormat(num / 1000000) + 'M';
    if (num >= 1000)
        return intlFormat(num / 1000) + 'k';
    return intlFormat(num);
}

async function addComment({ userId, postId, myUserId, comment, addCommentToCommentList }) {
    try {
        const response = await axios.put(`${BASE_URL}/posts/addComment`, { userId, postId, myUserId, comment });
        addCommentToCommentList(response.data.comment);
        return response;
    } catch (error) {
        return error;
    }
}

async function getComments({ userId, postId, setCommentList }) {
    try {
        const response = await axios.get(`${BASE_URL}/posts/getPostComments?userId=${userId}&postId=${postId}`);
        if (response.status === 200) {
            setCommentList(response.data.comments);
        } else {
            setCommentList([]);
        }
    } catch (error) {
        return error;
    }
}

export {
    changeProfileImage,
    getUserData,
    checkUsername,
    getFollowings,
    makeNumbersFriendly,
    addComment,
    getComments,
    saveMediaToStorage
};