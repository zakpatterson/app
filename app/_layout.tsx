import FontAwesome from '@expo/vector-icons/FontAwesome';
import FeatherIcon from '@expo/vector-icons/Feather';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import CloseButton from '../components/CloseButton';
import { ApolloProvider, client } from '../helpers/apollo';
import Colors from '../constants/Colors';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen
            name="auth"
            options={{
              headerShown: false,
              animation: 'fade_from_bottom',
            }}
          />

          <Stack.Screen
            name="event/[eventId]"
            options={{
              presentation: 'modal',
              headerTransparent: true,
              headerLeft() {
                return <CloseButton raised />;
              },
            }}
          />

          <Stack.Screen
            name="event/create"
            options={{
              presentation: 'fullScreenModal',
              title: 'Uusi tapahtuma',
              headerLeft() {
                return <CloseButton />;
              },
            }}
          />

          <Stack.Screen
            name="datepicker"
            options={{
              presentation: 'formSheet',
              title: 'Valitse päivämäärä',
              headerLeft() {
                return <CloseButton />;
              },
            }}
          />

          <Stack.Screen
            name="map"
            options={{
              title: 'Kartta',
              headerRight() {
                return (
                  <Link href="map-legend">
                    <FeatherIcon name="help-circle" size={24} color={Colors[colorScheme ?? 'light'].tint} />
                  </Link>
                );
              },
            }}
          />

          <Stack.Screen
            name="map-legend"
            options={{
              presentation: 'modal',
              title: 'Merkinnät kartalla',
              headerLeft() {
                return <CloseButton />;
              },
            }}
          />
        </Stack>
      </ThemeProvider>
    </ApolloProvider>
  );
}
