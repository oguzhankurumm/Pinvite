import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, Pressable } from 'react-native';
import styles from './style';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import defaultAvatar from '../../assets/images/defaultAvatar.png';
import { Icon } from 'react-native-eva-icons';
import { primary } from '../../assets/colors';
import { addComment, getComments } from '../../helpers';
import CommentItem from './item';

const CommentModal = ({ post }) => {
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState('');
    const currentUser = useSelector(state => state.authReducer.currentUser);
    const userAvatar = currentUser.image ? { uri: currentUser.image } : defaultAvatar;

    const addCommentToCommentList = (comment) => {
        setCommentList([...commentList, comment]);
    }

    const handleCommentSend = () => {
        if (comment.length == 0) return;
        addComment({ postId: post._id, myUserId: currentUser._id, comment, userId: post.userId, addCommentToCommentList });
        setComment('');
    }
    useEffect(() => {
        getComments({ postId: post._id, userId: post.userId, setCommentList });
    }, [])

    const renderItem = ({ item }) => {
        return <CommentItem key={item._id} item={item} />
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={commentList}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
            <View style={styles.containerInput}>
                <FastImage
                    style={styles.avatar}
                    source={userAvatar}
                    resizeMode="cover"
                />
                <TextInput
                    value={comment}
                    onChangeText={setComment}
                    style={styles.input}
                    placeholder="Write a comment..."
                    returnKeyType="send"
                    onSubmitEditing={handleCommentSend}
                />
                <Pressable onPress={handleCommentSend}>
                    <Icon name="arrow-circle-right" width={34} height={34} fill={primary} />
                </Pressable>
            </View>
        </View>
    )
};

export default CommentModal;