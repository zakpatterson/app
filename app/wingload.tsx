import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';

import Text from '../components/atoms/Text';
import MenuGroup from '../components/atoms/MenuGroup';
import MenuItem from '../components/atoms/MenuItem';

const KG_TO_LBS = 2.20462262;
const REDZONE_WINGLOAD = 1.34;
const GREENZONE_MIN_CANOPY = 135;
const GREENZONE_MAX_CANOPY = 210;
const GREENZONE_MIN_WINGLOAD = (63 * KG_TO_LBS) / 135;
const GREENZONE_MAX_WINGLOAD = REDZONE_WINGLOAD;
const MINIMUM_WINGLOAD = 0.8;

const GREENZONE_MIN_WEIGHT = 60;
const GREENZONE_MAX_WEIGHT = 128;

function calculateMaximumCanopySize(grossWeight: number, wingload: number) {
  return (grossWeight * KG_TO_LBS) / wingload;
}

function calculateMaximumRecommendedCanopySize(grossWeight: number) {
  const decimal = clamp((grossWeight - GREENZONE_MIN_WEIGHT) / (GREENZONE_MAX_WEIGHT - GREENZONE_MIN_WEIGHT));
  return decimal * (GREENZONE_MAX_CANOPY - GREENZONE_MIN_CANOPY) + GREENZONE_MIN_CANOPY;
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function formatCanopySize(canopySize: number) {
  return `${Math.round(canopySize)} sqft`;
}

function formatWingload(wingload: number) {
  return `${wingload.toFixed(2)} lbs/sqft`;
}

export default function WingloadScreen() {
  const [weight, setWeight] = useState([80]);
  const [gearWeight, setGearWeight] = useState([12]);
  const [canopySize, setCanopySize] = useState([200]);

  const [wingload, greenZone, greenZoneCanopySize, redzoneCanopySize, canopySizeMax] = useMemo(() => {
    const grossWeight = weight[0] + gearWeight[0];
    const inPounds = grossWeight * KG_TO_LBS;
    const wingload = inPounds / canopySize[0];

    // Interpolate
    const greenZone =
      Math.min(1, Math.max(0, (canopySize[0] - GREENZONE_MIN_CANOPY) / (GREENZONE_MAX_CANOPY - GREENZONE_MIN_CANOPY))) *
        (GREENZONE_MAX_WINGLOAD - GREENZONE_MIN_WINGLOAD) +
      GREENZONE_MIN_WINGLOAD;

    const redzoneCanopySize = calculateMaximumCanopySize(grossWeight, REDZONE_WINGLOAD);
    const greenZoneCanopySize = Math.max(redzoneCanopySize, calculateMaximumRecommendedCanopySize(grossWeight));
    const canopySizeMax = calculateMaximumCanopySize(grossWeight, MINIMUM_WINGLOAD);

    return [wingload, greenZone, greenZoneCanopySize, redzoneCanopySize, canopySizeMax];
  }, [weight, gearWeight, canopySize]);

  const zone = useMemo(() => {
    if (wingload <= MINIMUM_WINGLOAD) return 'under';
    if (wingload > REDZONE_WINGLOAD) return 'over';
    if (wingload > greenZone) return 'yellow';
    return 'green';
  }, [wingload, greenZone]);

  return (
    <View style={styles.root}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 1 }}>Oma paino</Text>
        <Text>{Math.round(weight[0])} kg</Text>
      </View>
      <Slider value={weight} onValueChange={(value) => setWeight(value)} minimumValue={40} maximumValue={150} />

      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 1 }}>Varusteiden paino</Text>
        <Text>{Math.round(gearWeight[0])} kg</Text>
      </View>
      <Slider value={gearWeight} onValueChange={(value) => setGearWeight(value)} minimumValue={5} maximumValue={30} />

      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 1 }}>Kuvun koko</Text>
        <Text>{Math.round(canopySize[0])} sqft</Text>
      </View>
      <Slider
        value={canopySize}
        onValueChange={(value) => setCanopySize(value)}
        minimumValue={100}
        maximumValue={300}
      />

      <MenuGroup>
        <MenuItem left="Siipikuorma" right={formatWingload(wingload)} />
      </MenuGroup>

      <MenuGroup>
        <MenuItem left="🔴 Ei saa alittaa" right={formatCanopySize(redzoneCanopySize)} />
        <MenuItem left="🟡 Pienin suositeltava" right={formatCanopySize(greenZoneCanopySize)} />
        <MenuItem left="🟢 Suurin suositeltava" right={formatCanopySize(canopySizeMax)} />
      </MenuGroup>

      <Text>Rajat perustuvat Laskuvarjotoimikunnan vuonna 2022 julkaisemaan siipikuormataulukkoon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    gap: 32,
  },
});
