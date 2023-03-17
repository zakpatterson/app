import React, { RefObject, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text as DefaultText } from 'react-native';
import MapView, { Geojson, Marker, Region, Details } from 'react-native-maps';
import { useNavigation } from 'expo-router';
import { Polygon, Feature, point } from '@turf/helpers';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import bboxPolygon from '@turf/bbox-polygon';

import { MapPlaceInfo, mapPlaces, markerIcon } from '../helpers/map_data';
import AltitudeMeter from '../components/AltitudeMeter';

import HouseIconSrc from '../assets/icons/icons8-house-100.png';
import FanHeadIconSrc from '../assets/icons/icons8-fan-head-100.png';

interface MapCamera {
  altitude: number;
  boundingBox: Feature<Polygon>;
  time: number;
}

export default function MapScreen() {
  const navigation = useNavigation();
  const mapRef = useRef<MapView>(null);

  const [placesInsideCamera, setPlacesInsideCamera] = useState<string[]>([]);

  const [camera, setCamera] = useState<MapCamera>({
    altitude: 10_000,
    boundingBox: bboxPolygon([29.5787, 66.3464, 21.0186, 59.2126]),
    time: Date.now(),
  });

  useEffect(() => {
    const placesInsideCamera = mapPlaces
      .filter((place) => {
        return booleanPointInPolygon(point([place.coords[1], place.coords[0]]), camera.boundingBox);
      })
      .map((place) => place.name);

    navigation.setOptions({
      title: placesInsideCamera.length === 1 ? placesInsideCamera[0] : 'Kartta',
    });

    setPlacesInsideCamera(placesInsideCamera);
  }, [camera.time]);

  const onPanDrag = async (region: Region, details: Details) => {
    if (!mapRef.current) {
      return;
    }

    const camera = await mapRef.current.getCamera();
    const bounds = await mapRef.current.getMapBoundaries();

    const altitude = camera.altitude ?? gMapsZoomLevelToAltitude(camera.zoom!);

    setCamera({
      altitude,
      boundingBox: bboxPolygon([
        bounds.southWest.longitude,
        bounds.southWest.latitude,
        bounds.northEast.longitude,
        bounds.northEast.latitude,
      ]),
      time: Date.now(),
    });
  };

  const accurateView = camera.altitude <= 50_000;

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
          <MapPlace key={place.name} place={place} camera={camera} mapRef={mapRef} />
        ))}
      </MapView>

      {camera.altitude < 10_000 && <AltitudeMeter altitude={camera.altitude} />}

      {!accurateView && placesInsideCamera.length > 0 && (
        <View style={styles.overlayInstructionContainer}>
          <DefaultText style={styles.overlayInstruction}>Napauta kohdetta pikasiirtyäksesi</DefaultText>
        </View>
      )}
    </View>
  );
}

interface MapPlaceProps {
  camera: MapCamera;
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
        title={marker.title}
        image={markerIcon[marker.type]}
      />
    );
  });

  const geojsons = place.geojsons.map((geojson, i) => <Geojson key={i} geojson={geojson} />);

  return (
    <>
      {placeMarker}
      {props.camera.altitude < 50_000 && markers}
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
    bottom: 75,
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
