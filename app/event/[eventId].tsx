import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';
import { ResizeMode, Video } from 'expo-av';

import Button from '../../components/atoms/Button';
import Text from '../../components/atoms/Text';
import { View } from '../../components/Themed';

import FooniOpenSrc from '../../assets/videos/fooni.mp4';

export default function EventModalScreen() {
  const navigation = useNavigation();
  const [isAdded, setIsAdded] = useState(false);

  function updateHeader(hasScrolledPast: boolean) {
    navigation.setOptions({
      title: hasScrolledPast ? 'Fööni Open 2023' : '',
      headerBlurEffect: hasScrolledPast ? 'regular' : undefined,
    });
  }

  useEffect(() => {
    updateHeader(false);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      onScroll={(e) => {
        updateHeader(e.nativeEvent.contentOffset.y >= 350);
      }}
      scrollEventThrottle={16}
    >
      <Video
        style={styles.headerImage}
        source={FooniOpenSrc}
        resizeMode={ResizeMode.COVER}
        isLooping
        isMuted
        shouldPlay

        //onPlaybackStatusUpdate={status => setStatus(() => status)}
      />

      <View style={styles.padding}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: '600' }}>Fööni Open 2023</Text>
          <Text>25.3.2023</Text>
        </View>
        {isAdded ? (
          <Button
            text="Poista omasta kalenterista"
            variant="secondary"
            onPress={() => {
              Alert.alert(
                'Poista omasta kalenterista',
                'Oletko varma että tahdot poistaa tapahtuman omasta kalenteristasi?',
                [
                  {
                    text: 'Älä poista',
                  },
                  {
                    style: 'destructive',
                    text: 'Poista omasta kalenterista',
                    onPress() {
                      setIsAdded(false);
                    },
                  },
                ]
              );
            }}
          />
        ) : (
          <Button
            text="Lisää omaan kalenteriin"
            variant="primary"
            onPress={() => {
              Alert.alert(
                'Lisää omaan kalenteriin',
                'Lisäämällä tapahtuman omaan kalenteriisi, näet yhdestä paikasta mihin tapahtumiin aiot osallistua. Myös tapahtuman järjestäjä pystyy arvioimaan osallistujien määrän.',
                [
                  {
                    isPreferred: true,
                    text: 'Lisää omaan kalenteriin',
                    onPress() {
                      setIsAdded(true);
                    },
                  },
                  {
                    text: 'Takaisin',
                  },
                ]
              );
            }}
          />
        )}
      </View>

      <View>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Text key={i}>
            FÖÖNI OPEN 2023 - Tunnelilentämisen Pohjoismaiden mestaruuskisat / Nordic Indoor Skydiving Championships
            Lajit / Disciplines: FS4 AAA / Open, AA, A & Rookie FS4 Scramble VFS 4way open D4W & D2W Open Solo Freestyle
            Open Solo Freestyle Intermediate Solo Speed ILMOITTAUTUMINEN ON AVATTU! / REGISTRATION IS OPEN! Virallinen
            kisakutsu ja lisätietoa löytyy kilpailun nettisivuilta / See the official invitation and more:
            http://bit.ly/FOONI-OPEN-2023 Fööni Open official FB-page: https://www.facebook.com/fooni.open/
          </Text>
        ))}
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScrollView>
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
    height: 400,
    width: '100%',
  },
});
