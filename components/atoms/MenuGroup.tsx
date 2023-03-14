import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import Text from './Text';

interface Props {
  title?: string;
  children: React.ReactNode;
}

export default function MenuGroup(props: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View style={styles.root}>
      {props.title && <Text>{props.title}</Text>}
      <View style={[styles.group, { backgroundColor: Colors[colorScheme].menuItemIdle }]}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 8,
  },
  group: {
    borderRadius: 16,
    overflow: 'hidden',
  },
});
