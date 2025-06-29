import React, { createContext, useContext, useState, useEffect } from 'react';

const QuestAuthContext = createContext();

export const useQuestAuth = () => {
  const context = useContext(QuestAuthContext);
  if (!context) {
    throw new Error('useQuestAuth must be used within a QuestAuthProvider');
  }
  return context;
};

export const QuestAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [questUser, setQuestUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored Quest user session
    const storedUserId = localStorage.getItem('questUserId');
    const storedToken = localStorage.getItem('questToken');
    
    if (storedUserId && storedToken) {
      setQuestUser({ userId: storedUserId, token: storedToken });
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const questLogin = ({ userId, token, newUser }) => {
    localStorage.setItem('questUserId', userId);
    localStorage.setItem('questToken', token);
    localStorage.setItem('questNewUser', newUser.toString());
    
    setQuestUser({ userId, token, newUser });
    setIsAuthenticated(true);
    
    return { success: true, isNewUser: newUser };
  };

  const questLogout = () => {
    localStorage.removeItem('questUserId');
    localStorage.removeItem('questToken');
    localStorage.removeItem('questNewUser');
    
    setQuestUser(null);
    setIsAuthenticated(false);
  };

  const isNewUser = () => {
    return localStorage.getItem('questNewUser') === 'true';
  };

  const completeOnboarding = () => {
    localStorage.setItem('questNewUser', 'false');
  };

  const value = {
    isAuthenticated,
    questUser,
    questLogin,
    questLogout,
    isNewUser,
    completeOnboarding,
    loading
  };

  return (
    <QuestAuthContext.Provider value={value}>
      {children}
    </QuestAuthContext.Provider>
  );
};