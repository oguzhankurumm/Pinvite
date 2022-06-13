import { firebase } from "@react-native-firebase/firestore"
import moment from "moment";

export const chatsListener = (listener, userId) => {
    firebase.firestore()
        .collection('chats')
        .where('members', 'array-contains', userId)
        .orderBy('lastUpdate', 'desc')
        .onSnapshot(listener);
}

export const messagesListener = (listener, chatId) => {
    firebase.firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot(listener);
}

export const sendMessage = (chatId, message, userId) => {
    firebase.firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
            sender: userId,
            text: message,
            createdAt: moment().unix()
        })
    firebase.firestore()
        .collection('chats')
        .doc(chatId)
        .update({
            lastUpdate: moment().unix(),
            lastMessage: message
        })
}

export const createChat = (contactId, userId) => new Promise((resolve, reject) => {
    firebase.firestore()
        .collection('chats')
        .add({
            members: [contactId, userId],
            lastUpdate: moment().unix(),
            createdAt: moment().unix(),
            lastMessage: 'Send a first message',
            isGroup: false
        })
        .then(resolve)
        .catch(reject)
});

export const createGroupChat = (members, userId) => new Promise((resolve, reject) => {
    firebase.firestore()
        .collection('chats')
        .add({
            members: [userId, ...members],
            lastUpdate: moment().unix(),
            createdAt: moment().unix(),
            lastMessage: 'Send a first message',
            isGroup: true,
            groupName: `Group${moment().unix()}`
        })
        .then(resolve)
        .catch(reject)
});

export const addChatToFavorite = (chatId, userId) => new Promise((resolve, reject) => {
    firebase.firestore()
        .collection('chats')
        .doc(chatId)
        .update({
            favoritedBy: firebase.firestore.FieldValue.arrayUnion(userId)
        })
        .then(resolve)
        .catch(reject)
});

export const removeChatFromFavorite = (chatId, userId) => new Promise((resolve, reject) => {
    firebase.firestore()
        .collection('chats')
        .doc(chatId)
        .update({
            favoritedBy: firebase.firestore.FieldValue.arrayRemove(userId)
        })
        .then(resolve)
        .catch(reject)
});

export const deleteChatForMe = (chatId, userId) => new Promise((resolve, reject) => {
    firebase.firestore()
        .collection('chats')
        .doc(chatId)
        .update({
            members: firebase.firestore.FieldValue.arrayRemove(userId)
        })
        .then(resolve)
        .catch(reject)
});