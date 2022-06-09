import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { gray, primary } from '../../assets/colors';
import styles from './style';

export const MiniHeader = ({ onLeftPress, hideLeftButton, onRightPress, hideRightButton }) => {
    return (
        <View style={styles.container}>
            {!hideLeftButton ?
                <Pressable onPress={onLeftPress} style={styles.buttonContainer}>
                    <Icon name="arrow-ios-back-outline" width={18} height={18} fill={gray} />
                    <Text style={styles.leftText}>Back</Text>
                </Pressable>
                :
                <View />
            }
            {!hideRightButton ?
                <Pressable onPress={onRightPress} style={styles.buttonContainer}>
                    <Text style={styles.rightText}>Post</Text>
                    <Icon name="arrow-ios-forward-outline" width={18} height={18} fill={primary} />
                </Pressable>
                :
                <View />
            }
        </View>
    )
};

export default MiniHeader;