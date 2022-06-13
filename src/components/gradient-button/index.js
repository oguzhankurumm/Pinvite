import React from 'react';
import { Text, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { gradient1, gradient2 } from '../../assets/colors';
import styles from './style';

const GradientButton = ({ title, onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <LinearGradient
                colors={[gradient1, gradient2]}
                style={styles.container}
                start={{ x: -0.9, y: 0.2 }}
                end={{ x: 0.45, y: 1.0 }}
            >
                <Text style={styles.title}>{title}</Text>
            </LinearGradient>
        </Pressable>
    )
}

export default GradientButton;