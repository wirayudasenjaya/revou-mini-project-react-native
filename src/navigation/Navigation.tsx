import {Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {StackParams} from '../utils/types';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import DetailPostScreen from '../screens/DetailPostScreen';
import colors from '../components/constants/colors';
import Icon from '../components/atom/Icon/Icon';
import {useContext} from 'react';
import {AuthContext} from '../utils/authContext';

export default function AppNavigation() {
  const {state} = useContext(AuthContext);

  const Stack = createNativeStackNavigator<StackParams>();
  const Tab = createBottomTabNavigator<StackParams>();

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
    <NavigationContainer>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
