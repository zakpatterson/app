/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
  Pressable as DefaultPressable,
  PressableProps as DefaultPressableProps,
  TextInput as DefaultTextInput,
} from 'react-native';

import Colors from '../constants/Colors';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type PressableProps = { level: 0 | 1 | 2 } & ThemeProps & DefaultPressableProps;
export type TextInputProps = { label?: string } & ThemeProps & DefaultTextInput['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color, fontSize: 16 }, style]} {...otherProps} />;
}

export function Pressable(props: PressableProps) {
  const { style, lightColor, darkColor, level, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, `raised${level}`);

  return <DefaultPressable style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style: passthruStyle, lightColor, darkColor, label, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'raised1');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const style = {
    padding: 16,
    // paddingTop is overriden by React Native, thus it has to be set explicitly
    paddingTop: 16,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor,
    color,
  };

  return (
    <View style={{ gap: 4 }}>
      {label && <Text>{label}</Text>}
      <DefaultTextInput style={[style, passthruStyle]} {...otherProps} />
    </View>
  );
}
