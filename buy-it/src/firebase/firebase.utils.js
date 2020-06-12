import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyA2ypDQYiyJ7gBrAsOpbjba7a_QAOmSO5I",
    authDomain: "buy-it-e640e.firebaseapp.com",
    databaseURL: "https://buy-it-e640e.firebaseio.com",
    projectId: "buy-it-e640e",
    storageBucket: "buy-it-e640e.appspot.com",
    messagingSenderId: "936469071675",
    appId: "1:936469071675:web:56ea160cca756fb587991e",
    measurementId: "G-P4Z6Y8LLLB"
  }

  firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;