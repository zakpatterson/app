import React from 'react';
import { Pressable, StyleSheet, View, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import FeatherIcons from '@expo/vector-icons/Feather';

import Text from './Text';
import Colors from '../../constants/Colors';

interface Props {
  left: string;
  type?: 'input';
  right?: string;
  href?: string;
  onPress?(): void;
  content?: React.ReactNode;
}

export default function MenuItem(props: Props) {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';

  const isPressable = Boolean(props.href || props.onPress);

  return (
    <View
      style={{
        borderBottomWidth: 0.5,
        borderBottomColor: Colors[colorScheme].menuDivider,
      }}
    >
      <Pressable
        disabled={!isPressable}
        onPress={() => (props.href ? router.push(props.href) : props.onPress?.())}
        style={({ pressed }) => [
          styles.pressable,
          props.type === 'input' && styles.withInput,
          pressed && { backgroundColor: Colors[colorScheme].menuItemPressed },
        ]}
      >
        <Text style={{ flex: 1 }}>{props.left}</Text>
        <RightSide text={props.right} type={props.type} />
        <View>
          {isPressable && (
            <FeatherIcons name="chevron-right" size={16} color={Colors[colorScheme].text} style={styles.chevron} />
          )}
        </View>
      </Pressable>
      {props.content && <View style={{ padding: 16 }}>{props.content}</View>}
    </View>
  );
}

interface RightSideProps {
  type?: 'input';
  text?: string;
}

function RightSide(props: RightSideProps) {
  const colorScheme = useColorScheme() ?? 'light';

  if (props.type === 'input') {
    return (
      <View
        style={{
          backgroundColor: Colors[colorScheme].menuItemPressed,
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
        }}
      >
        <Text>{props.text}</Text>
      </View>
    );
  }

  return <Text>{props.text}</Text>;
}

const styles = StyleSheet.create({
  pressable: {
    padding: 16,
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  withInput: {
    paddingVertical: 8,
  },
  chevron: {
    opacity: 0.5,
  },
});
