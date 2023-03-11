import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Text, View, TextInput } from '../../components/Themed';

export default function CreateEventModalScreen() {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Kaikki käyttäjät voivat luoda tapahtumia yhteiseen kalenteriin</Text>

        <Text style={styles.text}>
          Pitääksemme palvelun laadun korkeana, moderaattorimme tarkistavat jokaisen tapahtuman julkaisukelpoisuuden.
        </Text>

        <Text style={styles.text}>
          Tarvittaessa moderaattorimme tekevät muutoksia ilmoitukseen tai jättävät sen julkaisematta.
        </Text>

        <Text style={styles.text}>
          Väärinkäyttötapauksissa moderaattorit varaavat oikeuden estää uusien tapahtumien luonnin käyttäjältä
        </Text>

        <Text style={styles.text}>Jotta tapahtuma voidaan julkaista ...</Text>

        <TextInput label="Otsikko" />

        <TextInput label="Kuvaus" multiline style={{ height: 200 }} />

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  headerImage: {
    height: 200,
  },
  text: {
    fontSize: 16,
  },
});
