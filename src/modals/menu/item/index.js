import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { black } from '../../../assets/colors';
import styles from './style';

const MenuItem = ({ item }) => {
    return (
        <Pressable style={styles.container} onPress={item.onPress}>
            <Icon name={item.icon} width={18} height={18} fill={black} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>{item.name}</Text>
            </View>
        </Pressable>
    )
};

export default MenuItem;