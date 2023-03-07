import { StyleSheet, Image } from 'react-native';

import { Text, View } from './Themed';

import PlaceholderImageSrc from '../assets/images/byman.jpeg';

export default function CalendarEventListItem(props: Props) {
  return (
    <View style={styles.root}>
      <Image source={PlaceholderImageSrc} style={styles.image} />
      <View style={styles.rightSide}>
        <Text style={styles.title}>Pääsiäisboogiet 🐣</Text>
        <Text style={{ fontSize: 16 }}>Apr 7 – 10 (in a month)</Text>
        <Text style={{ fontSize: 16 }}>Dropzone EFLA</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Text style={{ fontSize: 16 }}>YL-KAO</Text>
          <Text style={{ fontSize: 16 }}>OH-DZF</Text>
        </View>
        <Text style={{ fontSize: 16 }}>By: Skydive Häme</Text>
        <View darkColor="hsl(219,94%,58%)" style={{ borderRadius: 100, padding: 10 }}>
          <Text style={{ fontSize: 16 }}>Lisää omaan kalenteriin</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 16,
  },
  rightSide: {
    flex: 1,
  },
  image: {
    width: 120,
    height: 'auto',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
