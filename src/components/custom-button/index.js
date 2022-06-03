import React from 'react';
import { Text, Pressable } from 'react-native';
import { black, white } from '../../assets/colors';
import styles from './style';

const CustomButton = ({ title, onPress, isDark, styleProps }) => {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, { backgroundColor: isDark === true ? black : white, ...styleProps }]}
        >
            <Text style={[styles.text, { color: isDark === true ? white : black }]}>{title}</Text>
        </Pressable>
    )
}

export default CustomButton;