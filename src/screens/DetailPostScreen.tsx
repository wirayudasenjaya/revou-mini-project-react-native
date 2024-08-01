import {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import TextField from '../components/molecules/TextInput';
import PostCard from '../components/organisms/PostCard';
import {PostProps, StackParams} from '../utils/types';
import colors from '../components/constants/colors';
import Button from '../components/molecules/Button';
import Icon from '../components/atom/Icon/Icon';
import Typography from '../components/Typography';
import fetch from '../utils/fetch';

type ScreenProps = NativeStackScreenProps<StackParams, 'Detail'>;

export default function DetailPostScreen({route, navigation}: ScreenProps) {
  const {id} = route.params;
  const [data, setData] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = useCallback(() => {
    fetch.getSocial(`/v1/public/post/${id}`, {
      success: response => {
        setData(response.data.data);
        setLoading(false);
      },
      error: error => {
        console.log(error);
      },
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={{paddingTop: 24}}>
        <View style={styles.topMenu}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeTabs')}>
            <Icon name="chevron-left" width={20} height={20} />
          </TouchableOpacity>
          <Typography
            type="heading"
            size="medium"
            style={{flex: 1, color: colors.neutral700}}>
            Post
          </Typography>
        </View>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <PostCard post={data} onPress={() => {}} />
        )}
      </View>

      <View style={styles.bottomBar}>
        <View style={{flex: 1}}>
          <TextField
            state="default-no-label"
            type="text"
            placeholder="Ketik disini"
            value=""
            onChangeText={() => {}}
            onBlur={() => {}}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            variant="link"
            size="medium"
            type="icon"
            disabled={false}
            onPress={() => {}}>
            <Icon name="paper-plane" width={20} height={20} fill="#fff" />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  topMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    paddingBottom: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: colors.neutral300,
  },
  buttonContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    padding: 8,
    backgroundColor: colors.neutral400,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
