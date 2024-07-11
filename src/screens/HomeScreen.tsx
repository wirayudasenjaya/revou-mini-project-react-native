import React, {
  memo,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react';
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
import NewsFeed from '../components/organisms/NewsFeed';
import Button from '../components/molecules/Button';
import {generateFakeNewsFeedData} from '../utils/fakeData';
import {NewsFeedProps, NewsProps, StackParams} from '../utils/types';
import {UserContext} from '../utils/context';

const screenWidth = Dimensions.get('window').width;

type ScreenProps = NativeStackScreenProps<StackParams, 'Home'>;

const TrendingPage = memo(
  ({
    data,
    loading,
    login,
    navigation,
    onRefresh,
    refreshing,
  }: NewsFeedProps) => (
    <NewsFeed
      loading={loading}
      data={data}
      login={login}
      navigation={navigation}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  ),
);

const NewestPage = memo(
  ({
    data,
    loading,
    login,
    navigation,
    onRefresh,
    refreshing,
  }: NewsFeedProps) => (
    <NewsFeed
      loading={loading}
      data={data}
      login={login}
      navigation={navigation}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  ),
);

export default function HomeScreen({navigation}: ScreenProps) {
  const context = useContext(UserContext);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [routes] = useState([
    {key: 'trending', title: 'Trending'},
    {key: 'terbaru', title: 'Terbaru'},
  ]);
  const [trendingData, setTrendingData] = useState<NewsProps[]>([]);
  const [newestData, setNewestData] = useState<NewsProps[]>([]);
  const data = useMemo(() => generateFakeNewsFeedData(100), []);

  useEffect(() => {
    const trending = [...data].sort((a, b) => b.post_upvote - a.post_upvote);
    const newest = [...data].sort((a, b) =>
      b.created_at > a.created_at ? 1 : -1,
    );
    setTrendingData(trending);
    setNewestData(newest);
    setLoading(false);
  }, [data]);

  const renderScene = useCallback(
    ({route}) => {
      switch (route.key) {
        case 'trending':
          return (
            <TrendingPage
              loading={loading}
              data={trendingData}
              login={context?.state}
              navigation={navigation}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          );
        case 'terbaru':
          return (
            <NewestPage
              loading={loading}
              data={newestData}
              login={context?.state}
              navigation={navigation}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          );
        default:
          return null;
      }
    },
    [loading, trendingData, newestData],
  );

  const renderTabBar = useCallback(props => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i: number) => {
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const newData = generateFakeNewsFeedData(100);
    const trending = [...newData].sort((a, b) => b.post_upvote - a.post_upvote);
    const newest = [...newData].sort((a, b) =>
      b.created_at > a.created_at ? 1 : -1,
    );
    setTrendingData(trending);
    setNewestData(newest);
    setRefreshing(false);
  }, []);

  const handleLoginRedirect = () => {
    if (context?.state === 'guest') {
      navigation.replace('Login');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.card}>
        <View style={styles.cardTopContent}>
          <Avatar
            size="large"
            state={context?.state === 'guest' ? 'empty' : 'photo'}
            photo="https://s3-alpha-sig.figma.com/img/b472/1564/b04bd24355d7fcd28e8592df82f22e17?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L0E0VfTzpEVgsylQwpC3zYM~lyQlyt9U0u8WHZAuyXwl70zaw3txFb6zYrY9kfGa~L1dhc947f2AeCZ6Kew81~xQMEK4tnTgwcOUXRqcYYYLbNGsNJPJ-mOSIeFfbLtOJrhgof2nzQRauClb-95GwN8qbe5TTjrlVGrKJUSpRmKvsEXMPoQ5rlA74PSW~ScAXNUTYyM2zpOBuvpBlPFexGDtFC~7a3pm0iyGhhQ0lTFC7rBTcPNMS8tlaooQsEbA3gSPHFDLd3Ia6P5a7Ur244HVSywdf~zdq1JKNrVgiY3CnWmPbq-RDK9S6R1IT8rCFwyr8dzGRBYV-yaw8Q9Z3A__"
          />
          <View style={styles.cardInputContainer}>
            <TextField
              state="default-no-label"
              type="text"
              placeholder="Apa yang ingin kamu tanyakan?"
              value=""
              onChangeText={() => {}}
              onBlur={() => {}}
            />
          </View>
        </View>
        <View style={styles.cardBottomContent}>
          <View style={{width: '40%'}}>
            <Button
              type="icon-left"
              variant="link"
              size="small"
              disabled={false}
              onPress={handleLoginRedirect}>
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
          <View style={{width: '40%'}}>
            <Button
              type="icon-left"
              variant="link"
              size="small"
              disabled={false}
              onPress={handleLoginRedirect}>
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

      <View style={{flex: 1}}>
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
    paddingHorizontal: 8
  },
  cardBottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 16,
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
