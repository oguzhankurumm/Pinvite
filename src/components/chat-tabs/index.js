import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { gray, primary } from '../../assets/colors';
import styles from './style';;

const ChatTabs = ({ newRef, tabs }) => {
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
                        {item.icon &&
                            <Icon name="search-outline" style={{ marginRight: 3 }} width={20} height={20} fill={initialPage === item.id ? primary : gray} />
                        }
                        <Text style={[styles.tabText, initialPage === item.id && styles.selectedText]}>{item.title}</Text>
                    </Pressable>
                );
            })}
        </View>
    )
}

export default ChatTabs;