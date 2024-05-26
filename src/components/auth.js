import React,{ useContext, useState, useEffect } from "react";
import { auth,db } from "../config/firebase";


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}


export function Authprovider({ children }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentUser, setCurrentUser] = useState("")
    const [loading, setLoading] = useState(true)
    
    async function signup(email,password,userDetails){
        return auth.createUserWithEmailAndPassword(email,password)
        .then((userCredential) => {
            return db.collection("/1").add({
              uid: userCredential.user.uid,
              firstname: userDetails.firstName,
              lastname: userDetails.lastName,
              phonenumber: userDetails.phoneNumber,
              usertype: userDetails.userType
            });
          });
    } 

    async function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
      }

     async function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
      } 
      
    async function logout() {
        return auth.signOut()
      }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        });
        return unsubscribe;        
    }, [])


    const value = {
        currentUser,
        login,
        signup,
        resetPassword,
        logout
    }

    
      return (
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
      );
}