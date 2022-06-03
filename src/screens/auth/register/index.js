import React, { useState, useRef } from 'react'
import { View, Text } from 'react-native'
import styles from './style';
import CustomButton from '../../../components/custom-button';
import CustomInput from '../../../components/custom-input';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = () => {
    console.log('email: ', email);
    console.log('password: ', password);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <CustomInput
        inputRef={emailInputRef}
        autoFocus={true}
        onChangeText={setEmail}
        value={email}
        placeholder="jane@example.com"
        onFocus={() => emailInputRef.current?.focus()}
        onBlur={() => emailInputRef.current?.blur()}
        keyboardType="email-address"
        returnKeyType="next"
        maxLength={256}
        onSubmitEditing={() => passwordInputRef.current.focus()}
      />
      <CustomInput
        inputRef={passwordInputRef}
        onChangeText={setPassword}
        value={password}
        placeholder="••••••••••••"
        secureTextEntry={true}
        onFocus={() => passwordInputRef.current?.focus()}
        onBlur={() => passwordInputRef.current?.blur()}
        keyboardType="default"
        blurOnSubmit={true}
        returnKeyType="done"
        maxLength={256}
      />
      <CustomButton title="NEXT" onPress={handleSubmit} isDark={true} styleProps={{ paddingVertical: 10 }} />
    </View>
  )
}

export default Register;