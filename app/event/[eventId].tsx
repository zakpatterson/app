import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image } from 'react-native';
import { useNavigation } from 'expo-router';

import Button from '../../components/atoms/Button';
import { View } from '../../components/Themed';

import PlaceholderImageSrc from '../../assets/images/byman.jpeg';
import Text from '../../components/atoms/Text';

export default function EventModalScreen() {
  const navigation = useNavigation();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: 'Pääsiäisboogiet',
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={PlaceholderImageSrc} style={styles.headerImage} />

      <View style={styles.padding}>
        {isAdded ? (
          <>
            <Text>
              Olet lisännyt tapahtuman omaan kalenteriisi. Näet omaan kalenteriin lisäämäsi tapahtumat etusivulta.
            </Text>
            <Button text="Poista omasta kalenterista" variant="secondary" onPress={() => setIsAdded(false)} />
          </>
        ) : (
          <>
            <Text>
              Lisäämällä tapahtuman omaan kalenteriisi, näet yhdestä paikasta mihin tapahtumiin aiot osallistua. Myös
              tapahtuman järjestäjä pystyy arvioimaan osallistujien määrän.
            </Text>
            <Button text="Lisää omaan kalenteriin" variant="primary" onPress={() => setIsAdded(true)} />
          </>
        )}
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padding: {
    padding: 16,
    gap: 16,
  },
  headerImage: {
    height: 200,
    width: '100%',
  },
});
