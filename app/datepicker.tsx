import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Pressable, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Day, useLilius } from 'use-lilius';
import * as Haptics from 'expo-haptics';

import Colors from '../constants/Colors';
import Text from '../components/atoms/Text';

export default function DatePickerModal() {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  const { calendar, isSelected, select, selected } = useLilius({
    selected: [new Date()],
    weekStartsOn: Day.MONDAY,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: '500' }}>
        {selected[0]?.toLocaleDateString('fi', { month: 'long', year: 'numeric' })}
      </Text>
      {calendar[0].map((week, i) => (
        <View key={i} style={{ flexDirection: 'row', gap: 8 }}>
          {week.map((date) => (
            <Pressable
              key={date.toISOString()}
              style={{ flex: 1 }}
              onPress={() => {
                select(date, true);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              }}
            >
              <View
                style={{
                  backgroundColor: isSelected(date) ? themeColors.tint : undefined,
                  borderRadius: 40,
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text key={date.toISOString()}>{date.getDate()}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      ))}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  headerImage: {
    height: 200,
  },
  text: {
    fontSize: 16,
  },
});
