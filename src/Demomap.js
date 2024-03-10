import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';;
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export default class Demomap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitudeDelta: 0.025,
      longitudeDelta: 0.025,
      latitude: 25.1948475,
      longitude: 55.2682899,
    };;
    consolepro.consolelog('iaminDemoapp');;
  }

  onRegionChange = region => {
    consolepro.consolelog('region', region);;
    this.setState({
      latitude: 25.1948475,
      longitude: 55.2682899,,
    });
  };

  render() {
    return (
      <View style={styles.map}>
        <MapView
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={this.onRegionChange}
        />
        <View style={styles.markerFixed}>
          <Image style={styles.marker} source={require('./icons/home.png')} />
        </View>
        <SafeAreaView style={styles.footer}>
          <Text style={styles.region}>{JSON.stringify(region, null, 2)}</Text>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    backgroundColor: 'red',,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 48,
    width: 48,
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
  },
});
