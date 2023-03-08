import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { useEffect, useState } from 'react';
import { fetchMetar } from '../../helpers/metar';

export default function TabWeather() {
  const [latestMetar, setLatestMetar] = useState('');

  useEffect(() => {
    fetchMetar('EFUT').then((weather) =>
      // prettier-ignore
      setLatestMetar(weather['wfs:FeatureCollection']['wfs:member'][0]['avi:VerifiableMessage'][0]['avi:metadata'][0]['avi:MessageMetadata'][0]['avi:source'][0]['avi:Process'][0]['avi:input'][0])
    );
  }, []);

  return (
    <View style={styles.root}>
      <Text>{latestMetar}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
