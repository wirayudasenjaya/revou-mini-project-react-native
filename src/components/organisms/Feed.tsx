import {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import dayjs from 'dayjs';
import analytics from '@react-native-firebase/analytics';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id';

import Typography from '../Typography';
import colors from '../constants/colors';
import {FeedProps} from '../../utils/types';
import PostCard from './PostCard';
import {UserContext} from '../../utils/userContext';
import {AuthContext} from '../../utils/authContext';
import fetch from '../../utils/fetch';
import { storageService } from '../../services';

export default function Feed({
  data,
  loading,
  navigation,
  refreshing,
  onRefresh,
  onEndReach,
}: FeedProps) {
  const {user} = useContext(UserContext);
  const {logout} = useContext(AuthContext);
  const [posts, setPosts] = useState(data);
  dayjs.locale('id');
  dayjs.extend(relativeTime);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  const handleLoginRedirect = () => {
    if (user === 'guest') {
      logout();
    }
  };

  const handleUpvote = (post_id: string, votes: number, is_upvoted: boolean) => {
    if (user === 'guest') {
      logout();
    } else {
      const username = storageService.getUsername();
      fetch.postSocial(`/v2/post/${post_id}/up-vote`, {}, {
        success: async (response) => {
          await analytics().logEvent('click_upvote', {
            username: username,
            post_id: post_id
          });
          const updatedData = data.map(post => {
            if (post.id === post_id) {
              return {
                ...post,
                upvotes: is_upvoted ? votes - 1 : votes + 1,
                is_upvoted: !is_upvoted
              };
            }
            return post;
          });
          setPosts(updatedData)
          ToastAndroid.show('Success Upvote', ToastAndroid.SHORT);
        },
        error: async (error) => {
          ToastAndroid.show(error.response.data.messages, ToastAndroid.SHORT);
        }
      });
    }
  };

  const viewDetail = (data: any) => {
    if (user === 'guest') {
      logout();
    } else {
      navigation.navigate('Detail', {id: data});
    }
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : (
        <View>
          <FlatList
            data={posts}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            onEndReached={onEndReach}
            refreshControl={
              <RefreshControl
                colors={[colors.neutral700]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            refreshing={refreshing}
            onRefresh={onRefresh}
            keyExtractor={item => item.id}
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
              <TouchableOpacity key={index} onPress={() => viewDetail(item.id)}>
                <PostCard post={item} onPress={() => handleUpvote(item.id, item.upvotes, item.is_upvoted)} />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {user === 'guest' && !loading && (
        <View style={styles.bottomBanner}>
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
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 10,
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
  },
});
