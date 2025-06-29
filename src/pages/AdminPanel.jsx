import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import EmailConfigStatus from '../components/EmailConfigStatus';

const { FiSettings, FiMail, FiUsers, FiActivity } = FiIcons;

const AdminPanel = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <SafeIcon icon={FiSettings} className="w-8 h-8 mr-3 text-blue-600" />
          Admin Panel - Configuration
        </h1>
        <p className="text-gray-600">
          Manage your application settings and monitor email configuration.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmailConfigStatus />
        
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <SafeIcon icon={FiActivity} className="w-5 h-5 mr-2 text-green-600" />
            System Status
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Registration Form</span>
              <span className="text-sm font-medium text-green-600">✅ Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">User Authentication</span>
              <span className="text-sm font-medium text-green-600">✅ Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Dashboard</span>
              <span className="text-sm font-medium text-green-600">✅ Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Quest Integration</span>
              <span className="text-sm font-medium text-green-600">✅ Active</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <SafeIcon icon={FiMail} className="w-5 h-5 mr-2 text-orange-600" />
          EmailJS Setup Instructions
        </h3>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-medium text-orange-800 mb-2">📋 Quick Setup Steps:</h4>
          <ol className="text-sm text-orange-700 space-y-1 list-decimal list-inside">
            <li>Go to <a href="https://www.emailjs.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-900">emailjs.com</a> and create account</li>
            <li>Add Yahoo service and connect <strong>aimepingi@yahoo.fr</strong></li>
            <li>Create template with required variables</li>
            <li>Copy Service ID, Template ID, and Public Key</li>
            <li>Update <code>src/config/emailConfig.js</code> with real credentials</li>
            <li>Test configuration using the button above</li>
          </ol>
          
          <div className="mt-3 p-2 bg-orange-100 rounded">
            <p className="text-xs text-orange-600">
              💡 <strong>Tip:</strong> Check <code>EMAILJS_SETUP_GUIDE.md</code> for detailed instructions with screenshots.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminPanel;