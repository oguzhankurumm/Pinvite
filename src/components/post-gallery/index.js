import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import styles from './style';

export const PostGallery = ({ post }) => {
    return (
        <TouchableWithoutFeedback style={styles.container}>
            <Image
                source={{ uri: post.media }}
                style={styles.image}
            />
        </TouchableWithoutFeedback>
    )
};

export default PostGallery;