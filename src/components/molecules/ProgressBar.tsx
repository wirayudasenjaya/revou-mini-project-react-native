import {StyleSheet, View} from 'react-native';
import Typography from '../Typography';
import colors from '../constants/colors';

export default function ProgressBar({index}: {index: number}) {
  const progress = () => {
    switch (index) {
      case 0:
        return 33;
      case 1:
        return 67;
      case 2:
        return 100;
      default:
        return 0;
    }
  };

  return (
    <View>
      <Typography
        type="heading"
        size="xxsmall"
        style={{
          color: colors.neutral700,
        }}>
        {`${index + 1} dari 3`}
      </Typography>
      <View style={[styles.progressBar, {width: `${progress()}%`}]} />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    height: 4,
    marginBottom: 12,
    backgroundColor: colors.purple500,
    borderRadius: 50,
  },
});
