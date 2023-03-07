import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import Tabs from '../../components/Tabs';
import CalendarEventListItem from '../../components/CalendarEventListItem';

export default function TabEventCalendar() {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
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
        <CalendarEventListItem />
        <CalendarEventListItem />
        <CalendarEventListItem />
      </View>
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
