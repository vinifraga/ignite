import { createContext, ReactNode, useEffect, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";

import { api } from "@services/api";
import { storageUserGet, storageUserSave } from "@storage/storageUser";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingUserStoragedData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStoragedData, setIsLoadingUserStoragedData] = useState(true);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });
    
      if (data.user) {
        setUser(data.user);
        storageUserSave(data.user);
      }
    } catch (error) {
      throw error;
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
    <AuthContext.Provider value={{ user, signIn, isLoadingUserStoragedData }}>
      {children}
    </AuthContext.Provider>
  )
}