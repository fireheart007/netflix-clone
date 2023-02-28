// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEn8ZvRbb2zapDpNd7MKgGwtpPHVQ9bnE",
  authDomain: "netflix-clone-23e8e.firebaseapp.com",
  projectId: "netflix-clone-23e8e",
  storageBucket: "netflix-clone-23e8e.appspot.com",
  messagingSenderId: "759868340263",
  appId: "1:759868340263:web:912e4b45849964ccb63602",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

type AuthContextType = ReturnType<typeof useProvideAuth>;
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

function useProvideAuth() {
  // current user => null on in 2 cases:-
  // 1. firebase is still fetching the information. It is an async operation
  // 2. when the user is logged out

  // user is logged in => gives User
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      return user;
    });

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      return user;
    });

  const signOutUser = ()=>signOut(auth);

  return {
    signUp,
    signIn,
    signOut: signOutUser,
    user,
    loading
  };
}

export const useAuth = () => useContext(AuthContext) ?? ({} as AuthContextType);
