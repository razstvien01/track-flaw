"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

const AuthContext = createContext<any>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    // console.log('DO SIGN UP')
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const googleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      console.log(provider)
      console.log(auth)
      const result = await signInWithPopup(auth, provider);

      //* Access user data from the authentication result
      const user = result.user;
      console.log("User signed in:", user);

      //* You can access user properties like displayName, email, uid, etc.
      const display_name = user.displayName;
      const email_address = user.email;
      const uid = user.uid;

      await axios.post("http://localhost:3000/api/users", {
        user_id: uid,
        display_name,
        email_address,
      })
      
    } catch (error) {
      console.log("Google Sign-In Error:", error);
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, googleSignUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
