import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Geojson, Marker, GeojsonProps } from 'react-native-maps';

import HomeIconSrc from '../assets/icons/icons8-home-96.png';
import WindsockIconSrc from '../assets/icons/icons8-windsock-96.png';
import GoalIconSrc from '../assets/icons/icons8-goal-96.png';
import NoEntryIconSrc from '../assets/icons/icons8-no-entry-96.png';
import RucksackIconSrc from '../assets/icons/icons8-rucksack-96.png';
import TakeoffIconSrc from '../assets/icons/icons8-airplane-take-off-96.png';

import UttiGeoJSON from '../assets/geojson/efut.json';

function coerceGeojson(data: unknown): GeojsonProps['geojson'] {
  return data as GeojsonProps['geojson'];
}

export default function MapScreen() {
  return (
    <View style={styles.root}>
      <MapView style={styles.root} mapType="hybrid" showsPointsOfInterest={false}>
        {/* SdF */}
        <Marker coordinate={{ latitude: 60.8977697, longitude: 26.9193624 }} image={HomeIconSrc} />
        <Marker coordinate={{ latitude: 60.8962929, longitude: 26.9256754 }} image={WindsockIconSrc} />
        <Marker coordinate={{ latitude: 60.897627, longitude: 26.926096 }} image={GoalIconSrc} />
        <Marker coordinate={{ latitude: 60.8928867, longitude: 26.925906 }} image={NoEntryIconSrc} />
        <Marker coordinate={{ latitude: 60.8950937, longitude: 26.9532117 }} image={NoEntryIconSrc} />
        <Marker coordinate={{ latitude: 60.8979303, longitude: 26.9201116 }} image={RucksackIconSrc} />
        <Marker coordinate={{ latitude: 60.8969242, longitude: 26.9193471 }} image={TakeoffIconSrc} />

        {/* Vesis */}
        <Marker coordinate={{ latitude: 61.1491239, longitude: 25.6875153 }} />

        {/* Turku */}
        <Marker coordinate={{ latitude: 60.5087954, longitude: 22.2636276 }} />

        {/* Karjala */}
        <Marker coordinate={{ latitude: 61.2482849, longitude: 28.8954431 }} />

        {/* Jämi */}
        <Marker coordinate={{ latitude: 61.7806924, longitude: 22.7219118 }} />

        {/* Pori */}
        <Marker coordinate={{ latitude: 61.4627744, longitude: 21.8049771 }} />

        {/* Vaasa */}
        <Marker coordinate={{ latitude: 63.0345426, longitude: 21.7414303 }} />

        {/* Alavus */}
        <Marker coordinate={{ latitude: 62.5549554, longitude: 23.5641548 }} />

        {/* Jyväskylä */}
        <Marker coordinate={{ latitude: 62.4090321, longitude: 25.6708152 }} />

        {/* Kuopio */}
        <Marker coordinate={{ latitude: 63.0105362, longitude: 27.7867077 }} />

        {/* Oulu */}
        <Marker coordinate={{ latitude: 64.9317604, longitude: 25.3780738 }} />

        {/* Kemi */}
        <Marker coordinate={{ latitude: 65.7775386, longitude: 24.5719851 }} />

        <Geojson geojson={coerceGeojson(UttiGeoJSON)} fillColor="rgba(128,0,0,0.25)" strokeColor="red" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
