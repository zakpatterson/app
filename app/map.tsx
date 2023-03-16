import React, { RefObject, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Geojson, Marker, GeojsonProps, Region, Details } from 'react-native-maps';

import AltitudeMeter from '../components/AltitudeMeter';

import HouseIconSrc from '../assets/icons/icons8-house-100.png';
import WindsockIconSrc from '../assets/icons/icons8-windsock-100.png';
import GoalIconSrc from '../assets/icons/icons8-goal-100.png';
import NoEntryIconSrc from '../assets/icons/icons8-no-entry-100.png';
import RucksackIconSrc from '../assets/icons/icons8-rucksack-100.png';
import CarrotIconSrc from '../assets/icons/icons8-carrot-100.png';
import BeerIconSrc from '../assets/icons/icons8-beer-100.png';
import AirplaneIconSrc from '../assets/icons/icons8-airplane-100.png';
import FastForwardIconSrc from '../assets/icons/icons8-fast-forward-100.png';
import ErrorIconSrc from '../assets/icons/icons8-error-100.png';
import FarmIconSrc from '../assets/icons/icons8-farm-2-100.png';

import EfutGeoJson from '../assets/geojson/efut.json';
import EfkeGeoJson from '../assets/geojson/efke.json';

function coerceGeojson(data: unknown): GeojsonProps['geojson'] {
  return data as GeojsonProps['geojson'];
}

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [altitude, setAltitude] = useState(1_000);

  const onPanDrag = async (region: Region, details: Details) => {
    const camera = await mapRef.current?.getCamera();

    if (!camera) {
      return;
    }

    const altitude = camera.altitude ?? gMapsZoomLevelToAltitude(camera.zoom!);

    setAltitude(altitude);
  };

  const accurateView = altitude <= 50_000;

  return (
    <View style={styles.root}>
      <MapView
        ref={mapRef}
        style={styles.root}
        mapType={accurateView ? 'hybrid' : 'none'}
        showsPointsOfInterest={false}
        onRegionChange={onPanDrag}
      >
        <DropzoneMarker name="EFUT" coords={[60.8977697, 26.9193624]} mapRef={mapRef} />
        {accurateView && (
          <>
            <Marker coordinate={{ latitude: 60.8962929, longitude: 26.9256754 }} image={WindsockIconSrc} />
            <Marker coordinate={{ latitude: 60.897627, longitude: 26.926096 }} image={GoalIconSrc} />
            <Marker coordinate={{ latitude: 60.8928867, longitude: 26.925906 }} image={NoEntryIconSrc} />
            <Marker coordinate={{ latitude: 60.8950937, longitude: 26.9532117 }} image={NoEntryIconSrc} />
            <Marker coordinate={{ latitude: 60.8979303, longitude: 26.9201116 }} image={RucksackIconSrc} />
            <Marker coordinate={{ latitude: 60.8969242, longitude: 26.9193471 }} image={AirplaneIconSrc} />
            <Marker coordinate={{ latitude: 60.8938573, longitude: 26.9104967 }} image={BeerIconSrc} />
            <Marker coordinate={{ latitude: 60.871943, longitude: 26.655462644 }} image={BeerIconSrc} />
            <Marker coordinate={{ latitude: 60.876198, longitude: 26.65180349 }} image={BeerIconSrc} />
            <Marker coordinate={{ latitude: 60.896891, longitude: 26.921197977 }} image={FastForwardIconSrc} />
            <Geojson geojson={coerceGeojson(EfutGeoJson)} />
          </>
        )}

        <DropzoneMarker name="EFLA" coords={[61.1491239, 25.6875153]} mapRef={mapRef} />
        <DropzoneMarker name="EFTU" coords={[60.5087954, 22.2636276]} mapRef={mapRef} />
        <DropzoneMarker name="EFIM" coords={[61.2482849, 28.8954431]} mapRef={mapRef} />
        <DropzoneMarker name="EFJM" coords={[61.7806924, 22.7219118]} mapRef={mapRef} />
        <DropzoneMarker name="EFPO" coords={[61.4627744, 21.8049771]} mapRef={mapRef} />
        <DropzoneMarker name="EFVA" coords={[63.0345426, 21.7414303]} mapRef={mapRef} />
        <DropzoneMarker name="EFAL" coords={[62.5549554, 23.5641548]} mapRef={mapRef} />
        <DropzoneMarker name="EFJY" coords={[62.4090321, 25.6708152]} mapRef={mapRef} />
        <DropzoneMarker name="EFKU" coords={[63.0105362, 27.7867077]} mapRef={mapRef} />
        <DropzoneMarker name="EFOU" coords={[64.9317604, 25.3780738]} mapRef={mapRef} />

        <DropzoneMarker name="EFKE" coords={[65.7775386, 24.5719851]} mapRef={mapRef} />
        {accurateView && (
          <>
            <Marker coordinate={{ latitude: 65.779219, longitude: 24.570833 }} image={WindsockIconSrc} />
            <Marker coordinate={{ latitude: 65.776947, longitude: 24.57789 }} image={CarrotIconSrc} />
            <Marker coordinate={{ latitude: 65.794502, longitude: 24.5258638 }} image={BeerIconSrc} />
            <Marker coordinate={{ latitude: 65.742791, longitude: 24.5789721 }} image={BeerIconSrc} />
            <Geojson geojson={coerceGeojson(EfkeGeoJson)} />
          </>
        )}
      </MapView>
      {altitude < 10_000 && <AltitudeMeter altitude={altitude} />}
    </View>
  );
}

interface DropzoneMarkerProps {
  coords: [number, number];
  name: string;
  mapRef: RefObject<MapView>;
}

function DropzoneMarker(props: DropzoneMarkerProps) {
  return (
    <Marker
      image={HouseIconSrc}
      coordinate={{ latitude: props.coords[0], longitude: props.coords[1] }}
      onPress={() =>
        props.mapRef.current?.animateCamera({
          altitude: 5_000,
          heading: 0,
          pitch: 0,
          zoom: 15,
          center: {
            latitude: props.coords[0],
            longitude: props.coords[1],
          },
        })
      }
    />
  );
}

// https://stackoverflow.com/a/27004928
function gMapsZoomLevelToAltitude(zoomLevel: number) {
  return 35200000 / 2 ** zoomLevel;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
