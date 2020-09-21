import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBFHNpsgyZ_ukqVAgfUa11OJj9882ugJ1I',
  authDomain: 'facebook-messenger-app-c-ddba2.firebaseapp.com',
  databaseURL: 'https://facebook-messenger-app-c-ddba2.firebaseio.com',
  projectId: 'facebook-messenger-app-c-ddba2',
  storageBucket: 'facebook-messenger-app-c-ddba2.appspot.com',
  messagingSenderId: '210487560790',
  appId: '1:210487560790:web:95b294f00a4d39780449f7',
  measurementId: 'G-LEL4K399C6',
});

const db = firebaseApp.firestore();

export default db;
