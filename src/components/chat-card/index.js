import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Icon } from 'react-native-eva-icons';
import { gray } from '../../assets/colors';
import { Divider } from 'react-native-paper';

const ChatCard = ({ chatItem }) => {
    const { navigate } = useNavigation();
    const isUserOnline = true;

    const enterChat = () => navigate('Chat', { chatItem, title: chatItem.name });

    return (
        <Pressable
            style={styles.container}
            onPress={enterChat}
        >
            <View style={styles.subContainer}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: chatItem.userAvatar }}
                        style={styles.avatar}
                    />
                    {isUserOnline && <View style={styles.onlineStatus} />}
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>{chatItem.name}</Text>
                    <Text style={styles.msg}>{chatItem.lastMessage}</Text>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.time}>{moment(chatItem.lastMessageDate).format('HH:mm')}</Text>
                    <Icon name="star" width={24} height={24} fill={gray} />
                </View>
            </View>
            <Divider style={styles.divider} />
        </Pressable>
    )
}

export default ChatCard;