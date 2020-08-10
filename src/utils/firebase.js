import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyACYTz_QaAeubHJvOvrS7u75R52Jffy_sU',
  authDomain: 'birthday-app-78d4e.firebaseapp.com',
  databaseURL: 'https://birthday-app-78d4e.firebaseio.com',
  projectId: 'birthday-app-78d4e',
  storageBucket: 'birthday-app-78d4e.appspot.com',
  messagingSenderId: '966334227723',
  appId: '1:966334227723:web:37f543426a432729fb6e0e',
};
export default firebase.initializeApp(firebaseConfig);
