import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';

initializeLoginFramework();

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

  const GoogleSignIn = () => {
    handleGoogleSignIn()
    .then(res =>{
     handleResponse(res, true);
    })
  }
  const SignOut = () => {
    handleSignOut()
    .then(res =>{
     handleResponse(res, false)
    })
  }
  
  const handleSubmit = (e)=>{
    
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res =>{
       handleResponse(res, true);
      })
    }
      if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res =>{
       handleResponse(res,true);
      })
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
  const handleResponse = (res, redirect) => {
      setUser(res);
      setLoggedInUser(res);
      if(redirect){
        history.replace(from);
      }  
  }
  return (
    <div style={{marginTop: '10px', textAlign: 'center'}}>
      {
        user.IsSignIn ? <button onClick={SignOut}>Sign Out</button> :
        <button onClick={GoogleSignIn}>Sign in</button>
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
