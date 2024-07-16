import { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import Typography from '../Typography';
import Icon from '../atom/Icon/Icon';

type TextInputProps = {
  state: 'default' | 'positive' | 'negative' | 'focused' | 'default-no-label' | 'disabled';
  type: 'text' | 'email' | 'password';
  visible?: boolean;
  label?: string;
  placeholder?: string;
  message?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
};

export default function TextField({
  state,
  type,
  visible,
  label,
  placeholder,
  message,
  value,
  onChangeText,
  onBlur,
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const getStyleByState = () => {
    if (isFocused) {
      return styles.inputTextContainerFocused;
    }
    switch (state) {
      case 'default':
      case 'default-no-label':
        return styles.inputTextContainerDefault;
      case 'positive':
        return styles.inputTextContainerPositive;
      case 'negative':
        return styles.inputTextContainerNegative;
      case 'focused':
        return styles.inputTextContainerFocused;
      case 'disabled':
        return styles.inputTextContainerDisabled;
    }
  };

  const getTextStyleByState = () => {
    switch (state) {
      case 'default':
        return styles.inputTextDefault;
      case 'default-no-label':
        return styles.inputTextDefault;
      case 'disabled':
        return styles.inputTextDisabled;
      default:
        return null;
    }
  };

  return (
    <View>
      {label && <Typography type="heading" size="small" style={styles.label}>
        {label}
      </Typography>}
      <View style={[styles.inputTextContainer, getStyleByState()]}>
        <TextInput
          secureTextEntry={type === 'password' && isVisible === false}
          editable={state !== 'disabled'}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral500}
          style={[styles.inputText, getTextStyleByState()]}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
        />
        {type === 'password' && (
          <TouchableOpacity style={{ padding: 5 }} onPress={() => setIsVisible(!isVisible)}>
            <Icon name="eye" />
          </TouchableOpacity>
        )}
      </View>
      {state === 'negative' && (
        <Typography type="paragraph" size="small" style={styles.message}>
          {message}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingBottom: 8,
    color: colors.neutral700,
  },
  message: {
    color: colors.red500,
  },
  inputText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    padding: 0,
    height: 40,
    flex: 1,
  },
  inputTextContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputTextContainerDefault: {
    borderColor: colors.neutral300,
    backgroundColor: colors.neutral200,
  },
  inputTextContainerPositive: {
    borderColor: colors.green500,
    backgroundColor: colors.green100,
  },
  inputTextContainerNegative: {
    borderColor: colors.red500,
    backgroundColor: colors.red100,
  },
  inputTextContainerFocused: {
    borderColor: colors.purple500,
    backgroundColor: colors.purple100,
  },
  inputTextContainerDisabled: {
    borderColor: colors.neutral300,
    backgroundColor: colors.neutral200,
  },
  inputTextDefault: {
    color: colors.neutral500,
  },
  inputTextPositive: {},
  inputTextNegative: {},
  inputTextFocused: {},
  inputTextDisabled: {
    color: colors.neutral400,
  },
});
