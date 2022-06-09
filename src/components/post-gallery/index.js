import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import styles from './style';

export const PostGallery = ({ post }) => {
    return (
        <TouchableWithoutFeedback style={styles.container}>
            <Image
                source={{ uri: post.type === "image" ? post.media : post.thumbnail }}
                style={styles.image}
                resizeMode="cover"
            />
        </TouchableWithoutFeedback>
    )
};

export default PostGallery;