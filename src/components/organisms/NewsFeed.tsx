import {StyleSheet, View} from 'react-native';

import Avatar from '../molecules/Avatar';
import Typography from '../Typography';
import Icon from '../atom/Icon/Icon';
import {heightSize, widthSize} from '../../utils/utils';
import colors from '../constants/colors';
import Label from '../molecules/Label';
import ActionButton from '../molecules/ActionButton';

export default function NewsFeed({}) {
  const data = [{}, {}, {}];
  return (
    <View>
      {data.map(() => (
        <View style={styles.newsCard}>
          <View style={styles.newsCardTop}>
            <View style={{flexDirection: 'row', gap: 12}}>
              <Avatar size="large" state="photo" />
              <View>
                <Typography type="heading" size="xsmall" style={styles.title}>
                  Tilatuma
                </Typography>
                <Typography
                  type="paragraph"
                  size="small"
                  style={styles.subtitle}>
                  Financial Enthusiast
                </Typography>
                <Typography
                  type="paragraph"
                  size="xsmall"
                  style={styles.subtitle}>
                  1 menit yang lalu
                </Typography>
              </View>
            </View>
            <Icon name="ellipsis" />
          </View>
          <View style={{marginTop: heightSize(12)}}>
            <Typography type="heading" size="medium" style={styles.title}>
              Buat yang pegang GoTo
            </Typography>
            <Typography type="paragraph" size="medium" style={styles.title}>
              #MasiGoto
            </Typography>
          </View>
          <View style={{marginVertical: heightSize(12)}}>
            <Label variant="primary" fill={colors.green100}>
              <Typography
                type="heading"
                size="xsmall"
                style={{color: colors.green600}}>
                Investasi
              </Typography>
            </Label>
          </View>
          <View style={{flexDirection: 'row', gap: widthSize(8)}}>
            <ActionButton onPress={() => {}}>
              <View style={styles.buttonContainer}>
                <Icon name="arrow-up" fill={colors.neutral700} />
                <Typography type="paragraph" size="small" style={styles.title}>
                  0
                </Typography>
                <View
                  style={{
                    width: 1,
                    height: 16,
                    backgroundColor: colors.neutral400,
                    marginHorizontal: 12,
                  }}
                />
                <Icon name="arrow-down" fill={colors.neutral700} />
              </View>
            </ActionButton>
            <ActionButton onPress={() => {}}>
              <View style={styles.buttonContainer}>
                <Icon name="comment" fill={colors.neutral700} />
                <Typography type="paragraph" size="small" style={styles.title}>
                  0
                </Typography>
              </View>
            </ActionButton>
            <ActionButton onPress={() => {}}>
              <View style={styles.buttonContainer}>
                <Icon name="retweet" fill={colors.neutral700} />
                <Typography type="paragraph" size="small" style={styles.title}>
                  0
                </Typography>
              </View>
            </ActionButton>
          </View>
        </View>
      ))}
      <View style={styles.seen}>
        <Typography type="paragraph" size="small" style={styles.seenText}>
          Semua feed sudah kamu lihat 🎉
        </Typography>
      </View>
      <View></View>
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
