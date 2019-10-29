import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {Root, Toast} from 'native-base';
import geolocation from '@react-native-community/geolocation';
var {height, width} = Dimensions.get('window');
import mapActions from '../Redux/Map/actions';
const {locationchange, areachange, addresschange, postLocation} = mapActions;
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0922;
const LATITUDE = 30.78825;
const LONGITUDE = 30.4324;

export class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    };
  }

  async getper() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Locatoin Permission',
          message: 'We want to access your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.log('error per', err);
    }
  }
  componentDidMount() {
    this.getper()
      .then(() => {
        const {coordinate} = this.state;

        this.watchID = geolocation.watchPosition(
          position => {
            const {routeCoordinates} = this.state;
            const {latitude, longitude} = position.coords;
            this.props.locationchange({latitude, longitude});
            console.log('location :', position);
            const newCoordinate = {
              latitude,
              longitude,
            };

            if (Platform.OS === 'android') {
              if (this.marker) {
                this.marker._component.animateMarkerToCoordinate(
                  newCoordinate,
                  500,
                );
              }
            } else {
              coordinate.timing(newCoordinate).start();
            }

            this.setState({
              latitude,
              longitude,
              routeCoordinates: routeCoordinates.concat([newCoordinate]),

              prevLatLng: newCoordinate,
            });
          },
          error => console.log('errr', error),
          {
            enableHighAccuracy: false,
            timeout: 20000,
            maximumAge: 2000,
            distanceFilter: 10,
          },
        );
      })
      .catch(er => {
        console.log('catch err', er);
      });
  }
  componentWillUnmount() {
    geolocation.clearWatch(this.watchID);
  }

  renderAreaErr() {
    const {areaError} = this.props;

    if (areaError != '') {
      return (
        <View style={{paddingTop: 5}}>
          <Text> {areaError} </Text>
        </View>
      );
    }
  }

  renderAddressErr() {
    const {addressError} = this.props;

    if (addressError != '') {
      return (
        <View style={{paddingTop: 5}}>
          <Text> {addressError} </Text>
        </View>
      );
    }
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  render() {
    return (
      <Root>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#2190eb', '#21bae7']}
          style={{flex: 1}}>
          <View style={styles.container}>
            <StatusBar hidden={true} />
            <View style={styles.half}>
              <Text style={[styles.loginText, {paddingTop: 50}]}>
                ارسال الموقع
              </Text>
              <View style={styles.mapView}>
                <MapView
                  style={styles.map}
                  provider={PROVIDER_GOOGLE}
                  showUserLocation
                  followUserLocation
                  loadingEnabled
                  region={this.getMapRegion()}>
                  <Marker.Animated
                    ref={marker => {
                      this.marker = marker;
                    }}
                    coordinate={this.state.coordinate}
                  />
                </MapView>
              </View>
            </View>
            <View style={styles.half}>
              <TextInput
                style={styles.buttons}
                placeholder="المنطقة"
                placeholderTextColor="#000000"
                onChangeText={text => this.props.areachange(text)}
              />
              {this.renderAreaErr()}
              <TextInput
                style={styles.buttons}
                placeholder="العنوان"
                placeholderTextColor="#000000"
                onChangeText={text => this.props.addresschange(text)}
              />
              {this.renderAddressErr()}
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#20D7E3', '#20B3E7']}
                style={styles.login}>
                <Text
                  onPress={_ =>
                    this.props.postLocation(
                      this.props.latitude,
                      this.props.longitude,
                      this.props.area,
                      this.props.address,
                    )
                  }
                  style={styles.loginText}>
                  ارسال
                </Text>
              </LinearGradient>
            </View>
          </View>
        </LinearGradient>
      </Root>
    );
  }
}

function mapStateToProps({map}) {
  return {
    latitude: map.latitude,
    longitude: map.longitude,
    area: map.area,
    address: map.address,
    areaError: map.areaError,
    addressError: map.addressError,
  };
}

export default connect(
  mapStateToProps,
  {locationchange, areachange, addresschange, postLocation},
)(Map);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    width: width - 20,
    height: height / 3,
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  half: {
    flex: 0.5,
    alignItems: 'center',
  },
  buttons: {
    marginTop: 20,
    width: width - 50,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 15,
    textAlign: 'center',
    fontFamily: 'DroidArabic',
    fontSize: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  buttonsText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'DroidArabic',
  },
  login: {
    width: width / 3,
    height: 45,
    borderRadius: 15,
    marginTop: 80,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  loginText: {
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'DroidArabic',
    fontSize: 20,
  },
});
