import {StyleSheet, View} from 'react-native';

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
        break;
      case 'secondary':
        labelStyle = {...styles.secondary, borderColor: fill};
        break;
      case 'tertiary':
        labelStyle = {...styles.tertiary, backgroundColor: fill};
        break;
    }

    return labelStyle;
  };

  return <View style={[styles.label, getLabelStyle()]}>{children}</View>;
}

const styles = StyleSheet.create({
	label: {
		alignSelf: 'flex-start',
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 16,
	},
  primary: {},
  secondary: {
    backgroundColor: 'white',
    borderWidth: 1,
  },
  tertiary: {},
});
