import React from 'react';
import { View, FlatList, Alert } from 'react-native';
import styles from './style';
import MenuItem from './item';
import { Divider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import { navigate } from '../../helpers/navigationService';
import { clearModal } from '../../redux/actions/modal';

const MenuModal = () => {
    const dispatch = useDispatch();
    const menuOptions = [
        {
            name: 'Edit Profile',
            icon: 'edit-2',
            onPress: () => {
                dispatch(clearModal());
                navigate('EditProfile');
            }
        },
        {
            name: 'Logout',
            icon: 'power',
            onPress: () => {
                Alert.alert(
                    'Logout',
                    'Are you sure you want to logout?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Logout', style: 'destructive', onPress: () => {
                                dispatch(clearModal());
                                dispatch(logout());
                            }
                        }
                    ],
                    { cancelable: false }
                )
            }
        }
    ]

    const renderItem = ({ item }) => <MenuItem key={item._id} item={item} />

    return (
        <View style={styles.container}>
            <FlatList
                ItemSeparatorComponent={() => <Divider />}
                data={menuOptions}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>
    )
};

export default MenuModal;