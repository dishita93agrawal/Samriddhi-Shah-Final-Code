import firebase from 'firebase';
var firebaseConfig = {
  apiKey: 'AIzaSyBfeHW0w1r0m8IpAvcwIVmKsaYkTBVxSIE',
  authDomain: 'sport-on-mentor.firebaseapp.com',
  projectId: 'sport-on-mentor',
  storageBucket: 'sport-on-mentor.appspot.com',
  messagingSenderId: '362211445995',
  appId: '1:362211445995:web:ce9b672a9bf918db9a02ae',
};

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
