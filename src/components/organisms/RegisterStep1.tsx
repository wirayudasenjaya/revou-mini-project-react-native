import {View} from 'react-native';

import TextField from '../molecules/TextInput';
import {RegisterComponentProps} from '../../utils/types';

export default function RegisterStep1({
  registerData,
  handleInputChange,
  handleInputBlur,
  inputStates,
}: RegisterComponentProps) {
  return (
    <>
      <TextField
        state={inputStates.email}
        type="email"
        label="Email"
        placeholder="Masukkan email kamu"
        message="Invalid email format"
        value={registerData.email}
        onChangeText={text => handleInputChange('email', text)}
        onBlur={() => handleInputBlur('email')}
      />
      <View style={{marginVertical: 12}} />
      <TextField
        state={inputStates.password}
        type="password"
        label="Password"
        placeholder="Masukkan Password kamu"
        message="Invalid password format"
        value={registerData.password}
        onChangeText={text => handleInputChange('password', text)}
        onBlur={() => handleInputBlur('password')}
      />
      <View style={{marginVertical: 12}} />
      <TextField
        state={inputStates.confirmPassword}
        type="password"
        label="Konfirmasi Password"
        placeholder="Masukkan konfirmasi password"
        message="Invalid password format"
        value={registerData.confirmPassword}
        onChangeText={text => handleInputChange('confirmPassword', text)}
        onBlur={() => handleInputBlur('confirmPassword')}
      />
    </>
  );
}
