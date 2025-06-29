import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data - in real app, this would come from your backend
const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    email: 'manager@example.com',
    password: 'manager123',
    name: 'Manager User',
    role: 'manager',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    status: 'active',
    lastLogin: '2024-01-14T15:45:00Z',
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 3,
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    status: 'active',
    lastLogin: '2024-01-13T09:20:00Z',
    createdAt: '2024-01-03T00:00:00Z'
  },
  {
    id: 4,
    email: 'editor@example.com',
    password: 'editor123',
    name: 'Content Editor',
    role: 'editor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    status: 'inactive',
    lastLogin: '2024-01-10T14:15:00Z',
    createdAt: '2024-01-04T00:00:00Z'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(mockUsers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const updatedUser = { ...foundUser, lastLogin: new Date().toISOString() };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Update user's last login in users array
      setUsers(prev => prev.map(u => u.id === foundUser.id ? updatedUser : u));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    
    const rolePermissions = {
      admin: ['read', 'write', 'delete', 'manage_users', 'manage_roles'],
      manager: ['read', 'write', 'manage_users'],
      editor: ['read', 'write'],
      user: ['read']
    };
    
    return rolePermissions[user.role]?.includes(permission) || false;
  };

  const updateUser = (userId, updates) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, ...updates } : u
    ));
    
    // Update current user if it's the same user
    if (user && user.id === userId) {
      const updatedCurrentUser = { ...user, ...updates };
      setUser(updatedCurrentUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
    }
  };

  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const createUser = (userData) => {
    const newUser = {
      ...userData,
      id: Math.max(...users.map(u => u.id)) + 1,
      createdAt: new Date().toISOString(),
      lastLogin: null,
      status: 'active'
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const value = {
    user,
    users,
    login,
    logout,
    hasPermission,
    updateUser,
    deleteUser,
    createUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};