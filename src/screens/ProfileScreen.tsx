import {useContext} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import notifee, { AndroidImportance, TimestampTrigger, TriggerType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

import Typography from '../components/Typography';
import colors from '../components/constants/colors';
import {StackParams} from '../utils/types';
import Button from '../components/molecules/Button';
import {AuthContext} from '../utils/authContext';
import { storageService } from '../services';

type ScreenProps = NativeStackScreenProps<StackParams, 'Profile'>;

export default function ProfileScreen({navigation}: ScreenProps) {
  const {logout} = useContext(AuthContext);

  const handleLogout = () => {
    storageService.set('IS_LOGIN', false);
    logout();
  };

  const handleNotification = async () => {
    // await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default-test',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH
    });

    await notifee.displayNotification({
      title: 'Title',
      subtitle: 'Subtitle',
      body: 'Main body content of the notification',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
      data: {
        type: 'OPEN_POST_DETAIL',
        postId: '7e55ef5f-05df-4428-be77-e68b36f6b63e'
      }
    });
  };

  const onCreateTriggerNotification = async () => {
    const date = new Date(Date.now());
    date.setSeconds(date.getSeconds() + 10);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',
        android: {
          channelId: 'default-test',
          pressAction: {
            id: 'default',
          },
        },
        data: {
          type: 'OPEN_POST_DETAIL',
          postId: '7e55ef5f-05df-4428-be77-e68b36f6b63e'
        }
      },
      trigger,
    );
  }

  const onAppBootstrap = async () => {
    await messaging().registerDeviceForRemoteMessages();
  
    // messaging().subscribeToTopic('PROMOTIONS');

  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/Invest.png')}
        resizeMode='contain'
      />
      <Typography type="heading" size="xxlarge" style={styles.text}>
        Coming Soon
      </Typography>
      <View style={{marginVertical: 10}} />
      <Button
        variant="primary"
        type="text"
        size="large"
        disabled={false}
        onPress={handleNotification}>
        <Typography type="heading" size="medium" style={{color: 'white'}}>
          Trigger Notification
        </Typography>
      </Button>
      <View style={{marginVertical: 3}} />
      <Button
        variant="primary"
        type="text"
        size="large"
        disabled={false}
        onPress={onCreateTriggerNotification}>
        <Typography type="heading" size="medium" style={{color: 'white'}}>
          Trigger Timed Notification
        </Typography>
      </Button>
      <View style={{marginVertical: 3}} />
      <Button
        variant="primary"
        type="text"
        size="large"
        disabled={false}
        onPress={onAppBootstrap}>
        <Typography type="heading" size="medium" style={{color: 'white'}}>
          Get FCM Token
        </Typography>
      </Button>
      <View style={{marginVertical: 3}} />
      <Button
        variant="primary"
        type="text"
        size="large"
        disabled={false}
        onPress={handleLogout}>
        <Typography type="heading" size="medium" style={{color: 'white'}}>
          Logout
        </Typography>
      </Button>
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
