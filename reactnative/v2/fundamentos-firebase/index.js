import 'react-native-gesture-handler';
import '@react-native-firebase/app';

import firestore from '@react-native-firebase/firestore';
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

// set the host and the port property to connect to the emulator
// set these before any read/write operations occur to ensure it doesn't affect your Cloud Firestore data!
if (__DEV__) {
  firestore().terminate().then(() => {
    firestore().clearPersistence().then(() => {
      firestore().useEmulator('localhost', 8080);
    }).catch(() => {
      console.log('Clear persistence error')
    });
  }).catch(() => {
    console.log('Terminate error')
  });
}

firestore();