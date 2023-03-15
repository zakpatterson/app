import React, { RefObject, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Geojson, Marker, GeojsonProps, Region, Details } from 'react-native-maps';

import WindsockIconSrc from '../assets/icons/icons8-windsock-96.png';
import GoalIconSrc from '../assets/icons/icons8-goal-96.png';
import NoEntryIconSrc from '../assets/icons/icons8-no-entry-96.png';
import RucksackIconSrc from '../assets/icons/icons8-rucksack-96.png';
import TakeoffIconSrc from '../assets/icons/icons8-airplane-take-off-96.png';

import UttiGeoJSON from '../assets/geojson/efut.json';
import Text from '../components/atoms/Text';

function coerceGeojson(data: unknown): GeojsonProps['geojson'] {
  return data as GeojsonProps['geojson'];
}

const YELLOW_ALTITUDE = 1219; // 4000 ft
const ORANGE_ALTITUDE = 1067; // 3500 ft
const RED_ALTITUDE = 762; // 2500 ft

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

  const altitudeColor = useMemo(() => {
    if (altitude <= RED_ALTITUDE) {
      return ['red', 'white'] as const;
    } else if (altitude <= ORANGE_ALTITUDE) {
      return ['orange', 'black'] as const;
    } else if (altitude <= YELLOW_ALTITUDE) {
      return ['yellow', 'black'] as const;
    }

    return ['black', 'white'] as const;
  }, [altitude]);

  const accurateView = altitude <= 50_000;

  return (
    <View style={styles.root}>
      <View
        style={{
          padding: 16,
          alignItems: 'center',
          backgroundColor: altitudeColor[0],
        }}
      >
        <Text style={{ color: altitudeColor[1] }}>
          Korkeus {(altitude / 1000).toFixed(altitude <= 10_000 ? 1 : 0)} km
        </Text>
      </View>
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
            <Marker coordinate={{ latitude: 60.8969242, longitude: 26.9193471 }} image={TakeoffIconSrc} />
            <Geojson geojson={coerceGeojson(UttiGeoJSON)} fillColor="rgba(128,0,0,0.25)" strokeColor="red" />
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
      </MapView>
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
