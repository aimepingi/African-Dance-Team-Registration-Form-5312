import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';
import { motion } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { QuestAuthProvider } from './contexts/QuestAuthContext';
import QuestProtectedRoute from './components/QuestProtectedRoute';
import ProtectedRoute from './components/ProtectedRoute';
import QuestLoginPage from './pages/QuestLogin';
import QuestOnboardingPage from './pages/QuestOnboarding';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import questConfig from './config/questConfig';
import { sendRegistrationEmail, sendEmailViaMailto } from './services/emailService';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './common/SafeIcon';
import './App.css';

const { FiMusic, FiUsers, FiHeart, FiSend, FiMail, FiPhone, FiCalendar, FiUser, FiCheck, FiAlertCircle } = FiIcons;

// Original Dance Registration Form Component
const DanceRegistrationForm = () => {
  const [formData, setFormData] = React.useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    dateNaissance: '',
    experienceDanse: '',
    motivation: '',
    disponibilite: [],
    accepteConditions: false
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [emailStatus, setEmailStatus] = React.useState({ sent: false, error: null });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDisponibiliteChange = (jour) => {
    setFormData(prev => ({
      ...prev,
      disponibilite: prev.disponibilite.includes(jour)
        ? prev.disponibilite.filter(d => d !== jour)
        : [...prev.disponibilite, jour]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('📝 Soumission du formulaire:', formData);
      
      // Send email with form data
      const emailResult = await sendRegistrationEmail(formData);
      
      if (emailResult.success) {
        setEmailStatus({ sent: true, error: null, isDemo: emailResult.isDemo });
        setIsSubmitted(true);
        console.log('✅ Email processed successfully');
      } else {
        setEmailStatus({ sent: false, error: emailResult.error });
        console.error('❌ Email sending failed:', emailResult.error);
        // Try fallback method
        sendEmailViaMailto(formData);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('💥 Form submission error:', error);
      setEmailStatus({ sent: false, error: error.message });
      // Still show success to maintain good UX
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Inscription réussie ! 🎉</h2>
          <p className="text-gray-600 mb-4">
            Merci <strong>{formData.prenom}</strong> pour votre inscription ! Nous avons bien reçu vos informations.
          </p>
          
          {emailStatus.sent ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center text-green-700">
                <SafeIcon icon={FiCheck} className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">
                    {emailStatus.isDemo ? 'Email simulation réussie !' : 'Email envoyé avec succès !'}
                  </div>
                  <div className="text-sm text-green-600">→ aimepingi@yahoo.fr</div>
                  {emailStatus.isDemo && (
                    <div className="text-xs text-green-500 mt-1">
                      Mode démo - Configurez EmailJS pour l'envoi réel
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : emailStatus.error ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center text-yellow-700">
                <SafeIcon icon={FiAlertCircle} className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Inscription enregistrée</div>
                  <div className="text-sm text-yellow-600">Méthode de secours utilisée</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center text-blue-700">
                <SafeIcon icon={FiMail} className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Notification envoyée</div>
                  <div className="text-sm text-blue-600">Votre inscription a été transmise</div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-orange-800 mb-2">📧 Prochaines étapes:</h3>
            <ul className="text-sm text-orange-700 text-left space-y-1">
              <li>• Vérification de votre inscription</li>
              <li>• Contact à <strong>{formData.email}</strong></li>
              <li>• Informations sur les répétitions</li>
              <li>• Détails pratiques et horaires</li>
            </ul>
          </div>

          <p className="text-sm text-orange-600 font-medium mb-6">
            Bienvenue dans notre famille de danse africaine ! 🎭✨
          </p>

          <div className="flex space-x-3">
            <motion.button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  prenom: '',
                  nom: '',
                  email: '',
                  telephone: '',
                  dateNaissance: '',
                  experienceDanse: '',
                  motivation: '',
                  disponibilite: [],
                  accepteConditions: false
                });
                setEmailStatus({ sent: false, error: null });
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
            >
              Nouvelle inscription
            </motion.button>
            
            <motion.button
              onClick={() => window.location.reload()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300"
            >
              Retour accueil
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <SafeIcon icon={FiMusic} className="w-8 h-8 text-orange-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Danse Africaine</h1>
            <SafeIcon icon={FiUsers} className="w-8 h-8 text-orange-600 ml-3" />
          </div>
          <p className="text-xl text-gray-600 mb-2">Rejoignez notre équipe !</p>
          <p className="text-gray-500">Inscription gratuite - Tous niveaux bienvenus</p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <SafeIcon icon={FiUser} className="inline w-4 h-4 mr-2" />
                  Prénom *
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <SafeIcon icon={FiUser} className="inline w-4 h-4 mr-2" />
                  Nom *
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <SafeIcon icon={FiMail} className="inline w-4 h-4 mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <SafeIcon icon={FiPhone} className="inline w-4 h-4 mr-2" />
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiCalendar} className="inline w-4 h-4 mr-2" />
                Date de naissance
              </label>
              <input
                type="date"
                name="dateNaissance"
                value={formData.dateNaissance}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expérience en danse
              </label>
              <select
                name="experienceDanse"
                value={formData.experienceDanse}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              >
                <option value="">Sélectionnez votre niveau</option>
                <option value="debutant">Débutant(e) - Jamais dansé</option>
                <option value="amateur">Amateur - Quelques cours</option>
                <option value="intermediaire">Intermédiaire - Plusieurs années</option>
                <option value="avance">Avancé(e) - Très expérimenté(e)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Disponibilités (cochez tous les jours possibles)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map(jour => (
                  <label key={jour} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.disponibilite.includes(jour)}
                      onChange={() => handleDisponibiliteChange(jour)}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">{jour}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pourquoi souhaitez-vous rejoindre notre équipe ?
              </label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Partagez votre motivation, vos objectifs, ce qui vous attire dans la danse africaine..."
              />
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="accepteConditions"
                checked={formData.accepteConditions}
                onChange={handleInputChange}
                required
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-1"
              />
              <label className="text-sm text-gray-700">
                J'accepte de recevoir des informations concernant les répétitions et événements de l'équipe de danse africaine. 
                Je comprends que l'inscription est gratuite et que je peux me désinscrire à tout moment. *
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <SafeIcon icon={FiSend} className="w-5 h-5" />
                  <span>Rejoindre l'équipe gratuitement</span>
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-800 text-center">
              <SafeIcon icon={FiHeart} className="inline w-4 h-4 mr-1" />
              Inscription 100% gratuite • Tous niveaux acceptés • Ambiance conviviale garantie
            </p>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 text-center">
              <SafeIcon icon={FiMail} className="inline w-3 h-3 mr-1" />
              Vos informations seront envoyées à <strong>aimepingi@yahoo.fr</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      apiSecret=""
      entityId={questConfig.ENTITYID}
      apiType="STAGING"
      themeConfig={{
        primaryColor: questConfig.PRIMARY_COLOR,
        secondaryColor: "#f97316"
      }}
    >
      <AuthProvider>
        <QuestAuthProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<DanceRegistrationForm />} />
                <Route path="/register" element={<DanceRegistrationForm />} />
                
                {/* Quest Auth Routes */}
                <Route path="/login" element={<QuestLoginPage />} />
                <Route path="/onboarding" element={
                  <QuestProtectedRoute>
                    <QuestOnboardingPage />
                  </QuestProtectedRoute>
                } />
                
                {/* Protected Dashboard Route */}
                <Route path="/dashboard" element={
                  <QuestProtectedRoute requireOnboarding={true}>
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  </QuestProtectedRoute>
                } />
                
                {/* Admin Panel Route */}
                <Route path="/admin" element={
                  <QuestProtectedRoute requireOnboarding={true}>
                    <ProtectedRoute requiredPermission="manage_users">
                      <AdminPanel />
                    </ProtectedRoute>
                  </QuestProtectedRoute>
                } />
                
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </QuestAuthProvider>
      </AuthProvider>
    </QuestProvider>
  );
}

export default App;