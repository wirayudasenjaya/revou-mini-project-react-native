import {Image, StyleSheet, View} from 'react-native';
import colors from '../constants/colors';
import Icon from '../atom/Icon/Icon';

type AvatarProps = {
  size: 'xxlarge' | 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';
  state: 'empty' | 'photo';
  photo?: string;
};

export default function Avatar({size, state, photo}: AvatarProps) {
  const getAvatarStyle = () => {
    switch (size) {
      case 'xxlarge':
        return styles.xxlarge;
      case 'xlarge':
        return styles.xlarge;
      case 'large':
        return styles.large;
      case 'medium':
        return styles.medium;
      case 'small':
        return styles.small;
      case 'xsmall':
        return styles.xsmall;
    }
  };

  const avatarChild = () => {
    switch (state) {
      case 'empty':
        return <Icon name="user" />;
      case 'photo':
        return (
          <Image
            source={{uri: photo}}
            style={[styles.avatar, getAvatarStyle()]}
          />
        );
    }
  };

  return <View style={[styles.avatar, getAvatarStyle()]}>{avatarChild()}</View>;
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 80,
    backgroundColor: colors.purple600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  xxlarge: {
    width: 64,
    height: 64,
  },
  xlarge: {
    width: 52,
    height: 52,
  },
  large: {
    width: 40,
    height: 40,
  },
  medium: {
    width: 32,
    height: 32,
  },
  small: {
    width: 24,
    height: 24,
  },
  xsmall: {
    width: 16,
    height: 16,
  },
});
