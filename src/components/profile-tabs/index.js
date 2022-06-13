import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './style';;

const ProfileTabs = ({ newRef, tabs }) => {
    const [initialPage, setInitialPage] = useState(0);

    const changeTab = item => {
        newRef?.current?.snapToItem(item.id);
        setInitialPage(item.id);
    }

    return (
        <View style={styles.container}>
            {tabs.map((item) => {
                return (
                    <Pressable
                        key={item.id}
                        style={[styles.tab, initialPage === item.id && styles.selected]}
                        onPress={() => changeTab(item)}
                    >
                        <Text style={[styles.tabText, initialPage === item.id && styles.selectedText]}>{item.title}</Text>
                    </Pressable>
                );
            })}
        </View>
    )
}

export default ProfileTabs;