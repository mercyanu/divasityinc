import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyA-tT3_IsFrUjFWiIhFxeh2EhS-kEipgos",
    authDomain: "divasity-db.firebaseapp.com",
    projectId: "divasity-db",
    storageBucket: "divasity-db.appspot.com",
    messagingSenderId: "127174938524",
    appId: "1:127174938524:web:23b0e40db99bf3683e4259"
  }

  export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) {
      console.log("No current authenticated user");
      console.log(userAuth);
      return;
    }

    console.log(`this is additonal data from signup: ${additionalData}`);

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    console.log(`${snapShot.exists}`);
    console.log(userAuth);
    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        userRef.set({
          displayName, 
          email, 
          createdAt,
          ...additionalData
        });
      }
      catch(error){
        console.log('error creating user document:', error.message);
      }
    }
    return userRef;

  }

  firebase.initializeApp(config);

  export const firestore = firebase.firestore();
  export const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider(); //access to use the google auth service showing a popup when used
  //this takes a couple of parameters
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider); //we can pass in many provider google, twitter etc

  export default firebase;