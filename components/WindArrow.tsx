import React from 'react';
import Svg, { G, Line } from 'react-native-svg';
import { useThemeColor } from './Themed';

interface Props {
  lightColor?: string;
  darkColor?: string;
  direction: number;
  size: number;
}

export default function WindArrow(props: Props) {
  const { lightColor, darkColor, size } = props;

  const color = useThemeColor(
    {
      dark: darkColor,
      light: lightColor,
    },
    'text'
  );

  const stroke = (6 / 48) * size;
  const halfStroke = stroke / 2;

  const xMax = size - halfStroke;
  const yHalf = size / 2;

  return (
    <Svg height={props.size} width={props.size}>
      <G rotation={props.direction} origin={size / 2}>
        <Line x1={halfStroke} x2={xMax} y1={yHalf} y2={yHalf} strokeWidth={5} stroke={color} strokeLinecap="round" />
        <Line
          x1={xMax}
          x2={xMax * 0.75}
          y1={yHalf}
          y2={props.size * 0.2}
          strokeWidth={stroke}
          stroke={color}
          strokeLinecap="round"
        />
        <Line
          x1={xMax}
          x2={xMax * 0.75}
          y1={yHalf}
          y2={size * 0.8}
          strokeWidth={stroke}
          stroke={color}
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
}
