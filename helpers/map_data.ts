import type { ImageRequireSource } from 'react-native';

import AirplaneIconSrc from '../assets/icons/icons8-airplane-100.png';
import BeerIconSrc from '../assets/icons/icons8-beer-100.png';
import CarrotIconSrc from '../assets/icons/icons8-carrot-100.png';
import ErrorIconSrc from '../assets/icons/icons8-error-100.png';
import FarmIconSrc from '../assets/icons/icons8-farm-2-100.png';
import FastForwardIconSrc from '../assets/icons/icons8-fast-forward-100.png';
import GoalIconSrc from '../assets/icons/icons8-goal-100.png';
import NoEntryIconSrc from '../assets/icons/icons8-no-entry-100.png';
import RucksackIconSrc from '../assets/icons/icons8-rucksack-100.png';
import TeamIconSrc from '../assets/icons/icons8-team-100.png';
import WindsockIconSrc from '../assets/icons/icons8-windsock-100.png';

export type MapMarkerType =
  | 'windsock'
  | 'noEntry'
  | 'loadingArea'
  | 'target'
  | 'danger'
  | 'altTarget'
  | 'studentTarget'
  | 'tandemTarget'
  | 'swoopTarget'
  | 'packingArea'
  | 'beer';

export type MapPlaceInfo = {
  type: 'tunnel' | 'dz';
  elev?: number;
  coords: [number, number];
  name: string;
  markers: MapMarker[];
  geojsons: GeoJSON.FeatureCollection[];
};

export type MapMarker = {
  type: MapMarkerType;
  coords: [number, number];
  title?: string;
};

export const markerIcon: Record<MapMarkerType, ImageRequireSource> = {
  altTarget: FarmIconSrc,
  beer: BeerIconSrc,
  danger: ErrorIconSrc,
  loadingArea: AirplaneIconSrc,
  noEntry: NoEntryIconSrc,
  packingArea: RucksackIconSrc,
  studentTarget: CarrotIconSrc,
  swoopTarget: FastForwardIconSrc,
  tandemTarget: TeamIconSrc,
  target: GoalIconSrc,
  windsock: WindsockIconSrc,
};

export const mapPlaces: MapPlaceInfo[] = [
  {
    type: 'tunnel',
    name: 'Fööni',
    coords: [60.1876105861579, 24.97816832615967],
    markers: [],
    geojsons: [],
  },
  {
    type: 'tunnel',
    name: 'Aeronautica Arena',
    coords: [60.48801792405424, 26.554819847791503],
    markers: [],
    geojsons: [],
  },
  {
    type: 'dz',
    name: 'EFUT',
    elev: 103,
    coords: [60.8977697, 26.9193624],
    markers: [
      {
        type: 'windsock',
        coords: [60.8962929, 26.9256754],
      },
      {
        type: 'target',
        coords: [60.897627, 26.926096],
      },
      {
        type: 'noEntry',
        coords: [60.8928867, 26.925906],
      },
      {
        type: 'noEntry',
        coords: [60.8950937, 26.9532117],
      },
      {
        type: 'packingArea',
        coords: [60.8979303, 26.9201116],
      },
      {
        type: 'loadingArea',
        coords: [60.8969242, 26.9193471],
      },
      {
        type: 'beer',
        coords: [60.8938573, 26.9104967],
      },
      {
        type: 'swoopTarget',
        coords: [60.896891, 26.921197977],
      },
    ],
    geojsons: [require('../assets/geojson/efut.json')],
  },
  {
    type: 'dz',
    coords: [61.1491239, 25.6875153],
    name: 'EFLA',
    elev: 153,
    markers: [
      {
        type: 'packingArea',
        coords: [61.14901234130722, 25.68817925758734],
      },
      {
        type: 'loadingArea',
        coords: [61.14466964965001, 25.68880052942565],
      },
      {
        type: 'noEntry',
        coords: [61.14448695882361, 25.69441911089014],
      },
    ],
    geojsons: [require('../assets/geojson/efla.json')],
  },
  {
    type: 'dz',
    name: 'EFTU',
    elev: 49,
    coords: [60.5087954, 22.2636276],
    markers: [],
    geojsons: [],
  },
  {
    type: 'dz',
    name: 'EFIM',
    elev: 103,
    coords: [61.2482849, 28.8954431],
    markers: [],
    geojsons: [],
  },
  {
    type: 'dz',
    name: 'EFPO',
    elev: 14,
    coords: [61.4627744, 21.8049771],
    markers: [
      {
        type: 'danger',
        coords: [61.432507787795416, 21.86293080025661],
        title: 'Valtatie, sähköistetty rautatie',
      },
      {
        type: 'danger',
        coords: [61.44397042350591, 21.842371022616064],
        title: 'Valtatie, sähköistetty rautatie',
      },
      {
        type: 'danger',
        coords: [61.460673604718636, 21.8140971269465],
        title: 'Valtatie, sähköistetty rautatie',
      },
      {
        type: 'danger',
        coords: [61.47605801201885, 21.786924418227535],
        title: 'Valtatie, sähköistetty rautatie',
      },
      {
        type: 'danger',
        coords: [61.478863783779246, 21.761169980958066],
        title: 'Valtatie',
      },
      {
        type: 'danger',
        coords: [61.45207710863084, 21.78066309892029],
        title: 'Ampuma-alue',
      },
      {
        type: 'danger',
        coords: [61.4636461276479, 21.75576366943533],
        title: 'Valtatie',
      },
      {
        type: 'danger',
        coords: [61.43931394313817, 21.741195841848352],
        title: 'Valtatie',
      },
      {
        type: 'altTarget',
        coords: [61.44030540660446, 21.76400898518329],
      },
      {
        type: 'altTarget',
        coords: [61.4326045006463, 21.82693426175229],
      },
    ],
    geojsons: [require('../assets/geojson/efpo.json')],
  },
  {
    type: 'dz',
    name: 'EFJM',
    elev: 154,
    coords: [61.7806924, 22.7219118],
    markers: [],
    geojsons: [],
  },
  {
    type: 'dz',
    name: 'EFVA',
    elev: 6,
    coords: [63.04026809650351, 21.773224295363374],
    markers: [],
    geojsons: [require('../assets/geojson/efva.json')],
  },
  {
    type: 'dz',
    name: 'EFAL',
    elev: 124,
    coords: [62.5549554, 23.5641548],
    markers: [],
    geojsons: [],
  },
  {
    type: 'dz',
    name: 'EFJY',
    elev: 140,
    coords: [62.4090321, 25.6708152],
    markers: [
      {
        type: 'windsock',
        coords: [62.40674769183672, 25.664948449021963],
      },
      {
        type: 'target',
        coords: [62.40720279133594, 25.66369006632768],
      },
    ],
    geojsons: [require('../assets/geojson/efjy.json')],
  },
  {
    type: 'dz',
    name: 'EFKU',
    elev: 99,
    coords: [63.0105362, 27.7867077],
    markers: [],
    geojsons: [],
  },
  {
    type: 'dz',
    name: 'EFOU',
    elev: 15,
    coords: [64.9317604, 25.3780738],
    markers: [
      {
        type: 'windsock',
        coords: [64.93299569538941, 25.373695204985115],
      },
      {
        type: 'target',
        coords: [64.932977704781, 25.376731934213765],
      },
      {
        type: 'altTarget',
        coords: [64.93709880035112, 25.381220522989384],
      },
      {
        type: 'danger',
        coords: [64.93439958346372, 25.37485670160321],
      },
      {
        type: 'noEntry',
        coords: [64.9316573755779, 25.37248672542712],
      },
      {
        type: 'noEntry',
        coords: [64.92935598793248, 25.357204630687804],
      },
      {
        type: 'loadingArea',
        coords: [64.93264749946192, 25.370671648026594],
      },
      {
        type: 'beer',
        coords: [64.93478402201814, 25.40226973380438],
      },
    ],
    geojsons: [require('../assets/geojson/efou.json')],
  },
  {
    type: 'dz',
    name: 'EFKE',
    elev: 19,
    coords: [65.7775386, 24.5719851],
    markers: [
      {
        type: 'windsock',
        coords: [65.779219, 24.570833],
      },
      {
        type: 'studentTarget',
        coords: [65.776947, 24.57789],
      },
      {
        type: 'beer',
        coords: [65.794502, 24.5258638],
      },
      {
        type: 'beer',
        coords: [65.742791, 24.5789721],
      },
    ],
    geojsons: [require('../assets/geojson/efke.json')],
  },
];
