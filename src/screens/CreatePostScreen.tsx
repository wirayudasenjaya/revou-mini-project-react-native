import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Dropdown} from 'react-native-element-dropdown';
import analytics from '@react-native-firebase/analytics';

import Typography from '../components/Typography';
import {StackParams} from '../utils/types';
import Icon from '../components/atom/Icon/Icon';
import colors from '../components/constants/colors';
import Button from '../components/molecules/Button';
import {useContext, useEffect, useState} from 'react';
import {PostContext} from '../utils/postContext';
import {UserContext} from '../utils/userContext';
import fetch from '../utils/fetch';
import { storageService } from '../services';

type ScreenProps = NativeStackScreenProps<StackParams, 'Create'>;

export default function CreatePostScreen({navigation}: ScreenProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState([]);
  const [value, setValue] = useState('');
  const {setPosts} = useContext(PostContext);
  const {user} = useContext(UserContext);

  const getTypography = (type: string) => {
    switch (type) {
      case 'title':
        return styles.headingXLarge;
      case 'description':
        return styles.paragraphMedium;
    }
  };

  const handleCreate = () => {
    const formData = new FormData();
    formData.append('content', description);
    formData.append('header', title);
    formData.append('is_anonim', false);
    formData.append('topic_id', value);
    const username = storageService.getUsername();
    const email = storageService.getEmail();
    fetch.postSocialFormData(`/v2/post`, formData, {
      success: async (response) => {
        await analytics().logEvent('success_create_post', {
          username: username,
          email: email
        });
        ToastAndroid.show('Success Create Post', ToastAndroid.SHORT);
        navigation.goBack();
      },
      error: async (error) => {
        await analytics().logEvent('failed_create_post', {
          username: username,
          email: email,
          error_message: error.response.data.message
        });
        ToastAndroid.show('Unable to create post', ToastAndroid.SHORT);
      },
    });
  };

  useEffect(() => {
    fetch.getSocialDev(`/v1/public/masterdata/topic`, {
      success: response => {
        const list = response.data.data.map(item => ({
          label: item.label,
          value: item.id,
        }));
        setTopic(list);
      },
      error: error => {
        console.log(error);
      },
    });
  }, []);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.topMenu}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeTabs')}>
          <Icon name="chevron-left" width={20} height={20} />
        </TouchableOpacity>
        <Typography type="heading" size="medium" style={styles.headerTitle}>
          Buat
        </Typography>
        <Button
          type="text"
          variant="primary"
          size="small"
          disabled={title === '' || description === '' || value === ''}
          onPress={handleCreate}>
          <Typography type="heading" size="xsmall" style={{color: 'white'}}>
            Post
          </Typography>
        </Button>
      </View>
      {/* <TextField
        state="default-no-label"
        type="text"
        placeholder="Topic"
        value={topic}
        onChangeText={text => setTopic(text)}
        onBlur={() => {}}
      /> */}
      <Dropdown
        style={styles.dropdown}
        data={topic}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
      />
      <TextInput
        placeholder="Judul"
        style={[getTypography('title'), styles.input]}
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        placeholder="Deskripsi"
        style={[getTypography('description'), styles.input]}
        onChangeText={value => setDescription(value)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  topMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingVertical: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    flex: 1,
    color: colors.neutral700,
  },
  input: {
    marginTop: 32,
  },
  headingXLarge: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    fontFamily: 'Inter-Bold',
  },
  paragraphMedium: {
    fontSize: 14,
    fontWeight: 'regular',
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
  dropdown: {
    marginVertical: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
