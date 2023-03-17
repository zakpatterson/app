import { StyleSheet, View } from 'react-native';

import { config } from '../../helpers/config';

import Text from '../../components/atoms/Text';
import MenuGroup from '../../components/atoms/MenuGroup';
import MenuItem from '../../components/atoms/MenuItem';

export default function TabEventCalendar() {
  return (
    <View style={styles.container}>
      <MenuGroup>
        <MenuItem left="Kartta" href="/map" />
        <MenuItem left="Hyppykeli" href="/weather" />
        <MenuItem left="Siipikuormalaskuri" href="/wingload" />
      </MenuGroup>
      <MenuGroup>
        <MenuItem left="Kirjaudu ulos" href="/auth" />
      </MenuGroup>
      <Text>{JSON.stringify(config, null, 2)}</Text>
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
