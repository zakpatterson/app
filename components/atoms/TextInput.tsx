import React from 'react';
import { TextInput as DefaultTextInput, StyleSheet, TextInputProps, View, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

export type Props = {
  flex?: number;
} & TextInputProps;

export default function TextInput(props: Props) {
  const { style, ...rest } = props;

  const colorScheme = useColorScheme() ?? 'light';
  const backgroundColor = Colors[colorScheme].raised1;
  const borderColor = Colors[colorScheme].raised2;
  const color = Colors[colorScheme].text;

  return (
    <DefaultTextInput
      style={[
        styles.root,
        {
          borderColor,
          backgroundColor,
          color,
        },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
    // paddingTop is overriden by React Native, thus it has to be set explicitly
    paddingTop: 16,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
