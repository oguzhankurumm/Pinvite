import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './style';
import { Icon } from 'react-native-eva-icons';
import { primary, white } from '../../assets/colors';
import { useNavigation } from '@react-navigation/native';


const SelecteableTabs = ({ newRef }) => {
    const [initialPage, setInitialPage] = useState(0);
    const navigation = useNavigation();

    const tabs = [
        { title: "Following", id: 0 },
        { title: "Local", id: 1 },
        { title: "Search", icon: "search-outline", id: 2 },
    ];

    const changeTab = item => {
        if (item.title === "Search") {
            navigation.navigate('Search');
            return false;
        }
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
                            <Icon name="search-outline" width={18} height={18} fill={initialPage === item.id ? primary : white} />
                        }
                        <Text style={[styles.tabText, initialPage === item.id && styles.selectedText]}>{item.title}</Text>
                    </Pressable>
                );
            })}
        </View>
    )
}

export default SelecteableTabs;