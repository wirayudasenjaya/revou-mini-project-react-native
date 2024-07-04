import {Dimensions} from 'react-native';

export const sizeRatio = (value: number) => {
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (screenWidth / 360) * value;
};
