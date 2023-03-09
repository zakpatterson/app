import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import * as Haptics from 'expo-haptics';

import { Text, View, Pressable } from './Themed';

interface Props {
  items: string[];
  selectedIndex: number;
}

export default function Tabs(props: Props) {
  const [selected, setSelected] = useState<number[]>([]);

  function toggleItem(item: number) {
    const index = selected.indexOf(item);

    if (index === -1) {
      setSelected([...selected, item]);
    } else {
      const copy = [...selected];
      copy.splice(index, 1);

      setSelected(copy);
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  return (
    <View>
      <ScrollView style={styles.root}>
        <View style={styles.container}>
          {props.items.map((text, i) => (
            <Pressable
              key={i}
              level={1}
              style={[styles.tab, selected.includes(i) && styles.active]}
              onPress={() => toggleItem(i)}
            >
              <Text style={{ fontSize: 16 }}>{text}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    height: 150,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tab: {
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  active: {
    backgroundColor: 'hsl(219,94%,58%)',
  },
});
