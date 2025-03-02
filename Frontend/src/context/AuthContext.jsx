import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        axios.defaults.headers.common['x-auth-token'] = token;
        const { data } = await axios.get('https://spark-linktree-server.onrender.com/api/auth/user');

        if (data && data.username) {
          console.log('User loaded:', data); // 🔍 Debugging
          setUser({
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            username: data.username, // ✅ Store username
          });
          setIsAuthenticated(true);
        } else {
          console.error('Username missing from response:', data);
        }
      } catch (err) {
        console.error('Error loading user:', err.response?.data || err.message);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('https://spark-linktree-server.onrender.com/api/auth/login', { email, password });

      if (data?.token && data?.user) {
        console.log('Login response:', data.user); // 🔍 Debugging
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['x-auth-token'] = data.token;

        setUser({
          _id: data.user._id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          username: data.user.username, // ✅ Store username
        });
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid login response');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await axios.post('https://spark-linktree-server.onrender.com/api/auth/register', userData);

      if (data?.token && data?.user) {
        console.log('Registration response:', data.user); // 🔍 Debugging
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['x-auth-token'] = data.token;

        setUser({
          _id: data.user._id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          username: data.user.username, // ✅ Store username
        });
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid registration response');
      }
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
