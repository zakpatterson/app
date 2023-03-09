import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import WindArrow from '../../components/WindArrow';

export default function TabWeather() {
  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.windDirectionValue}>Keskituuli</Text>
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <WindArrow direction={45} size={48} />
          <Text style={styles.windGustValue}>6 m/s</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 32, flexWrap: 'wrap' }}>
        <View>
          <Text style={styles.windDirectionValue}>Vaihteluväli</Text>
          <Text style={styles.larger}>5–7 m/s</Text>
        </View>

        <View>
          <Text style={styles.windDirectionValue}>Puuskat</Text>
          <Text style={styles.larger}>7 m/s</Text>
        </View>

        <View>
          <Text style={styles.windDirectionValue}>Pilvet</Text>
          <Text style={styles.larger}>2 000 m</Text>
        </View>

        <View>
          <Text style={styles.windDirectionValue}>Aurinko laskee</Text>
          <Text style={styles.larger}>18:00</Text>
        </View>

        <View>
          <Text style={styles.windDirectionValue}>Maalämpötila</Text>
          <Text style={styles.larger}>11°C</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.windDirectionValue, { flex: 1 }]}>1 000 m</Text>
        <Text style={styles.windDirectionValue}>Ei pilviä</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.windDirectionValue, { flex: 1 }]}>1 500 m</Text>
        <Text style={styles.windDirectionValue}>Ei pilviä</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.windDirectionValue, { flex: 1 }]}>2 000 m</Text>
        <Text style={styles.windDirectionValue}>Vähän pilviä</Text>
      </View>

      <Text>
        Tiedot ovat viittellisiä ja perustuvat METAR-sanomiin. Tietojen oikeellisuutta ei voida taata. Tarkkaile
        tuulipussia ja tee lopullinen hyppypäätös aina itse!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    gap: 32,
  },
  windGustValue: {
    fontSize: 48,
    fontWeight: '600',
  },
  larger: {
    fontSize: 24,
    fontWeight: '600',
  },
  windDirectionValue: {
    fontSize: 16,
  },
});
