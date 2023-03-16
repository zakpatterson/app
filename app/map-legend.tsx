import { Image, ImageSourcePropType, ScrollView, StyleSheet, View } from 'react-native';

import Text from '../components/atoms/Text';

import HouseIconSrc from '../assets/icons/icons8-house-100.png';
import FanHeadIconSrc from '../assets/icons/icons8-fan-head-100.png';
import WindsockIconSrc from '../assets/icons/icons8-windsock-100.png';
import GoalIconSrc from '../assets/icons/icons8-goal-100.png';
import NoEntryIconSrc from '../assets/icons/icons8-no-entry-100.png';
import RucksackIconSrc from '../assets/icons/icons8-rucksack-100.png';
import CarrotIconSrc from '../assets/icons/icons8-carrot-100.png';
import TeamIconSrc from '../assets/icons/icons8-team-100.png';
import BeerIconSrc from '../assets/icons/icons8-beer-100.png';
import AirplaneIconSrc from '../assets/icons/icons8-airplane-100.png';
import FastForwardIconSrc from '../assets/icons/icons8-fast-forward-100.png';
import ErrorIconSrc from '../assets/icons/icons8-error-100.png';
import FarmIconSrc from '../assets/icons/icons8-farm-2-100.png';

export default function MapLegendScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <LegendRow title="Hyppykerho" icon={HouseIconSrc} />
        <LegendRow title="Tuulitunneli" icon={FanHeadIconSrc} />
        <LegendRow title="Tuulipussi" icon={WindsockIconSrc} />
        <LegendRow title="Laskeutumisalue" icon={GoalIconSrc} />
        <LegendRow title="Oppilaiden laskeutumisalue" icon={CarrotIconSrc} />
        <LegendRow title="Tandemien laskeutumisalue" icon={TeamIconSrc} />
        <LegendRow title="Swooppausalue" icon={FastForwardIconSrc} />
        <LegendRow title="Lastausalue" icon={AirplaneIconSrc} />
        <LegendRow title="Pakkaushalli" icon={RucksackIconSrc} />
        <LegendRow title="Varalaskeutumispaikka" icon={FarmIconSrc} />
        <LegendRow
          title="Laskeutuminen sekä lentäminen alle 300 metrin korkeudessa kielletty. Tarpeetonta lentämistä on syytä välttää myös tätä korkeammalla."
          icon={NoEntryIconSrc}
        />
        <LegendRow title="Vaara" icon={ErrorIconSrc} />
        <LegendRow title="Beerline? Täältä saa keissin!" icon={BeerIconSrc} />
      </View>
    </ScrollView>
  );
}

interface RowProps {
  icon: ImageSourcePropType;
  title: string;
}

function LegendRow(props: RowProps) {
  return (
    <View style={styles.legendRow}>
      <Image source={props.icon} style={{ height: 50, width: 50 }} />
      <Text style={{ flex: 1 }}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    paddingBottom: 128,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});
