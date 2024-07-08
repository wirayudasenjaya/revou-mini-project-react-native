import {Image, View} from 'react-native';

import Typography from '../components/Typography';
import colors from '../components/constants/colors';
import {heightSize} from '../utils/utils';

export default function ProfileScreen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Image
        style={{width: 240, height: 240}}
        source={require('../../assets/images/Invest.png')}
      />
      <Typography
        type="heading"
        size="xxlarge"
        style={{color: colors.neutral700, marginTop: heightSize(20)}}>
        Coming Soon
      </Typography>
    </View>
  );
}
