import React, { useState } from 'react';
import { OnBoarding } from '@questlabs/react-sdk';
import { motion } from 'framer-motion';
import { useQuestAuth } from '../contexts/QuestAuthContext';
import { useNavigate } from 'react-router-dom';
import questConfig from '../config/questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMusic, FiUsers, FiStar, FiArrowRight } = FiIcons;

const QuestOnboardingPage = () => {
  const { questUser, completeOnboarding } = useQuestAuth();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});

  const userId = questUser?.userId || localStorage.getItem('questUserId');
  const token = questUser?.token || localStorage.getItem('questToken');

  const handleOnboardingComplete = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  if (!userId || !token) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex">
      {/* Left Section - Motivational Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-orange-500 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-8">
              <SafeIcon icon={FiStar} className="w-16 h-16 mr-4 animate-pulse" />
              <h1 className="text-5xl font-bold">Let's Get Started!</h1>
            </div>
            <p className="text-2xl mb-6 opacity-90">Your Dance Journey Begins</p>
            <p className="text-lg opacity-75 max-w-md mb-8">
              We're setting up your personalized experience in our African dance community. 
              This will help us connect you with the right classes, events, and fellow dancers.
            </p>
            
            <div className="space-y-4">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center space-x-3"
              >
                <SafeIcon icon={FiMusic} className="w-6 h-6" />
                <span className="text-lg">Discover Your Dance Style</span>
              </motion.div>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center space-x-3"
              >
                <SafeIcon icon={FiUsers} className="w-6 h-6" />
                <span className="text-lg">Connect with Community</span>
              </motion.div>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-center space-x-3"
              >
                <SafeIcon icon={FiArrowRight} className="w-6 h-6" />
                <span className="text-lg">Start Your Journey</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
      </div>

      {/* Right Section - Onboarding Component */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8 lg:hidden"
          >
            <div className="flex items-center justify-center mb-4">
              <SafeIcon icon={FiStar} className="w-8 h-8 text-orange-600 mr-2" />
              <h1 className="text-3xl font-bold text-gray-800">Let's Get Started!</h1>
            </div>
            <p className="text-gray-600">Setting up your dance journey</p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8"
          >
            <div className="quest-onboarding-container" style={{ minHeight: '400px' }}>
              <OnBoarding
                userId={userId}
                token={token}
                questId={questConfig.QUEST_ONBOARDING_QUESTID}
                answer={answers}
                setAnswer={setAnswers}
                getAnswers={handleOnboardingComplete}
                accent={questConfig.PRIMARY_COLOR}
                singleChoose="modal1"
                multiChoice="modal2"
              >
                <OnBoarding.Header />
                <OnBoarding.Content />
                <OnBoarding.Footer />
              </OnBoarding>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-400">
              Complete the setup to unlock your full dance community experience
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QuestOnboardingPage;