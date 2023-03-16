import React, { RefObject, useRef, useState } from 'react';
import { StyleSheet, View, Text as DefaultText } from 'react-native';
import MapView, { Geojson, Marker, GeojsonProps, Region, Details } from 'react-native-maps';

import { MapPlaceInfo, mapPlaces, markerIcon } from '../helpers/map_data';
import AltitudeMeter from '../components/AltitudeMeter';

import HouseIconSrc from '../assets/icons/icons8-house-100.png';
import FanHeadIconSrc from '../assets/icons/icons8-fan-head-100.png';

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
        {mapPlaces.map((place) => (
          <MapPlace key={place.name} place={place} altitude={altitude} mapRef={mapRef} />
        ))}
      </MapView>

      {altitude < 10_000 && <AltitudeMeter altitude={altitude} />}

      {!accurateView && (
        <View style={styles.overlayInstructionContainer}>
          <DefaultText style={styles.overlayInstruction}>Napauta kohdetta pikasiirtyäksesi</DefaultText>
        </View>
      )}
    </View>
  );
}

interface MapPlaceProps {
  altitude: number;
  place: MapPlaceInfo;
  mapRef: RefObject<MapView>;
}

function MapPlace(props: MapPlaceProps) {
  const { place } = props;

  const placeMarker = (
    <Marker
      image={place.type === 'tunnel' ? FanHeadIconSrc : HouseIconSrc}
      coordinate={{ latitude: place.coords[0], longitude: place.coords[1] }}
      onPress={() =>
        props.mapRef.current?.animateCamera({
          altitude: 5_000,
          heading: 0,
          pitch: 0,
          zoom: 15,
          center: {
            latitude: place.coords[0],
            longitude: place.coords[1],
          },
        })
      }
    />
  );

  const markers = place.markers.map((marker, i) => {
    return (
      <Marker
        key={i}
        coordinate={{ latitude: marker.coords[0], longitude: marker.coords[1] }}
        image={markerIcon[marker.type]}
      />
    );
  });

  const geojsons = place.geojsons.map((geojson, i) => <Geojson key={i} geojson={geojson} />);

  return (
    <>
      {placeMarker}
      {props.altitude < 5_000 && markers}
      {geojsons}
    </>
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
  overlayInstructionContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayInstruction: {
    borderRadius: 32,
    fontSize: 16,
    color: '#FFF',
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
