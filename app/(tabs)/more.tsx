import { StyleSheet, ScrollView } from 'react-native';

import { View } from '../../components/Themed';
import Text from '../../components/atoms/Text';

export default function TabEventCalendar() {
  return (
    <View style={styles.container}>
      <Text>Moikka :)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
