import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { getEmailConfigStatus, testEmailConfiguration } from '../services/emailService';

const { FiMail, FiCheck, FiAlertTriangle, FiSettings, FiSend } = FiIcons;

const EmailConfigStatus = () => {
  const [status, setStatus] = React.useState(getEmailConfigStatus());
  const [isTestingEmail, setIsTestingEmail] = React.useState(false);
  const [testResult, setTestResult] = React.useState(null);

  const handleTestEmail = async () => {
    setIsTestingEmail(true);
    setTestResult(null);
    
    try {
      const result = await testEmailConfiguration();
      setTestResult(result);
    } catch (error) {
      setTestResult({ success: false, error: error.message });
    } finally {
      setIsTestingEmail(false);
    }
  };

  const refreshStatus = () => {
    setStatus(getEmailConfigStatus());
    setTestResult(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <SafeIcon icon={FiMail} className="w-5 h-5 mr-2 text-blue-600" />
          EmailJS Configuration Status
        </h3>
        <button
          onClick={refreshStatus}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          <SafeIcon icon={FiSettings} className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <SafeIcon 
            icon={status.isConfigured ? FiCheck : FiAlertTriangle} 
            className={`w-5 h-5 ${status.isConfigured ? 'text-green-600' : 'text-yellow-600'}`} 
          />
          <span className="text-sm font-medium text-gray-700">
            {status.status}
          </span>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
          <div className="text-xs text-gray-600">
            <strong>Service ID:</strong> {status.service}
          </div>
          <div className="text-xs text-gray-600">
            <strong>Template ID:</strong> {status.template}
          </div>
          <div className="text-xs text-gray-600">
            <strong>Public Key:</strong> {status.publicKey}
          </div>
          <div className="text-xs text-gray-600">
            <strong>Recipient:</strong> {status.recipient}
          </div>
        </div>

        {!status.isConfigured && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <SafeIcon icon={FiAlertTriangle} className="inline w-4 h-4 mr-1" />
              Demo mode active. Follow the setup guide in <code>EMAILJS_SETUP_GUIDE.md</code> to configure real credentials.
            </p>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={handleTestEmail}
            disabled={isTestingEmail}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTestingEmail ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span className="text-sm">Testing...</span>
              </>
            ) : (
              <>
                <SafeIcon icon={FiSend} className="w-4 h-4" />
                <span className="text-sm">Test Email</span>
              </>
            )}
          </button>
        </div>

        {testResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-3 rounded-lg ${testResult.success 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className={`flex items-center space-x-2 ${testResult.success ? 'text-green-700' : 'text-red-700'}`}>
              <SafeIcon 
                icon={testResult.success ? FiCheck : FiAlertTriangle} 
                className="w-4 h-4" 
              />
              <span className="text-sm font-medium">
                {testResult.success 
                  ? 'Test email sent successfully!' 
                  : 'Test email failed'
                }
              </span>
            </div>
            {testResult.error && (
              <p className="text-sm text-red-600 mt-1">{testResult.error}</p>
            )}
            {testResult.isDemo && (
              <p className="text-sm text-green-600 mt-1">
                Demo mode: Email simulation completed successfully
              </p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default EmailConfigStatus;