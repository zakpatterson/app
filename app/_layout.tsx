import FontAwesome from '@expo/vector-icons/FontAwesome';
import FeatherIcons from '@expo/vector-icons/Feather';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../constants/Colors';
import { ApolloProvider, client } from '../helpers/apollo';

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
            name="event/[eventId]"
            options={{
              presentation: 'modal',
              title: 'Tapahtuma',
              headerLeft() {
                return <CloseButton />;
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
        </Stack>
      </ThemeProvider>
    </ApolloProvider>
  );
}

const CloseButton = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  if (!navigation.canGoBack()) {
    return null;
  }

  return (
    <Pressable onPress={() => router.back()}>
      {({ pressed }) => (
        <FeatherIcons
          name="x"
          size={25}
          color={Colors[colorScheme ?? 'light'].tint}
          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
        />
      )}
    </Pressable>
  );
};
