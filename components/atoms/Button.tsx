import React from 'react';
import { Pressable, Text, useColorScheme, StyleSheet, StyleProp, ViewStyle, PressableProps } from 'react-native';

import Colors from '../../constants/Colors';

export type Props = {
  text?: string;
  variant: 'primary' | 'secondary' | 'tertiary' | 'textInput';
  style?: StyleProp<ViewStyle>;
} & PressableProps;

export default function Button(props: Props) {
  const { style, variant, text, ...rest } = props;

  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  function getBackgroundColor(pressed: boolean): StyleProp<ViewStyle> {
    if (variant === 'primary') {
      return { backgroundColor: pressed ? themeColors.pressed : themeColors.primary };
    } else if (variant === 'secondary') {
      return { backgroundColor: themeColors.secondaryButton };
    } else if (variant === 'textInput') {
      return { backgroundColor: themeColors.raised1 };
    }
  }

  function getBorder(): StyleProp<ViewStyle> {
    if (variant === 'textInput') {
      return { borderWidth: 1, borderColor: themeColors.raised2 };
    }
  }

  return (
    <Pressable style={({ pressed }) => [styles.root, getBackgroundColor(pressed), getBorder(), style]} {...rest}>
      <Text style={[styles.text]}>{text ?? ' '}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  text: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500',
  },
});
