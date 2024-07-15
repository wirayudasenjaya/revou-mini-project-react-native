import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Typography from '../components/Typography';
import TextField from '../components/molecules/TextInput';
import {StackParams} from '../utils/types';
import Icon from '../components/atom/Icon/Icon';
import colors from '../components/constants/colors';
import Button from '../components/molecules/Button';
import { useContext, useState } from 'react';
import { PostContext } from '../utils/postContext';
import { UserContext } from '../utils/userContext';

type ScreenProps = NativeStackScreenProps<StackParams, 'Create'>;

export default function CreatePostScreen({navigation}: ScreenProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const {posts, setPosts} = useContext(PostContext);
  const {user} = useContext(UserContext)

  const getTypography = (type: string) => {
    switch (type) {
      case 'title':
        return styles.headingXLarge;
      case 'description':
        return styles.paragraphMedium;
    }
  };

  const handleCreate = () => {
    const newPost = {
      avatar_url: "https://s3-alpha-sig.figma.com/img/b472/1564/b04bd24355d7fcd28e8592df82f22e17?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L0E0VfTzpEVgsylQwpC3zYM~lyQlyt9U0u8WHZAuyXwl70zaw3txFb6zYrY9kfGa~L1dhc947f2AeCZ6Kew81~xQMEK4tnTgwcOUXRqcYYYLbNGsNJPJ-mOSIeFfbLtOJrhgof2nzQRauClb-95GwN8qbe5TTjrlVGrKJUSpRmKvsEXMPoQ5rlA74PSW~ScAXNUTYyM2zpOBuvpBlPFexGDtFC~7a3pm0iyGhhQ0lTFC7rBTcPNMS8tlaooQsEbA3gSPHFDLd3Ia6P5a7Ur244HVSywdf~zdq1JKNrVgiY3CnWmPbq-RDK9S6R1IT8rCFwyr8dzGRBYV-yaw8Q9Z3A__",
      name: user,
      headline: 'Software Engineer',
      created_at: new Date(),
      post_header: title,
      post_content: description,
      post_topic: topic,
      post_upvote: 0,
      post_retweet: 0,
      post_comment: 0,
    }

    setPosts(prev => [...prev, newPost]);
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{flex: 1, padding: 24, backgroundColor: 'white'}}>
      <View
        style={styles.topMenu}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeTabs')}>
          <Icon name="chevron-left" width={20} height={20} />
        </TouchableOpacity>
        <Typography
          type="heading"
          size="medium"
          style={{flex: 1, color: colors.neutral700}}>
          Buat
        </Typography>
        <Button type="text" variant="primary" size="small" disabled={false} onPress={handleCreate}>
          <Typography
            type="heading"
            size="xsmall"
            style={{color: 'white'}}>
            Post
          </Typography>
        </Button>
      </View>
      <TextField
        state="default-no-label"
        type="text"
        placeholder="Topic"
        value={topic}
        onChangeText={text => setTopic(text)}
        onBlur={() => {}}
      />
      <TextInput
        placeholder="Judul"
        style={[getTypography('title'), styles.input]}
        onChangeText={(value) => setTitle(value)}
      />
      <TextInput
        placeholder="Deskripsi"
        style={[getTypography('description'), styles.input]}
        onChangeText={(value) => setDescription(value)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingVertical: 12,
    paddingBottom: 16,
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
});
