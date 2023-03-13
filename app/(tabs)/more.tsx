import { StyleSheet, View } from 'react-native';

import MenuGroup from '../../components/atoms/MenuGroup';
import MenuItem from '../../components/atoms/MenuItem';

export default function TabEventCalendar() {
  return (
    <View style={styles.container}>
      <MenuGroup>
        <MenuItem left="Hyppykeli" href="/weather" />
        <MenuItem left="Siipikuormalaskuri" />
      </MenuGroup>
      <MenuGroup>
        <MenuItem left="Kirjaudu ulos" href="/auth" />
      </MenuGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
});
