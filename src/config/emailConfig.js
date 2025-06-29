// EmailJS Configuration - REAL CREDENTIALS
// Replace these values with your actual EmailJS credentials

export const EMAIL_CONFIG = {
  // 🔧 REPLACE THESE WITH YOUR REAL CREDENTIALS FROM EMAILJS.COM
  SERVICE_ID: 'YOUR_REAL_SERVICE_ID',        // e.g., 'service_abc123'
  TEMPLATE_ID: 'YOUR_REAL_TEMPLATE_ID',      // e.g., 'template_xyz789'
  PUBLIC_KEY: 'YOUR_REAL_PUBLIC_KEY',        // e.g., 'user_abc123xyz'
  TO_EMAIL: 'aimepingi@yahoo.fr'             // Updated recipient email
};

// 📋 SETUP INSTRUCTIONS:
// 1. Go to https://www.emailjs.com and create account
// 2. Add Yahoo service and connect aimepingi@yahoo.fr
// 3. Create template with variables: from_name, reply_to, nom, prenom, etc.
// 4. Copy Service ID, Template ID, and Public Key
// 5. Replace the values above
// 6. Test the configuration

// 🚨 SECURITY NOTE: These are public keys, safe to use in frontend
// The actual email sending is handled by EmailJS servers

export default EMAIL_CONFIG;