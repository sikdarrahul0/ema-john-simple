import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth"
import firebaseConfig from '../firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    IsSignIn: false,
    name : '',
    email : '',
    password : '',
    error : '',
    success: false
  })
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = ()=> {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, email} = res.user;
      const newUser = {
        IsSignIn: true,
        name: displayName,
        email: email
      }
      setUser(newUser);
      console.log(displayName, email);
    });
  }
  const handleSignOut = () => {
    firebase.auth().signOut().then(res => {
      const existUser = {
        isSignIn: false,
        name: '',
        email: ''
      }
      setUser(existUser);
    }).catch(function(error) {
      // An error happened.
    });
  }
  const handleSubmit = (e)=>{
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res =>{
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserInfo(user.name);
      })
      .catch(error =>{
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
      if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(response =>{
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
        })
        .catch(function(error) {
          const newUserInfo = {...user};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
      }
     
    e.preventDefault();
  }
  const handleBlur = (e)=>{
    let isValid = true;
    if(e.target.name === 'email'){
      isValid = /\S+@\S+\.\S+/.test(e.target.value); 
    }
    if(e.target.name === 'password'){
      const isPassValid = e.target.value.length > 6;
      const passHasNumber = /\d{1}/.test(e.target.value);
      isValid = isPassValid && passHasNumber;
    }
    if(isValid){
       const newUser = {...user};
       newUser[e.target.name] = e.target.value;
       setUser(newUser);
    }
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

  return (
    <div style={{marginTop: '10px', textAlign: 'center'}}>
      {
        user.IsSignIn ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignIn}>Sign in</button>
      }
       
       {
         user.IsSignIn && 
         <div>
           <h3>Welcome, {user.name}</h3>
           <h4>Email : {user.email}</h4>
         </div>
       }
        <h2>Our Own Authentication</h2>
        <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser"/>
        <label htmlFor="newUser">New User Sign Up</label>
        <form onSubmit={handleSubmit}>
          {
            newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Name"/>
          }
           <br/>
           <input type="email" name="email" onBlur={handleBlur} placeholder="email" required/><br/>
           <input type="password" name="password" onBlur={handleBlur} placeholder="password" required/><br/>
           <input type="submit" value={newUser ? 'Sign Up' : 'Sign in'}/>
        </form>
        <p style={{color: 'red'}}>{user.error}</p>
        {
          user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'Logged in'} successfully</p>
        }
    </div>
  );
}

export default Login;
