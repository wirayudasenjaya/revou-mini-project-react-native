import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, ScrollView, TextInput, View} from 'react-native';

import Typography from './src/components/Typography';
import Button from './src/components/molecules/Button';
import colors from './src/components/constants/colors';
import ArrowCircleLeft from './src/components/atom/Icon/ArrowCircleLeft';
import Icon from './src/components/atom/Icon/Icon';
import TextField from './src/components/molecules/TextInput';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ padding: 10}}>
        <Typography type="heading" size="xxlarge">
          Heading XXLarge
        </Typography>
        <Typography type="paragraph" size="medium">
          Paragraph Medium
        </Typography>
        <Typography type="special" size="small">
          Special Small
        </Typography>
        <View style={{ marginVertical: 5 }} />
        <Button variant="primary" type="text" size="large" disabled={false}>
          <Typography
            type="heading"
            size="medium"
            style={{color: colors.neutral100, textAlign: 'center'}}>
            Primary
          </Typography>
        </Button>
        <View style={{ marginVertical: 5 }} />
        <Button variant="outline" type="text" size="large" disabled={false}>
          <Typography
            type="heading"
            size="medium"
            style={{color: colors.neutral700, textAlign: 'center'}}>
            Outline
          </Typography>
        </Button>
        <View style={{ marginVertical: 5 }} />
        <Button variant="tertiary" type="text" size="large" disabled={false}>
          <Typography
            type="heading"
            size="medium"
            style={{color: colors.neutral700, textAlign: 'center'}}>
            Tertiary
          </Typography>
        </Button>
        <View style={{ marginVertical: 5 }} />
        <Button variant="primary" type="text" size="large" disabled={true}>
          <Typography
            type="heading"
            size="medium"
            style={{color: colors.neutral100, textAlign: 'center'}}>
            Disabled
          </Typography>
        </Button>
        <View style={{ marginVertical: 5 }} />
        <Button variant="primary" type="text" size="small" disabled={false}>
          <Typography
            type="heading"
            size="medium"
            style={{color: colors.neutral100, textAlign: 'center'}}>
            Small
          </Typography>
        </Button>
        <View style={{ marginVertical: 5 }} />
        <Button variant="primary" type="icon-left" icon={<Icon name='arrow-circle-left' />} size="large" disabled={false}>
          <Typography
            type="heading"
            size="medium"
            style={{color: colors.neutral100}}>
            Icon Left
          </Typography>
        </Button>
        <View style={{ marginVertical: 5 }} />
        <Button variant="primary" type="icon-right" icon={<Icon name='check' />} size="large" disabled={false}>
          <Typography
            type="heading"
            size="medium"
            style={{color: colors.neutral100}}>
            Icon Right
          </Typography>
        </Button>
        <View style={{ marginVertical: 5 }} />
        <ArrowCircleLeft />
        <Icon name='arrow-circle-left' fill={colors.green700} width={100} height={100} />
        <Icon name='check' fill={colors.blue700} />
        <Icon name='eye' fill={colors.red700} />
        <TextField
          state="default"
          type="text"
          label="Default Text Input"
          placeholder="Enter text here"
        />
        <TextField
          state="positive"
          type="text"
          label="Positive Text Input"
          placeholder="Enter text here"
        />
        <TextField
          state="negative"
          type="password"
          label="Negative Password Input"
          placeholder="Enter password here"
          message="This is a negative state message"
        />
        <TextField
          state="focused"
          type="text"
          label="Focused Text Input"
          placeholder="Enter text here"
        />
        <TextField
          state="default-no-label"
          type="text"
          placeholder="No label text input"
        />
        <TextField
          state="disabled"
          type="text"
          placeholder="Disabled"
        />
        </ScrollView>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
