import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { refreshAccessToken } from '../helpers/auth';

import FormControl from '../components/atoms/FormControl';
import CloseButton from '../components/CloseButton';
import LegendRow from '../components/atoms/LegendRow';
import TextInput from '../components/atoms/TextInput';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';

import BeerIconSrc from '../assets/icons/icons8-beer-100.png';
import CalendarPlusIconSrc from '../assets/icons/icons8-calendar-plus-100.png';
import CommunicationIconSrc from '../assets/icons/icons8-communication-100.png';
import JournalIconSrc from '../assets/icons/icons8-journal-100.png';
import JourneyIconSrc from '../assets/icons/icons8-journey-100.png';
import PurchaseForEuroIconSrc from '../assets/icons/icons8-purchase-for-euro-100.png';

export default function AuthScreen() {
  const router = useRouter();
  const [state, setState] = useState<'intro' | 'email' | 'code' | 'userNotRegistered' | 'signUp'>('intro');

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>Kirjaudu sisään</Text>
          <CloseButton raised icon="x" />
        </View>
        <Text>Kirjautuneena käyttäjänä saat monia etuja</Text>
      </View>

      {state === 'intro' ? (
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.content}>
            <LegendRow
              title="Pidä päiväkirjaa hypyistäsi ja tunnelilennoistasi – tiedot pysyvät aina tallessa pilvessä"
              icon={JournalIconSrc}
            />
            <LegendRow title="Luo oma oppimispolkusi" icon={JourneyIconSrc} />
            <LegendRow title="Lisää tapahtumia omaan kalenteriisi" icon={CalendarPlusIconSrc} />
            <LegendRow title="Osallistu keskusteluihin" icon={CommunicationIconSrc} />
            <LegendRow title="Myy ja osta hyppy- ja tunnelikamoja kamakirppiksellä" icon={PurchaseForEuroIconSrc} />
            <LegendRow
              title="Vaihtuvia ruoka- ja juomatarjouksia Fööni Bar & Cafessa, jos Minari suostuu :)"
              icon={BeerIconSrc}
            />
          </View>
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}></View>
      )}

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {state === 'intro' && (
          <View style={styles.content}>
            <Button
              text="Aloita tästä"
              variant="primary"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                setState('email');
              }}
            />
          </View>
        )}
        {state === 'email' && (
          <View style={styles.content}>
            <Text>
              Kirjoita tähän henkilökohtainen sähköpostiosoitteesi ja lähetämme sinulle kertakäyttökoodin, jolla voit
              kirjautua sisään tai luoda uuden tilin
            </Text>

            <Text>Ethän käytä työsähköpostiosoitettasi</Text>

            <TextInput keyboardType="email-address" placeholder="Sähköpostiosoite" autoCapitalize="none" autoFocus />

            <Button
              text="Lähetä kertakäyttökoodi"
              variant="primary"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                setState('userNotRegistered');
              }}
            />
          </View>
        )}

        {state === 'userNotRegistered' && (
          <View style={styles.content}>
            <Text>
              Sähköpostiosoitteella hello@petja.me ei vielä ole käyttäjätiliä Paraportal-palvelussa, mutta voit
              seuraavaksi luoda sen.
            </Text>

            <Text>
              Tai mikäli sinulla on jo olemassaoleva käyttäjätili, voit yhdistää sähköpostiosoitteen hello@petja.me
              siihen. Tällöin voit kirjautua sisään kummalla tahansa sähköpostiosoitteella.
            </Text>

            <Button
              text="Luo uusi käyttäjätili"
              variant="primary"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                setState('signUp');
              }}
            />

            <Button
              text="Yhdistä olemassaolevaan käyttäjätiliin"
              variant="secondary"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                refreshAccessToken('foobar');
                router.back();
              }}
            />
          </View>
        )}

        {state === 'signUp' && (
          <View style={styles.content}>
            <Text>Uuden käyttäjätilin luonti</Text>

            <FormControl label="Etunimi">
              <TextInput placeholder="Etunimi" />
            </FormControl>

            <FormControl label="Sukunimi">
              <TextInput placeholder="Sukunimi" />
            </FormControl>

            <FormControl label="Käyttäjänimi">
              <TextInput placeholder="Käyttäjänimi" />
            </FormControl>

            <Button
              text="Valmis"
              variant="primary"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                refreshAccessToken('foobar');
                router.back();
              }}
            />
          </View>
        )}
      </KeyboardAvoidingView>
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
