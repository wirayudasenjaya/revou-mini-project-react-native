import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id';

import Typography from '../Typography';
import colors from '../constants/colors';
import {FeedProps} from '../../utils/types';
import PostCard from './PostCard';
import { useState } from 'react';

export default function Feed({
  data,
  loading,
  login,
  navigation,
  refreshing,
  onRefresh,
}: FeedProps) {
  const [feedData, setFeedData] = useState<any>([]);
  dayjs.locale('id');
  dayjs.extend(relativeTime);

  const handleLoginRedirect = () => {
    if (login === 'guest') {
      navigation.replace('Login');
    }
  };

  const viewDetail = (data: any) => {
    if (login === 'guest') {
      navigation.replace('Login');
    } else {
      navigation.navigate('Detail', {post: data});
    }
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : (
        <View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
            nestedScrollEnabled={true}
            refreshControl={
              <RefreshControl
                colors={['#9Bd35A', '#689F38']}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            refreshing={refreshing}
            onRefresh={onRefresh}
            keyExtractor={item => item.post_header}
            ListFooterComponent={
              <>
                <View style={styles.seen}>
                  <Typography
                    type="paragraph"
                    size="small"
                    style={styles.seenText}>
                    Semua feed sudah kamu lihat 🎉
                  </Typography>
                </View>
              </>
            }
            renderItem={({item, index}) => (
              <TouchableOpacity key={index} onPress={() => viewDetail(item)}>
                <PostCard post={item} onPress={handleLoginRedirect} />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
     {login === 'guest' && <View
        style={styles.bottomBanner}>
        <Image
          source={require('../../../assets/images/Investly_Mascot_1.png')}
          style={{width: 40, height: 28}}
        />
        <View style={{flexDirection: 'row'}}>
          <Typography type="paragraph" size="small" style={styles.subtitle}>
            Temukan inspirasi investasi,
          </Typography>
          <TouchableOpacity onPress={handleLoginRedirect}>
            <Typography
              type="heading"
              size="xsmall"
              style={{color: colors.purple600}}>
              {' '}
              Masuk yuk!
            </Typography>
          </TouchableOpacity>
        </View>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 10
  },
  newsCard: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.neutral300,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    color: colors.neutral700,
  },
  subtitle: {
    color: colors.neutral600,
  },
  seen: {
    paddingHorizontal: 36,
    paddingTop: 36,
    paddingBottom: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seenText: {
    color: colors.neutral500,
  },
  bottomBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.purple100,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }
});
