import React, { useState, useRef } from 'react'
import { View, Text } from 'react-native'
import styles from './style';
import CustomButton from '../../../components/custom-button';
import CustomInput from '../../../components/custom-input';
import { useDispatch } from 'react-redux';
import { loginWithEmailAndPassword } from '../../../redux/actions/auth';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('oguzhan@gmail.com');
  const [password, setPassword] = useState('oquzhan1');
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleLogin = () => {
    dispatch(loginWithEmailAndPassword({ email, password }));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
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
      <CustomButton title="LOG IN" onPress={handleLogin} isDark={true} styleProps={{ paddingVertical: 10 }} />
    </View>
  )
}

export default Login;