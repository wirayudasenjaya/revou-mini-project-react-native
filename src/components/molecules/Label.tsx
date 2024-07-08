import {StyleSheet, View} from 'react-native';
import { heightSize, widthSize } from '../../utils/utils';

type LabelProps = {
  variant: 'primary' | 'secondary' | 'tertiary';
  fill?: string;
  children: React.ReactNode;
};

export default function Label({variant, children, fill}: LabelProps) {
  const getLabelStyle = () => {
    let labelStyle = {};

    switch (variant) {
      case 'primary':
        labelStyle = {...styles.primary, backgroundColor: fill};
      case 'secondary':
        labelStyle = {...styles.secondary, backgroundColor: fill};
      case 'tertiary':
        labelStyle = {...styles.tertiary, backgroundColor: fill};
    }

    return labelStyle;
  };

  return <View style={[styles.label, getLabelStyle()]}>{children}</View>;
}

const styles = StyleSheet.create({
	label: {
		alignSelf: 'flex-start',
		paddingHorizontal: widthSize(12),
		paddingVertical: heightSize(4),
		borderRadius: 16,
	},
  primary: {},
  secondary: {},
  tertiary: {},
});
