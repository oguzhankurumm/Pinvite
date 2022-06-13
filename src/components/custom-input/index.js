import React, { forwardRef } from 'react';
import { TextInput, Text } from 'react-native';
import styles from './style';

const CustomInput = forwardRef((props, ref = props.inputRef) => {
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
                {...rest}
            />
        </>
    )
});

export default CustomInput;