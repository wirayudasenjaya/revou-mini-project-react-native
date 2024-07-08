import {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

import Typography from '../components/Typography';
import colors from '../components/constants/colors';
import {heightSize, widthSize} from '../utils/utils';
import TextField from '../components/molecules/TextInput';
import Avatar from '../components/molecules/Avatar';
import Icon from '../components/atom/Icon/Icon';
import NewsFeed from '../components/organisms/NewsFeed';
import Button from '../components/molecules/Button';

const screenWidth = Dimensions.get('window').width;

const TrendingPage = () => <NewsFeed />;

const NewestPage = () => <NewsFeed />;

const renderScene = SceneMap({
  trending: TrendingPage,
  terbaru: NewestPage,
});

export default function HomeScreen({navigation}) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'trending', title: 'Trending'},
    {key: 'terbaru', title: 'Terbaru'},
  ]);

  const renderTabBar = props => {
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
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.cardTopContent}>
            <Avatar size="large" state="empty" />
            <View style={{flex: 1, paddingHorizontal: 8}}>
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
            <View style={{ width: '40%'}}>
              <Button
                type="icon-left"
                variant="link"
                size="small"
                disabled={false}
                onPress={() => {}}>
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
                onPress={() => {}}>
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

        <View style={{height: '100%'}}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{width: screenWidth}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: widthSize(12),
    marginVertical: heightSize(16),
    paddingHorizontal: widthSize(12),
    paddingVertical: heightSize(16),
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  cardTopContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: heightSize(16),
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
