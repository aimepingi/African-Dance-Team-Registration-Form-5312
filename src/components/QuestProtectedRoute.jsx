import React from 'react';
import { useQuestAuth } from '../contexts/QuestAuthContext';
import QuestLoginPage from '../pages/QuestLogin';
import QuestOnboardingPage from '../pages/QuestOnboarding';

const QuestProtectedRoute = ({ children, requireOnboarding = false }) => {
  const { isAuthenticated, loading, isNewUser } = useQuestAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <QuestLoginPage />;
  }

  if (requireOnboarding && isNewUser()) {
    return <QuestOnboardingPage />;
  }

  return children;
};

export default QuestProtectedRoute;