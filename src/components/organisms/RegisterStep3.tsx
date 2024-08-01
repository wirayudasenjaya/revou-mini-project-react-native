import {FlatList, Image, TouchableOpacity, View} from 'react-native';

import {SelectTopicsProps} from '../../utils/types';
import Typography from '../Typography';
import colors from '../constants/colors';

export default function RegisterStep3({
  topic,
  selectedTopic,
  handleSelectedTopic,
}: SelectTopicsProps) {
  return (
    <View>
      <FlatList
        data={topic}
        numColumns={3}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{marginBottom: 16}}
            onPress={() => {
              handleSelectedTopic({id: item.id, label: item.label});
            }}>
            <Image
              source={{uri: item.file?.full_path}}
              style={{
                width: 97,
                height: 97,
                borderRadius: 8,
                borderWidth: selectedTopic.some(topic => topic.id === item.id) ? 4 : 0,
                borderColor: colors.purple500,
              }}
            />
            <Typography
              type="heading"
              size="xsmall"
              numberOfLines={2}
              style={{
                width: 97,
                marginTop: 4,
                textAlign: 'center',
                
                color: selectedTopic.includes(item.id)
                  ? colors.purple700
                  : colors.neutral700,
              }}>
              {item.label}
            </Typography>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
