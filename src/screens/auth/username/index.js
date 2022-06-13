import React, { useState, useRef } from 'react'
import { View, Text } from 'react-native'
import styles from './style';
import CustomButton from '../../../components/custom-button';
import CustomInput from '../../../components/custom-input';
import { useDispatch } from 'react-redux';
import { registerWithEmailAndPassword } from '../../../redux/actions/auth';

const SelectUsername = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { registerInfo } = route.params;
  const [username, setUsername] = useState('');
  const usernameInputRef = useRef();

  const handleSetUsername = async () => {
    if (!username) {
      return Alert.alert('Missing Fields', 'Please fill all required fields', [{ text: 'OK' }]);
    }
    dispatch(registerWithEmailAndPassword({
      email: registerInfo.email,
      name: registerInfo.name,
      password: registerInfo.password,
      username
    }));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <CustomInput
        inputRef={usernameInputRef}
        autoFocus={true}
        onChangeText={setUsername}
        value={username}
        placeholder="Select username"
        onFocus={() => usernameInputRef.current?.focus()}
        onBlur={() => usernameInputRef.current?.blur()}
        keyboardType="default"
        returnKeyType="next"
        maxLength={128}
        blurOnSubmit={true}
      />
      <CustomButton
        title="SIGN UP"
        onPress={handleSetUsername}
        isDark={true}
        styleProps={{ paddingVertical: 10 }}
      />
    </View>
  )
}

export default SelectUsername;