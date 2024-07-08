import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const widthSize = (value: number) => {
  return (screenWidth / 360) * value;
};

export const heightSize = (value: number) => {
  return (screenHeight / 640) * value;
};
