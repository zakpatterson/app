import { StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

import { Pressable, Text, View } from './Themed';

import PlaceholderImageSrc from '../assets/images/byman.jpeg';

export default function CalendarEventListItem(props: Props) {
  return (
    <Link href="/modal" asChild>
      <Pressable style={styles.root}>
        <Image source={PlaceholderImageSrc} style={styles.image} />
        <View style={styles.rightSide}>
          <Text style={styles.title}>Pääsiäisboogiet 🐣</Text>
          <Text style={{ fontSize: 16 }}>Apr 7 – 10 (in a month)</Text>
          <Text style={{ fontSize: 16 }}>Dropzone EFLA</Text>

          <Text style={{ fontSize: 16 }}>Skydive Häme</Text>
        </View>
      </Pressable>
    </Link>
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
