import React, { createContext, useContext, useState, ReactNode } from 'react';


// Define user and context types
interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  registeredUsers: User[];
  register: (userData: User) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  const register = (userData: User) => {
    setRegisteredUsers(prev => [...prev, userData]);
    setUser(userData);
  };

  const login = (email: string, password: string): boolean => {
    const foundUser = registeredUsers.find(
      user => user.email === email && user.password === password
    );
    
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, registeredUsers, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}