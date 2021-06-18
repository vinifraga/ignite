import React, { createContext, useContext, ReactNode } from 'react';

interface AuthContextProps {
  children: ReactNode;
}

interface IAuthContextData {
  user: User;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

const AuthContext = createContext({} as IAuthContextData)

function AuthProvider({ children }: AuthContextProps) {
  const user = {
    id: '312312313123',
    name: 'Vinicius Fraga',
    email: 'vinifagam@gmail.com'
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
} 

export { AuthProvider, useAuth };
