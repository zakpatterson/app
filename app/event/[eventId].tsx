import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image } from 'react-native';

import { Text, View } from '../../components/Themed';

import PlaceholderImageSrc from '../../assets/images/byman.jpeg';

export default function EventModalScreen() {
  return (
    <View style={styles.container}>
      <Image source={PlaceholderImageSrc} style={styles.headerImage} />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: 200,
  },
});
