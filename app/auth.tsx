import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import Button from '../components/atoms/Button';

import PlaceholderImageSrc from '../assets/images/byman.jpeg';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const router = useRouter();

  return (
    <ImageBackground source={PlaceholderImageSrc} style={styles.container}>
      <View style={styles.layer1}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']} style={styles.top}>
          <SafeAreaView>
            <Text style={styles.appName}>App Name</Text>
          </SafeAreaView>
        </LinearGradient>

        <View style={{ flex: 1 }}></View>

        <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']} style={styles.bottom}>
          <SafeAreaView>
            <Button text="Kirjaudu sisään" variant="primary" onPress={() => router.push('/')} />
          </SafeAreaView>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layer1: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  appName: {
    fontSize: 48,
    color: '#FFF',
    fontWeight: 'bold',
  },
  top: {
    padding: 32,
    alignItems: 'center',
  },
  bottom: {
    padding: 32,
  },
});
