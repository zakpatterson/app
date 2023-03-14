import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Text from '../components/atoms/Text';
import Slider from '../components/atoms/Slider';
import MenuGroup from '../components/atoms/MenuGroup';
import MenuItem from '../components/atoms/MenuItem';

export default function MapScreen() {
  return (
    <View style={styles.root}>
      <MapView style={styles.root} mapType="hybrid">
        {/* SdF */}
        <Marker coordinate={{ latitude: 60.8977697, longitude: 26.9193624 }} />

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
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
