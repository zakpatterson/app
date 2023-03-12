import React from 'react';
import { View } from 'react-native';

import Text from './Text';

type Props = {
  label: string;
} & View['props'];

export default function FormControl(props: Props) {
  const { style, children, ...rest } = props;

  return (
    <View style={[{ gap: 4 }, style]} {...rest}>
      <Text>{props.label}</Text>
      {children}
    </View>
  );
}
