import {useRef, useState} from 'react';
import {SafeAreaView, Image, Dimensions, View, FlatList} from 'react-native';

import Typography from '../components/Typography';
import colors from '../components/constants/colors';
import Button from '../components/molecules/Button';
import {sizeRatio} from '../utils/utils';

export default function OnboardingScreen() {
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
        'Atur portfolio kamu dan langsung\mberinvestasi dengan mudah dengan\nberagam pilihan aset ',
    },
  ];

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex + 1,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log('OKEH');
    }
  };

  const handleOnMomentumEnd = (e: any) => {
    setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / screenWidth));
  };

  return (
    <SafeAreaView
      style={{
        height: screenHeight,
        backgroundColor: 'white',
      }}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal={true}
        snapToAlignment="start"
        decelerationRate={'fast'}
        snapToInterval={windowWidth}
        onMomentumScrollEnd={handleOnMomentumEnd}
        renderItem={({item, index}) => (
          <View
            style={{
              width: screenWidth,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: sizeRatio(20),
            }}>
            <Image
              style={{
                width: sizeRatio(240),
                height: sizeRatio(240),
              }}
              source={item.image}
            />
            <View style={{marginVertical: sizeRatio(8)}} />
            <Typography type="heading" size="xlarge">
              {item.title}
            </Typography>
            <View style={{marginVertical: sizeRatio(8)}} />
            <Typography
              type="paragraph"
              size="medium"
              style={{textAlign: 'center'}}>
              {item.description}
            </Typography>
            <View style={{marginVertical: sizeRatio(13)}} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: (screenWidth / 360) * 4,
              }}>
              {data.map((_, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor:
                      index === currentIndex
                        ? colors.purple600
                        : colors.purple100,
                    width:
                      index === currentIndex ? sizeRatio(16) : sizeRatio(8),
                    height: sizeRatio(8),
                    borderRadius: 50,
                  }}
                />
              ))}
            </View>
            <View style={{marginVertical: sizeRatio(42)}} />
            <View style={{width: '100%'}}>
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
          </View>
        )}
        keyExtractor={item => item.title}
      />
    </SafeAreaView>
  );
}
