import React from 'react';
import { Text as DefaultText, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';

type Props = DefaultText['props'];

export default function Text(props: Props) {
  const { style, ...rest } = props;

  const colorScheme = useColorScheme() ?? 'light';
  const color = Colors[colorScheme].text;

  return <DefaultText style={[{ color, fontSize: 16 }, style]} {...rest} />;
}
