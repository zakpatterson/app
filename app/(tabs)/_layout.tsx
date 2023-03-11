import FeatherIcons from '@expo/vector-icons/Feather';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FeatherIcons>['name']; color: string }) {
  return <FeatherIcons size={20} style={{ marginBottom: -4 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Kalenteri',
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
          headerRight: () => (
            <Link href="/event/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FeatherIcons
                    name="plus"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Yhteisö',
          tabBarIcon: ({ color }) => <TabBarIcon name="message-square" color={color} />,
        }}
      />
      <Tabs.Screen
        name="weather"
        options={{
          title: 'Hyppykeli',
          tabBarIcon: ({ color }) => <TabBarIcon name="cloud" color={color} />,
          headerTitle: 'Dropzone EFUT',
          headerTitleAlign: 'left',
        }}
      />
    </Tabs>
  );
}
