import { StyleSheet, View } from 'react-native';

import { refreshAccessToken, signOut, useAuth } from '../../helpers/auth';
import { config } from '../../helpers/config';

import Text from '../../components/atoms/Text';
import MenuGroup from '../../components/atoms/MenuGroup';
import MenuItem from '../../components/atoms/MenuItem';

export default function TabEventCalendar() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      {user ? (
        <MenuGroup>
          <MenuItem left="Hei, Petja!" />
          <MenuItem left="Kirjaudu ulos" onPress={() => signOut()} />
        </MenuGroup>
      ) : (
        <MenuGroup>
          <MenuItem left="Kirjaudu sisään" onPress={() => refreshAccessToken('foobar')} />
        </MenuGroup>
      )}

      <MenuGroup>
        <MenuItem left="Kartta" href="/map" />
        <MenuItem left="Hyppykeli" href="/weather" />
        <MenuItem left="Siipikuormalaskuri" href="/wingload" />
      </MenuGroup>

      <Text>{JSON.stringify({ config, user }, null, 2)}</Text>
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
