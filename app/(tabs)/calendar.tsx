import { StyleSheet, ScrollView } from 'react-native';

import { View } from '../../components/Themed';
import Tabs from '../../components/Tabs';
import CalendarEventListItem from '../../components/CalendarEventListItem';

export default function TabEventCalendar() {
  return (
    <View style={styles.container}>
      <Tabs
        items={[
          'Kelppari A',
          'Kelppari B',
          'Kelppari C',
          'Kelppari D',
          '🥕 Oppilastoiminta',
          '🏆 Kilpailut',
          '🫓 FS',
          '🤸‍♀️ Freestyle',
          '📐 Kulma',
          '🐿️ WS',
          '👥 CF',
          '💀 Swoop',
          '🪂 Taivas',
          '💨 Tunneli',
          '🍻 Oheistoiminta',
          '🦺 Turvallisuus',
          '🫡 Kerhotoiminta',
        ]}
        selectedIndex={0}
      />
      <ScrollView>
        <View style={styles.list}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((i) => (
            <CalendarEventListItem key={i} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
