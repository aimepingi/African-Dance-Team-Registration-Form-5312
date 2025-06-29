import React from 'react';
import { QuestLogin } from '@questlabs/react-sdk';
import { motion } from 'framer-motion';
import { useQuestAuth } from '../contexts/QuestAuthContext';
import { useNavigate } from 'react-router-dom';
import questConfig from '../config/questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMusic, FiUsers, FiHeart } = FiIcons;

const QuestLoginPage = () => {
  const { questLogin } = useQuestAuth();
  const navigate = useNavigate();

  const handleLogin = ({ userId, token, newUser }) => {
    const result = questLogin({ userId, token, newUser });
    
    if (result.success) {
      if (newUser) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-8">
              <SafeIcon icon={FiMusic} className="w-16 h-16 mr-4" />
              <h1 className="text-5xl font-bold">Danse Africaine</h1>
              <SafeIcon icon={FiUsers} className="w-16 h-16 ml-4" />
            </div>
            <p className="text-2xl mb-6 opacity-90">Welcome Back to Our Community</p>
            <p className="text-lg opacity-75 max-w-md">
              Join our vibrant African dance community where rhythm meets passion, 
              and every step tells a story of culture and connection.
            </p>
            <div className="mt-8 flex items-center justify-center space-x-2">
              <SafeIcon icon={FiHeart} className="w-6 h-6 text-red-300" />
              <span className="text-lg">Experience • Culture • Community</span>
              <SafeIcon icon={FiHeart} className="w-6 h-6 text-red-300" />
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse-slow"></div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8 lg:hidden"
          >
            <div className="flex items-center justify-center mb-4">
              <SafeIcon icon={FiMusic} className="w-8 h-8 text-orange-600 mr-2" />
              <h1 className="text-3xl font-bold text-gray-800">Danse Africaine</h1>
              <SafeIcon icon={FiUsers} className="w-8 h-8 text-orange-600 ml-2" />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to access your dance community</p>
            </div>

            <div className="quest-login-container">
              <QuestLogin
                onSubmit={handleLogin}
                email={true}
                google={false}
                accent={questConfig.PRIMARY_COLOR}
              />
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                New to our community? Create an account above to get started!
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-400">
              Join thousands of dancers in our global community
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QuestLoginPage;