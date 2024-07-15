import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import dayjs from 'dayjs';

import Avatar from '../molecules/Avatar';
import Typography from '../Typography';
import Icon from '../atom/Icon/Icon';
import Button from '../molecules/Button';
import colors from '../constants/colors';
import Label from '../molecules/Label';
import {PostProps} from '../../utils/types';

type PostCardProps = {
  post: PostProps;
  onPress: (event: GestureResponderEvent) => void;
};

export default function PostCard({post, onPress}: PostCardProps) {
  return (
    <View style={styles.newsCard}>
      <View style={styles.newsCardTop}>
        <Avatar size="large" state="photo" photo={post.avatar_url} />
        <View style={{flex: 1}}>
          <Typography type="heading" size="xsmall" style={styles.title}>
            {post.name}
          </Typography>
          <Typography type="paragraph" size="small" style={styles.subtitle}>
            {post.headline}
          </Typography>
          <Typography type="paragraph" size="xsmall" style={styles.subtitle}>
            {dayjs().to(dayjs(post.created_at))}
          </Typography>
        </View>
        <Icon name="ellipsis" />
      </View>
      <View style={{marginTop: 12}}>
        <Typography type="heading" size="medium" style={styles.title}>
          {post.post_header}
        </Typography>
        <Typography type="paragraph" size="medium" style={styles.title}>
          {post.post_content}
        </Typography>
      </View>
      <View style={{marginVertical: 12}}>
        <Label variant="tertiary" fill={colors.green100}>
          <Typography
            type="heading"
            size="xsmall"
            style={{color: colors.green600}}>
            {post.post_topic}
          </Typography>
        </Label>
      </View>
      <View style={{flexDirection: 'row', gap: 8}}>
        <View
          style={[
            styles.buttonContainer,
            {flexDirection: 'row', alignItems: 'center'},
          ]}>
          <Button
            variant="link"
            size="small"
            type="icon-left"
            disabled={false}
            onPress={onPress}>
            <Icon
              name="arrow-up"
              width={16}
              height={16}
              fill={colors.neutral700}
            />
            <Typography type="paragraph" size="small" style={styles.title}>
              {post.post_upvote}
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
            onPress={onPress}>
            <Icon
              name="arrow-down"
              width={16}
              height={16}
              fill={colors.neutral700}
            />
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            variant="link"
            size="small"
            type="icon-left"
            disabled={false}
            onPress={onPress}>
            <Icon
              name="comment"
              width={16}
              height={16}
              fill={colors.neutral700}
            />
            <Typography type="paragraph" size="small" style={styles.title}>
              {post.post_comment}
            </Typography>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            variant="link"
            size="small"
            type="icon-left"
            disabled={false}
            onPress={onPress}>
            <Icon
              name="retweet"
              width={16}
              height={16}
              fill={colors.neutral700}
            />
            <Typography type="paragraph" size="small" style={styles.title}>
              {post.post_retweet}
            </Typography>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  newsCard: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.neutral300,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  newsCardTop: {
    flexDirection: 'row',
    gap: 12,
  },
  title: {
    color: colors.neutral700,
  },
  subtitle: {
    color: colors.neutral600,
  },
  buttonContainer: {
    backgroundColor: colors.neutral200,
    borderRadius: 96,
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
