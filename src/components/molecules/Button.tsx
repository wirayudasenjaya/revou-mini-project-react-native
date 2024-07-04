import React from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';

type ButtonProps = {
  variant: 'primary' | 'outline' | 'tertiary' | 'link';
  type: 'text' | 'icon-left' | 'icon-right' | 'icon';
  size: 'large' | 'medium' | 'small';
  disabled: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onPress: any;
};

export default function Button({
  variant,
  type,
  size,
  disabled,
  icon,
  children,
  onPress
}: ButtonProps) {
  const getButtonStyle = () => {
    let buttonStyle = {};

    switch (variant) {
      case 'primary':
        buttonStyle = { ...styles.primary };
        break;
      case 'outline':
        buttonStyle = { ...styles.outline };
        break;
      case 'tertiary':
        buttonStyle = { ...styles.tertiary };
        break;
      case 'link':
        buttonStyle = { ...styles.link };
        break;
    }

    switch (size) {
      case 'large':
        buttonStyle = { ...buttonStyle, ...styles.large };
        break;
      case 'medium':
        buttonStyle = { ...buttonStyle, ...styles.medium };
        break;
      case 'small':
        buttonStyle = { ...buttonStyle, ...styles.small };
        break;
    }

    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyle = {};

    switch (variant) {
      case 'primary':
        textStyle = { ...styles.primaryText };
        break;
      case 'outline':
        textStyle = { ...styles.outlineText };
        break;
      case 'tertiary':
        textStyle = { ...styles.tertiaryText };
        break;
      case 'link':
        textStyle = { ...styles.linkText };
        break;
    }

    return textStyle;
  };

  const buttonChild = () => {
    switch (type) {
      case 'icon-left':
        return (
          <View style={styles.iconLeftContainer}>
            {icon}
            {children}
          </View>
        );
      case 'icon-right':
        return (
          <View style={styles.iconRightContainer}>
            {children}
            {icon}
          </View>
        );
      case 'text':
      default:
        return children;
    }
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        disabled && styles.disabled,
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      {buttonChild()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: colors.purple600,
    borderRadius: 15,
  },
  outline: {
    borderColor: colors.purple600,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: 'transparent',
  },
  tertiary: {
    backgroundColor: colors.neutral300,
    borderRadius: 15,
  },
  link: {
    backgroundColor: 'transparent',
  },
  large: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  primaryText: {
    color: 'white',
  },
  outlineText: {
    color: colors.purple600,
  },
  tertiaryText: {
    color: colors.neutral700,
  },
  linkText: {
    color: colors.purple600,
  },
  disabled: {
    opacity: 0.6,
  },
  iconLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  iconRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
