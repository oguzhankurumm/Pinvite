import React, { useState, useRef } from 'react'
import { View, Text, Alert } from 'react-native'
import styles from './style';
import CustomButton from '../../../components/custom-button';
import CustomInput from '../../../components/custom-input';
import { useDispatch } from 'react-redux';
import { checkRegisterInfo } from '../../../redux/actions/auth';

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = () => {
      if (!name || !email || !password) {
        return Alert.alert('Missing Fields', 'Please fill all required fields', [{ text: 'OK' }]);
      }
      dispatch(checkRegisterInfo({email, name, password}));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <CustomInput
      autoCapitalize="words"
        label="Name"
        inputRef={nameInputRef}
        autoFocus={true}
        onChangeText={setName}
        value={name}
        placeholder="John Doe"
        onFocus={() => nameInputRef.current?.focus()}
        onBlur={() => nameInputRef.current?.blur()}
        keyboardType="default"
        returnKeyType="next"
        maxLength={50}
        onSubmitEditing={() => emailInputRef.current.focus()}
      />
      <CustomInput
        autoCorrect={false}
        label="Email"
        inputRef={emailInputRef}
        onChangeText={setEmail}
        value={email}
        placeholder="email@domain.com"
        onFocus={() => emailInputRef.current?.focus()}
        onBlur={() => emailInputRef.current?.blur()}
        keyboardType="email-address"
        returnKeyType="next"
        maxLength={256}
        onSubmitEditing={() => passwordInputRef.current.focus()}
      />
      <CustomInput
        autoCorrect={false}
        label="Password"
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