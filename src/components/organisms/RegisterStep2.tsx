import {View} from 'react-native';

import TextField from '../molecules/TextInput';
import {RegisterComponentProps} from '../../utils/types';

export default function RegisterStep2({
  registerData,
  errorMessage,
  handleInputChange,
  handleInputBlur,
  inputStates,
}: RegisterComponentProps) {
  return (
    <>
      <TextField
        state={inputStates.name}
        type="text"
        label="Nama"
        message="Invalid name"
        value={registerData.name}
        onChangeText={text => handleInputChange('name', text)}
        onBlur={() => handleInputBlur('name')}
      />
      <View style={{marginVertical: 12}} />
      <TextField
        state={inputStates.username}
        type="text"
        label="Username"
        message={errorMessage.username}
        value={registerData.username}
        onChangeText={text => handleInputChange('username', text)}
        onBlur={() => handleInputBlur('username')}
      />
    </>
  );
}
