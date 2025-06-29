import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from '../pages/Login';

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { user, hasPermission, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">403</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Access Denied</h2>
          <p className="text-gray-500">You don't have permission to access this resource.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;