import React, { forwardRef } from 'react';
import { TextInput, Text } from 'react-native';
import { lightGray, green, primary } from '../../assets/colors';
import styles from './style';
import { Icon } from 'react-native-eva-icons';

const CustomInputFloat = forwardRef((props, ref = props.inputRef) => {
    const {
        autoFocus,
        autoCapitalize,
        secureTextEntry,
        onChangeText,
        value,
        placeholder,
        onFocus,
        onBlur,
        styleProps,
        inputRef,
        label,
        showIcon,
        iconStatus,
        ...rest
    } = props;
    return (
        <>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                ref={inputRef}
                style={[styles.input, { ...styleProps }]}
                autoFocus={autoFocus ? autoFocus : false}
                autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
                onChangeText={onChangeText ? onChangeText : () => { }}
                placeholder={placeholder ? placeholder : ''}
                value={value ? value : ''}
                onFocus={onFocus ? onFocus : () => { }}
                onBlur={onBlur ? onBlur : () => { }}
                secureTextEntry={secureTextEntry ? true : false}
                placeholderTextColor={lightGray}
                {...rest}
            />
            {showIcon && (
                <Icon name={iconStatus === true ? "checkmark-circle-2-outline" : "close-circle-outline"} width={24} height={24} fill={iconStatus === true ? green : primary} style={{ position: 'absolute', top: -50, right: 0 }} />
            )}
        </>
    )
});

export default CustomInputFloat;