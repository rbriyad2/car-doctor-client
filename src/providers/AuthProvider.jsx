import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

const provider = new GoogleAuthProvider();
export const AuthContext = createContext()
const auth = getAuth(app) 
const AuthProvider = ({children}) => {
const [user, setUser]= useState(null)
const [loading, setLoading]= useState(true)

const createUser =(email, password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
}

const signIn = (email, password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
}
const googleLogin =()=>{
    setLoading(true)
return signInWithPopup(auth, provider)
}

const logOut =() =>{
    setLoading(true)
    return signOut(auth)
}

useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser =>{
        console.log(currentUser)
        setUser(currentUser)
        setLoading(false)
        if(currentUser && currentUser?.email){
            const loggedUser ={
                email: currentUser.email
              }
            fetch('https://car-doctor-server-4bg71wq7q-rbriyad2gmailcoms-projects.vercel.app/jwt',{
                method: 'POST',
                headers:{ 'content-type': 'application/json'},
                body: JSON.stringify(loggedUser)
    
              })
              .then(res => res.json())
              .then(data => {
                console.log(data);
                //warnning: localstorage is not the best (second best place) to store access token
                localStorage.setItem('car-access-token', data.token)
              })
        }
        else{
            localStorage.removeItem('car-access-token')
        }
    })
    return ()=>{
        unsubscribe()
    } 
    
},[])

    const authinfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        googleLogin
    }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;