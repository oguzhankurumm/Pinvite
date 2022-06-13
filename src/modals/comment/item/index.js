import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import FastImage from 'react-native-fast-image';
import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import moment from 'moment';

const CommentItem = ({ item }) => {
    const userAvatar = item.user.image ? { uri: item.user.image } : defaultAvatar;
    const time = moment.unix(item.createdAt).fromNow(true);

    return (
        <View style={styles.container}>
            <FastImage
                style={styles.avatar}
                source={userAvatar}
                resizeMode="cover"
            />
            <View style={styles.containerText}>
                <Text style={styles.name}>{item.user.name}</Text>
                <Text style={styles.comment}>{item.comment}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>
        </View>
    )
};

export default CommentItem;