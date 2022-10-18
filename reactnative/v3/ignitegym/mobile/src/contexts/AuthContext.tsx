import { createContext, ReactNode, useEffect, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";

import { api } from "@services/api";
import { storageUserGet, storageUserRemove, storageUserSave } from "@storage/storageUser";
import { storageAuthTokenSave } from "@storage/storageAuthToken";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStoragedData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStoragedData, setIsLoadingUserStoragedData] = useState(true);

  async function storageUserAndToken(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStoragedData(true);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
      await storageUserSave(userData);
      await storageAuthTokenSave(token);
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStoragedData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });
    
      if (data.user && data.token) {
        storageUserAndToken(data.user, data.token);
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStoragedData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStoragedData(false);
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet();

      if (userLogged) {
        setUser(userLogged);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStoragedData(false);
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])
  
  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoadingUserStoragedData }}>
      {children}
    </AuthContext.Provider>
  )
}