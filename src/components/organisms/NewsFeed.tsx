import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Avatar from '../molecules/Avatar';
import Typography from '../Typography';
import Icon from '../atom/Icon/Icon';
import colors from '../constants/colors';
import Label from '../molecules/Label';
import {NewsFeedProps} from '../../utils/types';
import Button from '../molecules/Button';

export default function NewsFeed({
  data,
  loading,
  login,
  navigation,
  refreshing,
  onRefresh,
}: NewsFeedProps) {
  const handleLoginRedirect = () => {
    if (login === 'guest') {
      navigation.replace('Login');
    }
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" style={{marginTop: 10}} />
      ) : (
        <TouchableOpacity onPress={handleLoginRedirect}>
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
                {login === 'guest' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      backgroundColor: colors.purple100,
                    }}>
                    <Image
                      source={require('../../../assets/images/Investly_Mascot_1.png')}
                      style={{width: 40, height: 28}}
                    />
                    <View style={{flexDirection: 'row'}}>
                      <Typography
                        type="paragraph"
                        size="small"
                        style={styles.subtitle}>
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
              </>
            }
            renderItem={({item, index}) => (
              <View key={index} style={styles.newsCard}>
                <View style={styles.newsCardTop}>
                  <View style={{flexDirection: 'row', gap: 12}}>
                    <Avatar
                      size="large"
                      state="photo"
                      photo={item.avatar_url}
                    />
                    <View>
                      <Typography
                        type="heading"
                        size="xsmall"
                        style={styles.title}>
                        {item.name}
                      </Typography>
                      <Typography
                        type="paragraph"
                        size="small"
                        style={styles.subtitle}>
                        {item.headline}
                      </Typography>
                      <Typography
                        type="paragraph"
                        size="xsmall"
                        style={styles.subtitle}>
                        {item.created_at.toString()}
                      </Typography>
                    </View>
                  </View>
                  <TouchableOpacity onPress={handleLoginRedirect}>
                    <Icon name="ellipsis" />
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 12}}>
                  <Typography type="heading" size="medium" style={styles.title}>
                    {item.post_header}
                  </Typography>
                  <Typography
                    type="paragraph"
                    size="medium"
                    style={styles.title}>
                    {item.post_content}
                  </Typography>
                </View>
                <View style={{marginVertical: 12}}>
                  <Label variant="tertiary" fill={colors.green100}>
                    <Typography
                      type="heading"
                      size="xsmall"
                      style={{color: colors.green600}}>
                      {item.post_topic}
                    </Typography>
                  </Label>
                </View>
                <View style={{flexDirection: 'row', gap: 8}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: colors.neutral200,
                      borderRadius: 96,
                    }}>
                    <Button
                      variant="link"
                      size="small"
                      type="icon-left"
                      disabled={false}
                      onPress={handleLoginRedirect}>
                      <Icon
                        name="arrow-up"
                        width={16}
                        height={16}
                        fill={colors.neutral700}
                      />
                      <Typography
                        type="paragraph"
                        size="small"
                        style={styles.title}>
                        {item.post_upvote}
                      </Typography>
                    </Button>
                    <View
                      style={{
                        width: 1,
                        height: '60%',
                        backgroundColor: colors.neutral400,
                      }}
                    />
                    <Button
                      variant="link"
                      size="small"
                      type="icon-left"
                      disabled={false}
                      onPress={handleLoginRedirect}>
                      <Icon
                        name="arrow-down"
                        width={16}
                        height={16}
                        fill={colors.neutral700}
                      />
                    </Button>
                  </View>
                  <View
                    style={{
                      backgroundColor: colors.neutral200,
                      borderRadius: 96,
                    }}>
                    <Button
                      variant="link"
                      size="small"
                      type="icon-left"
                      disabled={false}
                      onPress={handleLoginRedirect}>
                      <Icon
                        name="comment"
                        width={16}
                        height={16}
                        fill={colors.neutral700}
                      />
                      <Typography
                        type="paragraph"
                        size="small"
                        style={styles.title}>
                        {item.post_comment}
                      </Typography>
                    </Button>
                  </View>
                  <View
                    style={{
                      backgroundColor: colors.neutral200,
                      borderRadius: 96,
                    }}>
                    <Button
                      variant="link"
                      size="small"
                      type="icon-left"
                      disabled={false}
                      onPress={handleLoginRedirect}>
                      <Icon
                        name="retweet"
                        width={16}
                        height={16}
                        fill={colors.neutral700}
                      />
                      <Typography
                        type="paragraph"
                        size="small"
                        style={styles.title}>
                        {item.post_downvote}
                      </Typography>
                    </Button>
                  </View>
                </View>
              </View>
            )}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  newsCard: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.neutral300,
    padding: 16,
    backgroundColor: '#fff',
  },
  newsCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.neutral700,
  },
  subtitle: {
    color: colors.neutral600,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  seen: {
    padding: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seenText: {
    color: colors.neutral500,
  },
});
