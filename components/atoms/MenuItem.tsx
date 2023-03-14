import React from 'react';
import { Pressable, StyleSheet, View, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import FeatherIcons from '@expo/vector-icons/Feather';

import Text from './Text';
import Colors from '../../constants/Colors';

interface Props {
  left: string;
  right?: string;
  href?: string;
}

export default function MenuItem(props: Props) {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Pressable
      onPress={() => props.href && router.push(props.href)}
      style={({ pressed }) => [
        styles.root,
        { borderBottomColor: Colors[colorScheme].menuDivider },
        pressed && { backgroundColor: Colors[colorScheme].menuItemPressed },
      ]}
    >
      <Text style={{ flex: 1 }}>{props.left}</Text>
      {props.right && <Text>{props.right}</Text>}
      <View>
        {props.href && (
          <FeatherIcons name="chevron-right" size={16} color={Colors[colorScheme].text} style={styles.chevron} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  chevron: {
    opacity: 0.5,
  },
});
