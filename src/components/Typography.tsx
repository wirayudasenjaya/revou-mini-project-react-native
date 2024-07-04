import { StyleSheet, Text, TextStyle } from 'react-native';

type TypographyProps = {
  type: 'heading' | 'paragraph' | 'special';
  size: 'xxlarge' | 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall' | 'xxsmall';
  children: React.ReactNode;
	style?: TextStyle;
};

export default function Typography({ size, type, children, style }: TypographyProps) {
  const getSizeAndType = () => {
    switch (type) {
      case 'heading':
        switch (size) {
          case 'xxlarge':
            return styles.headingXXLarge;
          case 'xlarge':
            return styles.headingXLarge;
          case 'large':
            return styles.headingLarge;
          case 'medium':
            return styles.headingMedium;
          case 'small':
            return styles.headingSmall;
          case 'xsmall':
            return styles.headingXSmall;
          case 'xxsmall':
            return styles.headingXXSmall;
        }
        break;
      case 'paragraph':
        switch (size) {
          case 'large':
            return styles.paragraphLarge;
          case 'medium':
            return styles.paragraphMedium;
          case 'small':
            return styles.paragraphSmall;
          case 'xsmall':
            return styles.paragraphXSmall;
        }
        break;
      case 'special':
        switch (size) {
          case 'large':
            return styles.specialLarge;
          case 'medium':
            return styles.specialMedium;
          case 'small':
            return styles.specialSmall;
          case 'xsmall':
            return styles.specialXSmall;
          case 'xxsmall':
            return styles.specialXXSmall;
        }
        break;
    }
  };

  return <Text style={[getSizeAndType(), style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  headingXXLarge: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    fontFamily: 'Inter-Bold'
  },
  headingXLarge: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    fontFamily: 'Inter-Bold'
  },
  headingLarge: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    fontFamily: 'Inter-Bold'
  },
  headingMedium: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    fontFamily: 'Inter-Bold'
  },
  headingSmall: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
    fontFamily: 'Inter-Bold'
  },
  headingXSmall: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 20,
    fontFamily: 'Inter-Bold'
  },
  headingXXSmall: {
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 18,
    fontFamily: 'Inter-Bold'
  },
  paragraphLarge: {
    fontSize: 16,
    fontWeight: 'regular',
    lineHeight: 24,
  },
  paragraphMedium: {
    fontSize: 14,
    fontWeight: 'regular',
    lineHeight: 22,
    fontFamily: 'Inter-Regular'
  },
  paragraphSmall: {
    fontSize: 12,
    fontWeight: 'regular',
    lineHeight: 20,
    fontFamily: 'Inter-Regular'
  },
  paragraphXSmall: {
    fontSize: 10,
    fontWeight: 'regular',
    lineHeight: 18,
    fontFamily: 'Inter-Regular'
  },
  specialLarge: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    fontFamily: 'Inter-Regular'
  },
  specialMedium: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 22,
    fontFamily: 'Inter-Regular'
  },
  specialSmall: {
    fontSize: 12,
    fontStyle: 'italic',
    lineHeight: 20,
    fontFamily: 'Inter-Regular'
  },
  specialXSmall: {
    fontSize: 10,
    fontStyle: 'italic',
    lineHeight: 18,
    fontFamily: 'Inter-Regular'
  },
  specialXXSmall: {
    fontSize: 8,
    fontStyle: 'italic',
    lineHeight: 12,
    fontFamily: 'Inter-Regular'
  },
});
