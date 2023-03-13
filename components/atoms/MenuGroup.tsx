import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

interface Props {
  children: React.ReactNode;
}

export default function MenuGroup(props: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  return <View style={[styles.root, { backgroundColor: Colors[colorScheme].menuItemIdle }]}>{props.children}</View>;
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 16,
    overflow: 'hidden',
  },
});
