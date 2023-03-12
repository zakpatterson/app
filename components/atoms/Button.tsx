import React from 'react';
import {
  Pressable,
  Text,
  useColorScheme,
  StyleSheet,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

import Colors from '../../constants/Colors';

export interface Props {
  text?: string;
  variant: 'primary' | 'secondary' | 'tertiary' | 'textInput';
  style?: StyleProp<ViewStyle>;
}

export default function Button(props: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  function getBackgroundColor(pressed: boolean): StyleProp<ViewStyle> {
    if (props.variant === 'primary') {
      return { backgroundColor: pressed ? themeColors.pressed : themeColors.primary };
    } else if (props.variant === 'textInput') {
      return { backgroundColor: themeColors.raised1 };
    }
  }

  function getBorder(): StyleProp<ViewStyle> {
    if (props.variant === 'textInput') {
      return { borderWidth: 1, borderColor: themeColors.raised2 };
    }
  }

  return (
    <Pressable style={({ pressed }) => [styles.root, getBackgroundColor(pressed), getBorder(), props.style]}>
      <Text style={[styles.text]}>{props.text ?? ' '}</Text>
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
