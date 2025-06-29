import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';

const { FiUsers, FiShield, FiActivity, FiTrendingUp, FiClock, FiUserCheck } = FiIcons;

const Dashboard = () => {
  const { user, users, hasPermission } = useAuth();

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: FiUsers,
      color: 'bg-blue-500',
      permission: 'read'
    },
    {
      title: 'Active Users',
      value: users.filter(u => u.status === 'active').length,
      icon: FiUserCheck,
      color: 'bg-green-500',
      permission: 'read'
    },
    {
      title: 'Admins',
      value: users.filter(u => u.role === 'admin').length,
      icon: FiShield,
      color: 'bg-purple-500',
      permission: 'manage_users'
    },
    {
      title: 'Recent Logins',
      value: users.filter(u => {
        if (!u.lastLogin) return false;
        const lastLogin = new Date(u.lastLogin);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return lastLogin > weekAgo;
      }).length,
      icon: FiActivity,
      color: 'bg-orange-500',
      permission: 'manage_users'
    }
  ];

  const recentActivity = users
    .filter(u => u.lastLogin)
    .sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your user management system.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          hasPermission(stat.permission) && (
            <motion.div
              key={stat.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          )
        ))}
      </div>

      {hasPermission('manage_users') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <SafeIcon icon={FiClock} className="w-5 h-5 mr-2 text-gray-600" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivity.map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">
                      Last login: {new Date(user.lastLogin).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                    user.role === 'editor' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <SafeIcon icon={FiTrendingUp} className="w-5 h-5 mr-2 text-gray-600" />
              Role Distribution
            </h2>
            <div className="space-y-3">
              {['admin', 'manager', 'editor', 'user'].map(role => {
                const count = users.filter(u => u.role === role).length;
                const percentage = (count / users.length) * 100;
                
                return (
                  <div key={role} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700 capitalize">{role}</span>
                      <span className="text-gray-500">{count} users</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          role === 'admin' ? 'bg-purple-500' :
                          role === 'manager' ? 'bg-blue-500' :
                          role === 'editor' ? 'bg-green-500' :
                          'bg-gray-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;