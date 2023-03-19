import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { refreshAccessToken } from '../helpers/auth';

import CloseButton from '../components/CloseButton';
import LegendRow from '../components/atoms/LegendRow';
import TextInput from '../components/atoms/TextInput';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';

import BeerIconSrc from '../assets/icons/icons8-beer-100.png';
import CalendarPlusIconSrc from '../assets/icons/icons8-calendar-plus-100.png';
import CommunicationIconSrc from '../assets/icons/icons8-communication-100.png';
import JournalIconSrc from '../assets/icons/icons8-journal-100.png';
import PurchaseForEuroIconSrc from '../assets/icons/icons8-purchase-for-euro-100.png';

export default function AuthScreen() {
  const router = useRouter();
  const [state, setState] = useState<'email' | 'code'>('email');

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>Kirjaudu sisään</Text>
          <CloseButton raised icon="x" />
        </View>
        <Text>Saat monia etuja kun kirjaudut sisään</Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.content}>
          <LegendRow title="Pidä päiväkirjaa hypyistäsi ja tunnelilennoistasi" icon={JournalIconSrc} />
          <LegendRow title="Lisää tapahtumia omaan kalenteriisi" icon={CalendarPlusIconSrc} />
          <LegendRow title="Osallistu keskusteluihin" icon={CommunicationIconSrc} />
          <LegendRow title="Myy ja osta hyppy- ja tunnelikamoja kamakirppiksellä" icon={PurchaseForEuroIconSrc} />
          <LegendRow
            title="Jos Minari suostuu niin vois tehdä vaikka sellasen kuponkisysteemin jolla jengi saa silloin tällöin jotain alennuksia esim. bisse -2€"
            icon={BeerIconSrc}
          />
        </View>
      </ScrollView>

      {state === 'email' && (
        <View style={styles.content}>
          <Text>
            Kirjoita tähän sähköpostiosoitteesi ja lähetämme sinulle kertakäyttökoodin, jolla voit kirjautua sisään tai
            luoda uuden tilin
          </Text>

          <TextInput keyboardType="email-address" placeholder="Sähköpostiosoite" autoCapitalize="none" autoFocus />

          <Button
            text="Lähetä kertakäyttökoodi"
            variant="primary"
            onPress={() => {
              setState('code');
            }}
          />
        </View>
      )}

      {state === 'code' && (
        <View style={styles.content}>
          <Text>Kirjoita tähän sähköpostitse sinulle lähettämämme koodi</Text>

          <TextInput
            keyboardType="number-pad"
            placeholder="Koodi"
            autoFocus
            style={{ fontSize: 32, textAlign: 'center' }}
          />

          <Button
            text="Tarkista"
            variant="primary"
            onPress={() => {
              refreshAccessToken('foobar');
              router.back();
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 16,
  },
});
