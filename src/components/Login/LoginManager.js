import * as firebase from "firebase/app";
import "firebase/auth"
import firebaseConfig from '../firebase.config';

export const initializeLoginFramework = () =>{
    firebase.initializeApp(firebaseConfig);
}
export const handleGoogleSignIn = ()=> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email} = res.user;
      const newUser = {
        IsSignIn: true,
        name: displayName,
        email: email,
        success: true
      }
      return newUser;
      console.log(displayName, email);
    });
  }

  export const handleSignOut = () => {
     return firebase.auth().signOut().then(res => {
      const existUser = {
        isSignIn: false,
        name: '',
        email: '',
        success: false
      }
      return existUser;
    }).catch(function(error) {
      // An error happened.
    });
  }

  export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res =>{
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserInfo(name);
      return newUserInfo;
    })
    .catch(error =>{
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
    });
  }

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res =>{
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success = true;
    return newUserInfo;
    })
    .catch(function(error) {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  const updateUserInfo = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    })
    .then(response => {
      console.log('update user name');
    })
    .catch( error => {
      console.log(error);
    })
  }
