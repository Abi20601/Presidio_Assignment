import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyA-7gqiH2U6qxHQeW8Xy4PIyyUR_HVT_qM",
  authDomain: "authentication-login-00.firebaseapp.com",
  projectId: "authentication-login-00",
  storageBucket: "authentication-login-00.appspot.com",
  messagingSenderId: "686842066202",
  appId: "1:686842066202:web:01c5a4e96083618b82e8a3",
  measurementId: "G-GCV9S1WR3V"
})

export const auth = app.auth()
export const db = app.firestore();
export default app