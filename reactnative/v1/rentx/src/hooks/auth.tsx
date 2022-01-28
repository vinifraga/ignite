import React, { createContext, useState, useContext, useEffect } from 'react';
import { database } from '../database';
import { User as ModelUser } from '../database/model/User';

import { api } from '../services/api';

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      })
  
      const { token, user } = response.data;
  
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>('users')

      await database.write(async () => {
        await userCollection.create(( newUser ) => {
          newUser.user_id = user.id,
          newUser.name = user.name,
          newUser.email = user.email,
          newUser.driver_license = user.driver_license,
          newUser.avatar = user.avatar,
          newUser.token = token
        })
      })
  
      setData({ ...user, token  });
    } catch (error: any) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User;

        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        setData(userData);
      }
    }

    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ signIn, user: data }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
