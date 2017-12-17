import React, {Component} from 'react';
import ReactNative from 'react-native';
import * as firebase from 'firebase';
import { Icon } from 'react-native-elements';
import StatusBar from './StatusBar';
import styles from '../styles';
const {
  AsyncStorage,
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Picker,
  Text,
  TextInput,
  View,
  Drawer,
  KeyboardAvoidingView,
  TouchableHighlight
} = ReactNative;

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: false,
      email: '',
      disname: '',
      fullname: '',
      cardnumber: '',
      expirydate: '',
      expiryyear: '',
      uid: '',
      error: '',
    };
    this.proRef = firebase.database().ref().child('profiles');
  }
  componentDidMount() {
    let user = firebase.auth().currentUser;
    this.listenForProfile(this.proRef.child(user.uid));
    this.setState({ email: user.email, uid: user.uid });
  }
  listenForProfile(proRef) {
    proRef.on('value', (snap) => {
      this.setState({
        loading: false,
        disname: snap.val().disname,
        gender: snap.val().gender,
        type: snap.val().type,
        fullname: snap.val().fullname,
        cardnumber: snap.val().cardnumber,
        expirydate: snap.val().expirydate,
        expiryyear: snap.val().expiryyear,
        uid: snap.key
      });
    });
  }
  updateProfile() {
    this.setState({ loading: true });
    this.proRef.child(this.state.uid).update({
      disname: this.state.disname,
      fullname: this.state.fullname,
      cardnumber: this.state.cardnumber,
      expirydate: this.state.expirydate,
      expiryyear: this.state.expiryyear
    
    })
    .then(() => {
      this.setState({ loading: false });
      var user = {
        disname: this.state.disname,
        fullname: this.state.fullname,
        cardnumber: this.state.cardnumber,
        expirydate: this.state.expirydate,
        expiryyear: this.state.expiryyear,
        uid: this.state.uid,
        token: ''
      };
      firebase.auth().currentUser.getIdToken().then(function(idToken) {
        user.token = idToken;
        AsyncStorage.setItem('user', JSON.stringify(user));
        Alert.alert( 'Update Successful!');
      })
      .catch((err) => {
        this.setState({ error: 'Failed to obtain user ID token.'+err, loading: false });
      });
    })
    .catch((err) => {
      this.setState({ 
        error: 'Update failed. '+err,
        loading: false
      });
    });
  }
  renderButtonOrSpinner() {
    if (this.state.loading) {
        return <ActivityIndicator size='small' />;    
    }
    return <Button onPress={this.updateProfile.bind(this)} title="Update Profile" />;
  }
  render() {
    return(
      <KeyboardAvoidingView style={styles.containerUser} behavior='padding'>
        
        <View style={styles.formUser}>
          
          <TitledInput 
            label='Email Address'
            onChangeText={(email) => this.setState({email})}
            placeholder='Email'
            value={this.state.email}
          />
          <TitledInput
            label='Display Name'
            onChangeText={(disname) => this.setState({disname})}
            placeholder='User Name'
            value={this.state.disname}
          />
          <TitledInput
            label='Full Name'
            onChangeText={(fullname) => this.setState({fullname})}
            placeholder='Full Name'
            value={this.state.fullname}
          />
          <TitledInput
            label='Card Number'
            onChangeText={(cardnumber) => this.setState({cardnumber})}
            placeholder='Card Number'
            value={this.state.cardnumber}
          />
          <TitledInput
            label='Expiry Date'
            onChangeText={(expirydate) => this.setState({expirydate})}
            placeholder='Expiry date'
            value={this.state.expirydate}
          />
          <TitledInput
            label='Expiry Year'
            onChangeText={(expiryyear ) => this.setState({expiryyear})}
            placeholder= 'Expiry Year'
            value={this.state.expiryyear}
          />
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          {this.renderButtonOrSpinner()}
        </View>
      </KeyboardAvoidingView>
    )
  }
}
const TitledInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
      <View style={containerStyle}>
          <Text style={labelStyle}>{label.toUpperCase()}</Text>
          <TextInput
          autoCorrect={false}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          style={inputStyle}
          editable={true}
          returnKeyType='next'
        />
      </View>
  );
};
module.exports = UserProfile;