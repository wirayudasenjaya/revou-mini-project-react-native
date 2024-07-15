import {useRef, useState} from 'react';
import {
  SafeAreaView,
  Image,
  Dimensions,
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Typography from '../components/Typography';
import colors from '../components/constants/colors';
import Button from '../components/molecules/Button';
import { StackParams } from '../utils/types';

const screenWidth = Dimensions.get('screen').width;

type ScreenProps = NativeStackScreenProps<StackParams, 'Onboarding'>;

export default function OnboardingScreen({navigation}: ScreenProps) {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {height, width} = useWindowDimensions();

  const data = [
    {
      image: require('../../assets/images/Connect.png'),
      title: 'Connect',
      description:
        'Dapatkan akses ke investor profesional\nterpercaya dan mulai investasi bareng\nteman dan komunitas',
    },
    {
      image: require('../../assets/images/Learn.png'),
      title: 'Learn',
      description:
        'Dapatkan ide investasi dan informasi\nterpercaya langsung dari ahlinya biar\nkamu makin jago dan makin cuan!',
    },
    {
      image: require('../../assets/images/Invest.png'),
      title: 'Invest',
      description:
        'Atur portfolio kamu dan langsung berinvestasi\ndengan mudah dengan beragam pilihan aset',
    },
  ];

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: currentIndex + 1,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  const handleOnMomentumEnd = (e: any) => {
    setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / screenWidth));
  };

  return (
    <SafeAreaView style={styles.mainBackground}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal={true}
        snapToAlignment="start"
        decelerationRate={'fast'}
        snapToInterval={width}
        onMomentumScrollEnd={handleOnMomentumEnd}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.contentContainer}>
            <Image style={styles.image} source={item.image} />
            <View style={styles.contentGap} />
            <Typography
              type="heading"
              size="xlarge"
              style={{color: colors.neutral700}}>
              {item.title}
            </Typography>
            <View style={styles.contentGap} />
            <Typography
              type="paragraph"
              size="medium"
              style={{textAlign: 'center', color: colors.neutral700}}>
              {item.description}
            </Typography>
            <View style={{marginVertical: 13}} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}>
              {data.map((_, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor:
                      index === currentIndex
                        ? colors.purple600
                        : colors.purple100,
                    width: index === currentIndex ? 16 : 8,
                    height: 8,
                    borderRadius: 50,
                  }}
                />
              ))}
            </View>
          </View>
        )}
        keyExtractor={item => item.title}
      />
      <View style={styles.buttonContainer}>
        <Button
          variant="primary"
          type="text"
          size="large"
          disabled={false}
          onPress={handleNext}>
          <Typography
            type="heading"
            size="medium"
            style={{color: colors.neutral100, textAlign: 'center'}}>
            {currentIndex === data.length - 1 ? 'Get Started' : 'Next'}
          </Typography>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 240,
    height: 240,
  },
  contentGap: {
    marginVertical: 8,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 44,
    paddingHorizontal: 20,
  },
});
