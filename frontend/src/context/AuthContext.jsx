import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('routina_user');
    const storedToken = localStorage.getItem('routina_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (userData, tok) => {
    setUser(userData);
    setToken(tok);
    localStorage.setItem('routina_user', JSON.stringify(userData));
    localStorage.setItem('routina_token', tok);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('routina_user');
    localStorage.removeItem('routina_token');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;