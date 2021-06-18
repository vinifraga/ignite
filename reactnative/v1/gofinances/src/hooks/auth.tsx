import React, { createContext, useContext, ReactNode, useState } from 'react';
import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

interface AuthContextProps {
  children: ReactNode;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

const AuthContext = createContext({} as IAuthContextData)

function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<User>({} as User)
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@gofinances:user';

  async function signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId: '827068571407-kki6216t7b4u69q6l1va00eu2t4drq12.apps.googleusercontent.com',
        androidClientId: '827068571407-sqpqv8ksf54uq64n9s9robjqc2tgai3p.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })
  
      if (result.type === 'success') {
        const userLoggedIn = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!
        }
  
        setUser(userLoggedIn);
        AsyncStorage.setItem(userStorageKey, JSON.stringify(userLoggedIn));
      }
  
    } catch (error) {
        throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      })

      if (credential) {
        const userLoggedIn = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName!,
          photo: undefined
        }
  
        setUser(userLoggedIn);
        AsyncStorage.setItem(userStorageKey, JSON.stringify(userLoggedIn));
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }

      setUserStorageLoading(false);
    }

    loadUserStorageData();
  }, [])

  return (
    <AuthContext.Provider value={{ 
      user, 
      signInWithGoogle, 
      signInWithApple 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
} 

export { AuthProvider, useAuth };
