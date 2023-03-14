import React from 'react';
import { useColorScheme } from 'react-native';
import { Slider as DefaultSlider, SliderProps } from '@miblanchard/react-native-slider';
import Colors from '../../constants/Colors';

export default function Slider(props: SliderProps) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <DefaultSlider
      minimumTrackTintColor="#2D75FA"
      maximumTrackTintColor={Colors[colorScheme].sliderTrackMax}
      thumbTintColor="#FFF"
      thumbStyle={{
        height: 32,
        width: 32,
        borderRadius: 32,
        shadowColor: '#000',
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      }}
      {...props}
    />
  );
}
