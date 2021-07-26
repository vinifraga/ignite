import React, { createContext, useContext, ReactNode, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
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
  signOut(): Promise<void>;
  userStorageLoading: boolean;
  isLoggingIn: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  }
  type: string;
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
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const userStorageKey = '@gofinances:user';

  async function signInWithGoogle() {
    try {
      setIsLoggingIn(true);
      
      const CLIENT_ID = process.env.CLIENT_ID
      const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true })
      const RESPONSE_TYPE = "token"
      const SCOPE = encodeURI("profile email")

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params, type } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;
  
      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
        const userInfo = await response.json();

        const userLoggedIn = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture
        }
  
        setUser(userLoggedIn);
        AsyncStorage.setItem(userStorageKey, JSON.stringify(userLoggedIn));
      }
    } catch (error) {
        throw new Error(error);
    } finally {
        setIsLoggingIn(false);
    }
  }

  async function signInWithApple() {
    try {
      setIsLoggingIn(true);

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      })

      if (credential) {
        console.log(credential);
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

        const userLoggedIn = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo
        }
  
        setUser(userLoggedIn);
        AsyncStorage.setItem(userStorageKey, JSON.stringify(userLoggedIn));
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function signOut() {
    setUser({} as User);
    AsyncStorage.removeItem(userStorageKey);
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
      signInWithApple,
      signOut,
      userStorageLoading,
      isLoggingIn
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
