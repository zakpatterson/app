import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { Text, View } from '../../components/Themed';

export default function TabWeather() {
  return (
    <View style={styles.root}>
      <Text>Tulossa pian :)</Text>
      <Link href="/auth">
        <Text>Kirjaudu ulos</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    gap: 32,
  },
});
