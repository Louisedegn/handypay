const React = require('react-native')
const {StyleSheet, Dimensions} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    height: '100%',
    padding: 50,
    
  },
  panelContrainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  listContainer: {
    backgroundColor: '#f2f2f2',
    flex: 1
  },
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  liContainer: {
    flex: 1,
  },
  liImg: {
    flex: 0,
    width: 50,
    height: 50
  },
  liText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row',
    width: '100%'
  },
  navbarTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center'
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  form: {
    textAlign: 'center'
    
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
   
  },
  inputStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: '200',
    flex: 1,
    height: 40
  },
  containerStyle: {
    height: 60,
    flexDirection: 'column',
    width: '100%',
    borderColor: '#D4D4D4',
    borderBottomWidth: 1,
  },
  errorTextStyle: {
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  alignRight: {
    flex: 1
  },
  drawer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    padding: 20
  },
  drawerButton: {
    margin: 10
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    margin: 40
  },
  photoButtons: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  photoButton: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    margin: 40
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  formUser: {
    height: '100%',
    backgroundColor: 'white'
  },
  containerUser: {
    backgroundColor: 'white',
    justifyContent: 'center',
    height: '100%',
    padding: 50,
  },
  containerFlat: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',

  },
  imageFront: {
    height: 150,
    width: 300,
    right: 10,
    justifyContent: 'center'
  }




})
module.exports = styles
module.exports.constants = constants;