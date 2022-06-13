import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './style';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import NoAvatar from '../../assets/images/defaultAvatar.png';
import FastImage from 'react-native-fast-image';
import { getUserData } from '../../helpers';

const MessageBubble = ({ text, date, position, myAvatar, sender }) => {
    const navigation = useNavigation();
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async function fetchUser() {
            const getUserInfo = await getUserData(sender);
            setUser(getUserInfo);
        }
        fetchUser();
    }, [user]);

    const UserBubble = () => (
        <View style={styles.userMessageContainer}>
            <Pressable
                onPress={() => navigation.navigate('UserProfile', { user })}
                style={styles.nameContainer}
            >
                <FastImage
                    style={styles.avatar}
                    source={user.image !== "" ? { uri: user.image } : NoAvatar}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Text style={styles.name}>{user.name}</Text>
            </Pressable>
            <View style={styles.userMessageRight}>
                <Text style={styles.userMessageText}>{text}</Text>
            </View>
            <Text style={styles.dateRight}>{moment.unix(date).format('HH:mm')}</Text>
        </View >
    );

    const MyBubble = () => (
        <View style={styles.myMessageContainer}>
            <View style={styles.nameContainer}>
                <Text style={styles.myName}>{user.name}</Text>
                <FastImage
                    style={styles.avatar}
                    source={myAvatar !== "" ? { uri: myAvatar } : NoAvatar}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
            <View style={styles.myMessageLeft}>
                <Text style={styles.myMessageText}>{text}</Text>
            </View>
            <Text style={styles.dateLeft}>{moment.unix(date).format('HH:mm')}</Text>
        </View>
    );

    if (position === "LEFT") return <UserBubble />

    return <MyBubble />
}

export default MessageBubble;