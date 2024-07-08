import {StyleSheet, TouchableOpacity} from 'react-native';

import colors from '../constants/colors';

type ActionButtonProps = {
  children: React.ReactNode;
  onPress: any;
};

export default function ActionButton({children}: ActionButtonProps) {
  return <TouchableOpacity style={styles.button}>{children}</TouchableOpacity>;
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    backgroundColor: colors.neutral200,
    paddingHorizontal: 16,
    paddingVertical: 8,
		borderRadius: 96
  },
});
