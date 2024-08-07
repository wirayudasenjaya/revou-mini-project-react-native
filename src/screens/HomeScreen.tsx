import React, {memo, useState, useCallback, useContext, useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {TabView} from 'react-native-tab-view';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Typography from '../components/Typography';
import colors from '../components/constants/colors';
import TextField from '../components/molecules/TextInput';
import Avatar from '../components/molecules/Avatar';
import Icon from '../components/atom/Icon/Icon';
import Button from '../components/molecules/Button';
import {StackParams} from '../utils/types';
import {UserContext} from '../utils/userContext';
import {AuthContext} from '../utils/authContext';
import TrendingList from '../components/organisms/TrendingList';
import NewestList from '../components/organisms/NewestList';
import fetch from '../utils/fetch';
import { storageService } from '../services';

const screenWidth = Dimensions.get('window').width;

type ScreenProps = NativeStackScreenProps<StackParams, 'Home'>;

const TrendingPage = memo(({navigation}: any) => (
  <TrendingList navigation={navigation} />
));
const NewestPage = memo(({navigation}: any) => (
  <NewestList navigation={navigation} />
));

export default function HomeScreen({navigation}: ScreenProps) {
  const {user} = useContext(UserContext);
  const {logout} = useContext(AuthContext);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'trending', title: 'Trending'},
    {key: 'terbaru', title: 'Terbaru'},
  ]);

  const renderScene = useCallback(
    ({route}: any) => {
      switch (route.key) {
        case 'trending':
          return <TrendingPage navigation={navigation} />;
        case 'terbaru':
          return <NewestPage navigation={navigation} />;
        default:
          return null;
      }
    },
    [],
  );

  const renderTabBar = useCallback((props: any) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route: any, i: number) => {
          const isActive = props.navigationState.index === i;
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.tabItem,
                isActive ? styles.activeTab : styles.inactiveTab,
              ]}
              onPress={() => setIndex(i)}>
              <Typography
                type="heading"
                size="small"
                style={{color: colors.neutral700}}>
                {route.title}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }, []);

  const createPost = () => {
    if (user === 'guest') {
      logout();
    } else {
      navigation.navigate('Create');
    }
  };

  useEffect(() => {
    fetch.getSocialHeader(`/v2/profile`, {
      success: async (response) => {
        storageService.setUsername(response.data.data.username);
        storageService.setEmail(response.data.data.email)
      },
      error: async (error) => {
        console.log(error.response.data)
      }
    });
  }, [])

  return (
    <SafeAreaView style={styles.flexContainer}>
      <View style={styles.card}>
        <View style={styles.cardTopContent}>
          <Avatar
            size="large"
            state={user === 'guest' ? 'empty' : 'photo'}
            photo="https://s3-alpha-sig.figma.com/img/b472/1564/b04bd24355d7fcd28e8592df82f22e17?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L0E0VfTzpEVgsylQwpC3zYM~lyQlyt9U0u8WHZAuyXwl70zaw3txFb6zYrY9kfGa~L1dhc947f2AeCZ6Kew81~xQMEK4tnTgwcOUXRqcYYYLbNGsNJPJ-mOSIeFfbLtOJrhgof2nzQRauClb-95GwN8qbe5TTjrlVGrKJUSpRmKvsEXMPoQ5rlA74PSW~ScAXNUTYyM2zpOBuvpBlPFexGDtFC~7a3pm0iyGhhQ0lTFC7rBTcPNMS8tlaooQsEbA3gSPHFDLd3Ia6P5a7Ur244HVSywdf~zdq1JKNrVgiY3CnWmPbq-RDK9S6R1IT8rCFwyr8dzGRBYV-yaw8Q9Z3A__"
          />
          <TouchableOpacity style={styles.cardInputContainer}>
            <TextField
              onPress={createPost}
              state="default-no-label"
              type="text"
              placeholder="Apa yang ingin kamu tanyakan?"
              value=""
              onChangeText={() => {}}
              onBlur={() => {}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.cardBottomContent}>
          <View style={styles.cardBottomContentButton}>
            <Button
              type="icon-left"
              variant="link"
              size="small"
              disabled={false}
              onPress={createPost}>
              <Icon name="question-circle" fill={colors.yellow600} />
              <Typography
                type="heading"
                size="xsmall"
                style={{color: colors.neutral700}}>
                Pertanyaan
              </Typography>
            </Button>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.cardBottomContentButton}>
            <Button
              type="icon-left"
              variant="link"
              size="small"
              disabled={false}
              onPress={createPost}>
              <Icon name="plus" fill={colors.green600} />
              <Typography
                type="heading"
                size="xsmall"
                style={{color: colors.neutral700}}>
                Post
              </Typography>
            </Button>
          </View>
        </View>
      </View>

      <View style={styles.flexContainer}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{width: screenWidth}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  card: {
    marginHorizontal: 12,
    marginVertical: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  cardTopContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardInputContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  cardBottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 16,
  },
  cardBottomContentButton: {
    width: '45%',
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.neutral400,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  activeTab: {
    borderBottomColor: colors.purple700,
    borderBottomWidth: 4,
    marginHorizontal: 12,
  },
  inactiveTab: {
    borderBottomColor: '#fff',
    borderBottomWidth: 4,
    marginHorizontal: 12,
  },
});
