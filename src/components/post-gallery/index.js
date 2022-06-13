import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styles from './style';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

export const PostGallery = ({ post }) => {
    const navigation = useNavigation();
    return (
        <TouchableWithoutFeedback style={styles.container} onPress={() => navigation.navigate('PostSinglePage', { post })}>
            <FastImage
                source={{ uri: post.type === "image" ? post.media : post.thumbnail }}
                style={styles.image}
                resizeMode="cover"
            />
        </TouchableWithoutFeedback>
    )
};

export default PostGallery;