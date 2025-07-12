import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  // Check for existing auth state on mount
  useEffect(() => {
    const authState = localStorage.getItem('isAuthenticated');
    const storedEmail = localStorage.getItem('userEmail');
    
    if (authState === 'true' && storedEmail) {
      setIsAuthenticated(true);
      setUserEmail(storedEmail);
      setIsSuperAdmin(storedEmail === 'superadmin@gmail.com');
    }
  }, []);

  const login = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setIsSuperAdmin(email === 'superadmin@gmail.com');
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setIsSuperAdmin(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
  };

  const value = {
    isAuthenticated,
    isSuperAdmin,
    userEmail,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};