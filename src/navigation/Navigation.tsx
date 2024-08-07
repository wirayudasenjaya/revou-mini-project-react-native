import {useContext, useEffect, useRef, useState} from 'react';
import {Alert, Image, View} from 'react-native';
import notifee, {EventType} from '@notifee/react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import JailMonkey from 'jail-monkey';
import RNExitApp from 'react-native-exit-app';

import {StackParams} from '../utils/types';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import DetailPostScreen from '../screens/DetailPostScreen';
import colors from '../components/constants/colors';
import Icon from '../components/atom/Icon/Icon';
import {AuthContext} from '../utils/authContext';
import RegisterScreen from '../screens/RegisterScreen';
import Config from 'react-native-config';
import Typography from '../components/Typography';

export default function AppNavigation() {
  const Stack = createNativeStackNavigator<StackParams>();
  const Tab = createBottomTabNavigator<StackParams>();
  const {state} = useContext(AuthContext);
  const [initialNotification, setInitialNotification] = useState(null);
  const navigationRef = useRef(null);

  async function onMessageReceived(message) {
    notifee.displayNotification(JSON.parse(message.data.notifee));
  }

  messaging().onMessage(onMessageReceived);
  messaging().setBackgroundMessageHandler(onMessageReceived);

  const InitNotification = () => {
    const {navigate} = useNavigation();

    const onHandleNotification = async ({type, detail}) => {
      switch (type) {
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification?.data);
          if (detail.notification?.data.type === 'OPEN_POST_DETAIL') {
            navigate('Detail', {id: detail.notification?.data.postId});
          }
          break;
      }
    };

    useEffect(() => {
      notifee.onForegroundEvent(onHandleNotification);
      notifee.onBackgroundEvent(onHandleNotification);
      if (!__DEV__) {
        if (JailMonkey.isJailBroken()) {
          Alert.alert(
            'Error',
            'This is a jailbroken device',
            [
              {
                text: 'OK',
                onPress: () => {
                  RNExitApp.exitApp();
                },
              },
            ],
            {
              cancelable: false,
            },
          );
        }
      }
    }, []);

    return null;
  };

  useEffect(() => {
    const checkInitialNotification = async () => {
      const notification = await notifee.getInitialNotification();
      if (notification) {
        setInitialNotification(notification.notification?.data);
      }
    };

    checkInitialNotification();
  }, []);

  useEffect(() => {
    if (initialNotification?.type === 'OPEN_POST_DETAIL') {
      // Use navigationRef to navigate
      navigationRef.current?.navigate('Detail', {
        id: initialNotification.postId,
      });
      setInitialNotification(null); // Clear the notification data after handling it
    }
  }, [initialNotification]);

  function HomeTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarActiveTintColor: colors.purple600,
            tabBarIcon: ({color}) => <Icon name="house" fill={color} />,
            headerTitle: () => (
              <Image
                source={require('../../assets/images/Investly_Logo.png')}
              />
            ),
            headerRight: () => (
              <View style={{marginRight: 10}}>
                <Icon name="bell" fill={colors.purple600} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarActiveTintColor: colors.purple600,
            tabBarIcon: ({color}) => <Icon name="user" fill={color} />,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <InitNotification />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {state.isLoggedIn ? (
          <>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="Create" component={CreatePostScreen} />
            <Stack.Screen name="Detail" component={DetailPostScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
