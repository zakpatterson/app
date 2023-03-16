import React from 'react';
import { View } from 'react-native';
import { Path, Svg, Circle, Image } from 'react-native-svg';

import AltitrackImgSrc from '../assets/images/altitrack.png';

interface Props {
  altitude: number;
}

export default function AltitudeMeter(props: Props) {
  return (
    <Svg style={{ position: 'absolute', top: 16, left: 16, height: 96, width: 96 }} viewBox="0 0 100 100">
      <Circle fill="#FFF" x="50" y="50" r="50" />
      <Image href={AltitrackImgSrc} height={100} width={100} x={0} y={0} />

      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.3125 0H4.5V26.4953C4.49116 26.6744 4.48301 26.8582 4.47468 27.0461C4.33698 30.153 4.15027 34.3659 0 36.4232C0 39.5032 2.68629 42 6 42C9.31371 42 12 39.5032 12 36.4232C7.57099 34.391 7.4785 30.0839 7.41119 26.9496C7.39542 26.2149 7.38102 25.5447 7.3125 24.9832V0Z"
        fill="black"
        x={44}
        y={12}
        rotation={(props.altitude / 4000) * 360}
        originX={6}
        originY={38}
      />
    </Svg>
  );
}
