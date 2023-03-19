import React from 'react';
import { Image, ImageSourcePropType, View, StyleSheet } from 'react-native';

import Text from './Text';

interface Props {
  icon: ImageSourcePropType;
  title: string;
}

export default function LegendRow(props: Props) {
  return (
    <View style={styles.root}>
      <Image source={props.icon} style={{ height: 50, width: 50 }} />
      <Text style={{ flex: 1 }}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});
