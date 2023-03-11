import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';

export default function TabWeather() {
  return (
    <View style={styles.root}>
      <Text>Tulossa pian :)</Text>
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
