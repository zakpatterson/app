import { StatusBar } from 'expo-status-bar';
import { Image, Platform, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { View } from '../../components/Themed';
import Text from '../../components/atoms/Text';
import Button from '../../components/atoms/Button';
import TextInput from '../../components/atoms/TextInput';
import FormControl from '../../components/atoms/FormControl';

import ProtectedSvg from '../../assets/images/protected.png';
import IllustrationSrc from '../../assets/images/illustration.png';

export default function CreateEventModalScreen() {
  return (
    <KeyboardAwareScrollView extraScrollHeight={32}>
      <View style={styles.container}>
        <Image source={IllustrationSrc} style={{ width: '100%', height: 300 }} resizeMode="contain" />
        <FormControl label="Otsikko">
          <TextInput />
        </FormControl>

        <FormControl label="Paikka">
          <TextInput />
        </FormControl>

        <View style={{ flexDirection: 'row', gap: 32 }}>
          <FormControl label="Alkaa" style={{ flex: 1 }}>
            <Button variant="textInput" />
          </FormControl>

          <FormControl label="Päättyy" style={{ flex: 1 }}>
            <Button variant="textInput" />
          </FormControl>
        </View>

        <FormControl label="Kuvaus">
          <TextInput multiline style={{ height: 300 }} />
        </FormControl>

        <FormControl label="Järjestäjä">
          <Button variant="textInput" />
        </FormControl>

        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Image source={ProtectedSvg} style={{ width: 48, height: 48 }} resizeMode="contain" />

          <Text style={{ flex: 1 }}>
            Moderaattori tarkistaa ilmoituksen ennen julkaisua ja voi oman harkintansa mukaan tehdä siihen muutoksia tai
            jättää ilmoituksen kokonaan julkaisematta. Kiitos yhteistyöstäsi!
          </Text>
        </View>
        <Button text="Lähetä tarkistettavaksi" variant="primary" />
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
    marginBottom: 32,
    gap: 32,
  },
  headerImage: {
    height: 200,
  },
});
