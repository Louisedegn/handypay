import React, {Component} from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {Drawer, Router, Scene, Tabs} from 'react-native-router-flux';
import * as firebase from 'firebase';
import Authentication from './components/Authentication';
import HomePage from './components/HomePage';
import PhotoPage from './components/PhotoPage';
import MapPage from './components/MapPage';
import CameraPage from './components/CameraPage';
import UserProfile from './components/UserProfile';
import DrawerContent from './components/DrawerContent';


var config = {
  apiKey: "AIzaSyDdeezP5LcKdSk1r1D1zOBj6jD7BAWtDPo",
  authDomain: "awesomeproject-780f1.firebaseapp.com",
  databaseURL: "https://awesomeproject-780f1.firebaseio.com",
  projectId: "awesomeproject-780f1",
  storageBucket: "awesomeproject-780f1.appspot.com",
  messagingSenderId: "528368081226"
};
firebase.initializeApp(config);
console.disableYellowBox = true;

const MenuIcon = () => {
  return (
    <Icon 
    name='menu'
    type='material-community'
    color='#333333' />
  );
}

const TabIcon = ({ focused, title }) => {
  return (
    <Icon 
      name={title}
      type='material-community'
      color={focused ? '#333333' : '#c0c0c0'} />
  );
}

export default class App extends Component {
  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };
  }
  componentWillMount() {
    AsyncStorage.getItem('user').then((user) => {
      this.setState({ hasToken: user !== null, isLoaded: true });
    });
  }
  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else {
      return (
        <Router>
          <Scene key='root'>
            <Scene
              component={Authentication}
              initial={!this.state.hasToken}
              hideNavBar={true}
              key='Authentication'
              title='Authentication'
            />
             <Drawer
              hideNavBar={true}
              key="drawer"
              contentComponent={DrawerContent}
            >
              <Tabs
                key='Tabbar'
                swipeEnabled
                showLabel={false}
                tabs={true}
                tabBarPosition='bottom'
                tabBarStyle={{ backgroundColor: '#FFFFFF' }}
              >
                <Scene
                  key="HomeTab"
                  title="format-list-bulleted"
                  icon={TabIcon}>
                  <Scene
                    component={HomePage}
                    initial={this.state.hasToken}
                    key='HomePage'
                    title='Home Page'
                  />
                  <Scene
                    component={PhotoPage}
                    key='PhotoPage'
                    title='Photo Page'
                  />
                </Scene>
                <Scene
                  key="MapTab"
                  title="google-maps"
                  icon={TabIcon}>
                  <Scene
                    component={MapPage}
                    key='MapPage'
                    title='Map Page'
                  />
                </Scene>
                <Scene
                  key="CameraTab"
                  title="camera"
                  icon={TabIcon}>
                  <Scene
                    component={CameraPage}
                    key='CameraPage'
                    title='Camera Page'
                  />
                </Scene>
                <Scene
                  key="ProfileTab"
                  title="account"
                  icon={TabIcon}>
                  <Scene
                    component={UserProfile}
                    key='UserProfile'
                    title='User Profile'
                  />
                </Scene>
              </Tabs>
            </Drawer>
          </Scene>
        </Router>
      );
    }
  }
}