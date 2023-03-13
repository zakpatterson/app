import React from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import FeatherIcons from '@expo/vector-icons/Feather';

import Colors from '../constants/Colors';

interface Props {
  raised?: boolean;
}

export default function CloseButton(props: Props) {
  const router = useRouter();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  if (!navigation.canGoBack()) {
    return null;
  }

  return (
    <Pressable onPress={() => router.back()} style={[styles.root, props.raised && styles.raised]}>
      {({ pressed }) => (
        <FeatherIcons
          name="chevron-left"
          size={24}
          color={props.raised ? '#333' : Colors[colorScheme ?? 'light'].tint}
          style={{ opacity: pressed ? 0.5 : 1 }}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    height: 32,
    width: 32,
  },
  raised: {
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    backgroundColor: '#FFF',
  },
});
