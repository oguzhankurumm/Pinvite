import React from 'react';
import { Text, Pressable } from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import { gradient2, gradient3 } from '../../assets/colors';

const BorderedButton = ({ title, onPress, styleProps }) => {
    return (
        <Pressable onPress={onPress}>
            <LinearGradient
                colors={[gradient2, gradient3]}
                start={{ x: 0, y: 1 }}
                style={[styles.container, { ...styleProps }]}
                end={{ x: 1, y: 1 }}
            >
                <Text style={styles.text}>{title}</Text>
            </LinearGradient>
        </Pressable>
    )
}

export default BorderedButton;