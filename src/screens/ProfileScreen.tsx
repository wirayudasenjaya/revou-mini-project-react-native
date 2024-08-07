import {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Typography from '../components/Typography';
import colors from '../components/constants/colors';
import {StackParams} from '../utils/types';
import Button from '../components/molecules/Button';
import {AuthContext} from '../utils/authContext';
import {storageService} from '../services';

type ScreenProps = NativeStackScreenProps<StackParams, 'Profile'>;

export default function ProfileScreen({navigation}: ScreenProps) {
  const {logout} = useContext(AuthContext);

  const handleLogout = () => {
    storageService.logout();
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={{marginVertical: 10}} />
      <View style={{width: '100%', paddingHorizontal: 20}}>
        <Button
          variant="primary"
          type="text"
          size="large"
          disabled={false}
          onPress={handleLogout}>
          <Typography
            type="heading"
            size="medium"
            style={{textAlign: 'center', color: 'white'}}>
            Logout
          </Typography>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 240,
    height: 240,
  },
  text: {
    color: colors.neutral700,
    marginTop: 20,
  },
});
