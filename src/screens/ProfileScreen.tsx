import {Image, StyleSheet, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Typography from '../components/Typography';
import colors from '../components/constants/colors';
import { StackParams } from '../utils/types';
import { widthSize } from '../utils/utils';

type ScreenProps = NativeStackScreenProps<StackParams, 'Profile'>;

export default function ProfileScreen({navigation}: ScreenProps) {
  return (
    <View
      style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/Invest.png')}
      />
      <Typography
        type="heading"
        size="xxlarge"
        style={styles.text}>
        Coming Soon
      </Typography>
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
  } 
})
