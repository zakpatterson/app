import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';

import Text from '../components/atoms/Text';

const KG_TO_LBS = 2.20462262;
const REDZONE_WINGLOAD = 1.34;
const GREENZONE_MIN_CANOPY = 135;
const GREENZONE_MAX_CANOPY = 210;
const GREENZONE_MIN_WINGLOAD = (63 * KG_TO_LBS) / 135;
const GREENZONE_MAX_WINGLOAD = REDZONE_WINGLOAD;
const MINIMUM_WINGLOAD = 0.8;

export default function WingloadScreen() {
  const [weight, setWeight] = useState([80]);
  const [gearWeight, setGearWeight] = useState([12]);
  const [canopySize, setCanopySize] = useState([200]);

  const [wingload, greenZone] = useMemo(() => {
    const grossWeight = weight[0] + gearWeight[0];
    const inPounds = grossWeight * KG_TO_LBS;
    const wingload = inPounds / canopySize[0];

    // Interpolate
    const greenZone =
      Math.min(1, Math.max(0, (canopySize[0] - GREENZONE_MIN_CANOPY) / (GREENZONE_MAX_CANOPY - GREENZONE_MIN_CANOPY))) *
        (GREENZONE_MAX_WINGLOAD - GREENZONE_MIN_WINGLOAD) +
      GREENZONE_MIN_WINGLOAD;

    return [wingload, greenZone];
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

      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{wingload.toFixed(2)}</Text>
      {zone === 'over' && <Text>⛔️ Siipikuorma liian suuri</Text>}
      {zone === 'under' && <Text>⛔️ Siipikuorma liian pieni</Text>}
      {zone === 'yellow' && <Text>⚠️ Pienempi siipikuorma suositeltava</Text>}
      {zone === 'green' && <Text>✅ Siipikuorma ok</Text>}
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
