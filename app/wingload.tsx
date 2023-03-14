import { useMemo, useReducer, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Text from '../components/atoms/Text';
import Slider from '../components/atoms/Slider';
import MenuGroup from '../components/atoms/MenuGroup';
import MenuItem from '../components/atoms/MenuItem';

type Action =
  | { type: 'setJumperWeight'; jumperWeight: number }
  | { type: 'setGearWeight'; gearWeight: number }
  | { type: 'setCanopySize'; canopySize: number }
  | { type: 'setWingload'; wingload: number }
  | { type: 'slideStart' | 'slideEnd' };

type State = {
  jumperWeight: number;
  gearWeight: number;
  exitWeight: number;
  canopySize: number;
  wingload: number;
  scrollEnabled: boolean;
};

const KG_TO_LBS = 2.20462262;
const REDZONE_WINGLOAD = 1.34;
const GREENZONE_MIN_CANOPY = 135;
const GREENZONE_MAX_CANOPY = 210;
const MINIMUM_WINGLOAD = 0.8;

const GREENZONE_MIN_WEIGHT = 60;
const GREENZONE_MAX_WEIGHT = 128;

function calculateCanopySizeForExitWeightAndWingload(exitWeight: number, wingload: number) {
  return (exitWeight * KG_TO_LBS) / wingload;
}

function calculateWingloadForExitWeightAndCanopySize(exitWeight: number, canopySize: number) {
  return (exitWeight * KG_TO_LBS) / canopySize;
}

function calculateMaximumRecommendedCanopySize(exitWeight: number) {
  const decimal = clamp((exitWeight - GREENZONE_MIN_WEIGHT) / (GREENZONE_MAX_WEIGHT - GREENZONE_MIN_WEIGHT));
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

function formatWeight(weight: number) {
  return `${Math.round(weight)} kg`;
}

function reducer(state: State, action: Action): State {
  if (action.type === 'setJumperWeight') {
    const exitWeight = action.jumperWeight + state.gearWeight;

    return {
      ...state,
      jumperWeight: action.jumperWeight,
      wingload: calculateWingloadForExitWeightAndCanopySize(exitWeight, state.canopySize),
      exitWeight,
    };
  } else if (action.type === 'setGearWeight') {
    const exitWeight = state.jumperWeight + action.gearWeight;

    return {
      ...state,
      gearWeight: action.gearWeight,
      wingload: calculateWingloadForExitWeightAndCanopySize(exitWeight, state.canopySize),
      exitWeight,
    };
  } else if (action.type === 'setCanopySize') {
    const exitWeight = state.jumperWeight + state.gearWeight;

    return {
      ...state,
      canopySize: action.canopySize,
      wingload: calculateWingloadForExitWeightAndCanopySize(exitWeight, action.canopySize),
      exitWeight,
    };
  } else if (action.type === 'setWingload') {
    const exitWeight = state.jumperWeight + state.gearWeight;

    return {
      ...state,
      canopySize: calculateCanopySizeForExitWeightAndWingload(exitWeight, action.wingload),
      wingload: action.wingload,
      exitWeight,
    };
  } else if (action.type === 'slideStart') {
    return {
      ...state,
      scrollEnabled: false,
    };
  } else if (action.type === 'slideEnd') {
    return {
      ...state,
      scrollEnabled: true,
    };
  }

  return state;
}

export default function WingloadScreen() {
  const [state, dispatch] = useReducer(reducer, {
    jumperWeight: 80,
    gearWeight: 12,
    exitWeight: 92,
    canopySize: 180,
    wingload: 1.12680711689,
    scrollEnabled: true,
  });

  const canopyMax = calculateCanopySizeForExitWeightAndWingload(state.exitWeight, MINIMUM_WINGLOAD);
  const canopyMin = calculateCanopySizeForExitWeightAndWingload(state.exitWeight, REDZONE_WINGLOAD);
  const canopyMinRecommended = Math.max(canopyMin, calculateMaximumRecommendedCanopySize(state.exitWeight));

  return (
    <ScrollView scrollEnabled={state.scrollEnabled}>
      <View style={styles.root}>
        <MenuGroup title="Määritykset">
          <MenuItem
            left="Hyppääjän paino"
            right={formatWeight(state.jumperWeight)}
            content={
              <Slider
                animationType="spring"
                value={state.jumperWeight}
                onValueChange={(value) => dispatch({ type: 'setJumperWeight', jumperWeight: value[0] })}
                onSlidingStart={() => dispatch({ type: 'slideStart' })}
                onSlidingComplete={() => dispatch({ type: 'slideEnd' })}
                minimumValue={40}
                maximumValue={150}
              />
            }
          />

          <MenuItem
            left="Varusteiden paino"
            right={formatWeight(state.gearWeight)}
            content={
              <Slider
                animationType="spring"
                value={state.gearWeight}
                onValueChange={(value) => dispatch({ type: 'setGearWeight', gearWeight: value[0] })}
                onSlidingStart={() => dispatch({ type: 'slideStart' })}
                onSlidingComplete={() => dispatch({ type: 'slideEnd' })}
                minimumValue={5}
                maximumValue={30}
              />
            }
          />

          <MenuItem
            left="Kuvun koko"
            right={formatCanopySize(state.canopySize)}
            content={
              <Slider
                animationType="spring"
                value={state.canopySize}
                onValueChange={(value) => dispatch({ type: 'setCanopySize', canopySize: value[0] })}
                onSlidingStart={() => dispatch({ type: 'slideStart' })}
                onSlidingComplete={() => dispatch({ type: 'slideEnd' })}
                minimumValue={100}
                maximumValue={350}
              />
            }
          />

          <MenuItem
            left="Siipikuorma"
            right={formatWingload(state.wingload)}
            content={
              <Slider
                animationType="spring"
                value={state.wingload}
                onValueChange={(value) => dispatch({ type: 'setWingload', wingload: value[0] })}
                onSlidingStart={() => dispatch({ type: 'slideStart' })}
                onSlidingComplete={() => dispatch({ type: 'slideEnd' })}
                minimumValue={0.5}
                maximumValue={3}
              />
            }
          />
        </MenuGroup>

        <MenuGroup title="Rajat A- ja B-kelppareille">
          <MenuItem left="🔴 Ei saa alittaa" right={formatCanopySize(canopyMin)} />
          <MenuItem left="🟡 Pienin suositeltava" right={formatCanopySize(canopyMinRecommended)} />
          <MenuItem left="🟢 Suurin suositeltava" right={formatCanopySize(canopyMax)} />
        </MenuGroup>

        <Text>
          Rajat perustuvat Laskuvarjotoimikunnan vuonna 2022 julkaisemaan siipikuormataulukkoon. Keskustele kouluttajan
          kanssa ennen kalustohankintoja.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    gap: 32,
  },
});
