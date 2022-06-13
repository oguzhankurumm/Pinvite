import React from 'react';
import { Icon } from 'react-native-eva-icons';
import { gray } from '../../../assets/colors';
import { useDispatch } from 'react-redux';
import { openMenuModal } from '../../../redux/actions/modal';

const OpenMenuHelper = () => {
    const dispatch = useDispatch();
    return (
        <Icon name='more-vertical-outline' height={24} width={24} fill={gray} onPress={() => dispatch(openMenuModal(true))} />
    )
}

export default OpenMenuHelper;