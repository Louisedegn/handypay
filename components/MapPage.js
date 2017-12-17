import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';
import StatusBar from './StatusBar';
import styles from '../styles';
const {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Image,
  Text,
  View,
  Drawer,
  KeyboardAvoidingView
} = ReactNative;

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: false,
      uid: '',
      disname: '',
      type: '',
      watchId: null,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.00922*0.5,
        longitudeDelta: 0.00421*0.5
      },
      payArea: {
        north: 0,
        south: 0,
        east: 0,
        west: 0
      },
      markers: [],
      polylineCoords: []
    };
    this.coordRef = firebase.database().ref().child('actors');
  }
  componentDidMount() {
    this.getLocation();
    AsyncStorage.getItem('user').then((userString) => {
      let user = JSON.parse(userString);
      this.setState({ uid: user.uid, disname: user.disname, type: user.type });
    });
  }
  componentWillUnmount() {
    if(this.state.watchId !== null){
      navigator.geolocation.clearWatch(this.state.watchId);
      this.setState({watchId: null, polylineCoords: []});
    }
  }
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922*0.5,
          longitudeDelta: 0.00421*0.5
        }
        let range = 1/111/400;
        this.setState({ payArea: {
          north: position.coords.latitude + range,
          south: position.coords.latitude - range,
          east: position.coords.longitude + range,
          west: position.coords.longitude - range
        } });
        this.onRegionChange(region);
        this.generateMarkers(position.coords.latitude, position.coords.longitude, range);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 },
    );
  }
  onRegionChange(region) {
    this.setState({ region });
  }
  generateMarkers(latitude, longitude, range) {
    this.setState({ markers: [
      {
        disname: 'Upper',
        type: 'Area',
        coordinates: {
          latitude: latitude+range,
          longitude: longitude+range
        }
      },
      {
        disname: 'Lower',
        type: 'Area',
        coordinates: {
          latitude: latitude-range,
          longitude: longitude-range
        }
      }
    ] })
  }
  checkForPay(latitude, longitude) {
    if (latitude >= this.state.payArea.south && latitude <= this.state.payArea.north){
      if (longitude >= this.state.payArea.west && longitude <= this.state.payArea.east){
        return false
      }
    }
    Alert.alert(latitude+'-'+this.state.payArea.south+'-'+this.state.payArea.north+'  '+longitude+'-'+this.state.payArea.west+'-'+this.state.payArea.east);
    return true;
  }
  watchPosition() {
    if(this.state.watchId === null){
      var watchId = navigator.geolocation.watchPosition(
        (position) => {
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.longitudeDelta
          }
          this.onRegionChange(region);
          const { polylineCoords } = this.state;
          this.setState({
            polylineCoords: [...polylineCoords, position.coords]
          });
          this.updateCoord(position.coords);
          this.checkForPay(position.coords.latitude, position.coords.longitude);
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 0, distanceFilter: 1 },
      );
      this.setState({ watchId: watchId });
    }else{
      navigator.geolocation.clearWatch(this.state.watchId);
      this.setState({watchId: null, polylineCoords: []});
    }
  }
  updateCoord(coords) {
    this.setState({ loading: true });
    var that = this;
    var data = {
      disname: this.state.disname,
      type: this.state.type,
      latitude: coords.latitude,
      longitude: coords.longitude
    };
    this.coordRef.child(this.state.uid).once('value', function(snapshot) {
      if(snapshot.val() === null){
        that.coordRef.child(that.state.uid).set(data);
        that.setState({ loading: false });
      }else{
        that.coordRef.child(that.state.uid).update(data)
        .then(() => {
          that.setState({ loading: false });
        })
        .catch((err) => {
          console.log(err);
          that.setState({
            loading: false
          });
        });
      }
    })
    .catch(err => console.error(err));
  }
  render() {
    return (
      <View style ={styles.preview}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.coordinates}
              title={marker.disname}
              description={marker.type}
            />
          ))}
          <MapView.Marker
              coordinate={(this.state.polylineCoords.length > 0)?this.state.polylineCoords[this.state.polylineCoords.length-1]:this.state.region}
              title='User'
              description='User'
            />
          <MapView.Polyline
            key={1}
            coordinates={this.state.polylineCoords}
            strokeColor='rgba(0,153,204,0.5)'
            fillColor='rgba(255,0,0,0.5)'
            strokeWidth={1}
          />
        </MapView>
        <Icon 
          name={(this.state.watchId === null) ? 'walk' : 'human-male'}
          type='material-community'
          color='#333333'
          style={styles.capture}
          onPress={this.watchPosition.bind(this)}/>
      </View>
    )
  }
}
module.exports = MapPage;