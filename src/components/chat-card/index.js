import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Icon } from 'react-native-eva-icons';
import { gray, primary } from '../../assets/colors';
import FastImage from 'react-native-fast-image';
import defaultAvatar from '../../assets/images/defaultAvatar.png';
import { getUserData } from '../../helpers';
import { useSelector } from 'react-redux';
import { addChatToFavorite, removeChatFromFavorite } from '../../helpers/chat';

const ChatCard = ({ chatItem }) => {
    const { navigate } = useNavigation();
    const { currentUser } = useSelector(state => state.authReducer);
    const [userInfo, setUserInfo] = useState([]);
    const isUserOnline = false;
    const isGroup = chatItem.isGroup;
    const [isFavorited, setIsFavorited] = useState(chatItem?.favoritedBy?.includes(currentUser._id) ?? false);
    
    useEffect(() => {
        const fetchUser = async function fetchUser() {
            if (chatItem.isGroup === false) {
                const user = await getUserData(chatItem.members[0] === currentUser._id ? chatItem.members[1] : chatItem.members[0]);
                setUserInfo(user);
            } else {
                const chatMembers = chatItem.members.map(member => member);
                const getMembersData = await Promise.all(chatMembers.map(async member => {
                    const user = await getUserData(member);
                    return user;
                }
                ));
                setUserInfo(getMembersData);
            }
        }
        fetchUser();
    }, [chatItem]);

    const enterChat = () => navigate('ChatScreen', { chatId: chatItem._id, userInfo });

    const addFavorite = () => {
        if (!isFavorited) {
            addChatToFavorite(chatItem._id, currentUser._id)
                .then(() => setIsFavorited(true))
                .catch(err => console.log(err));
        } else {
            removeChatFromFavorite(chatItem._id, currentUser._id)
                .then(() => setIsFavorited(false))
                .catch(err => console.log(err));
        }
    }

    return (
        <Pressable
            style={styles.container}
            onPress={enterChat}
        >
            <View style={styles.avatarContainer}>
                <FastImage
                    source={userInfo.image && !isGroup ? { uri: userInfo.image } : defaultAvatar}
                    style={styles.avatar}
                    resizeMode="cover"
                />
                {isUserOnline && <View style={styles.onlineStatus} />}
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{!isGroup ? userInfo.name || "Loading..." : chatItem.groupName || "Loading..."}</Text>
                <Text style={styles.msg}>{chatItem.lastMessage}</Text>
            </View>
            <View style={styles.dateContainer}>
                <Text style={styles.time}>{chatItem?.lastUpdate ? moment.unix(chatItem.lastUpdate).fromNow() : 'Now'}</Text>
                <Icon onPress={addFavorite} name="star" width={24} height={24} fill={isFavorited ? primary : gray} />
            </View>
        </Pressable>
    )
}

export default ChatCard;