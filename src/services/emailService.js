import emailjs from 'emailjs-com';
import EMAIL_CONFIG from '../config/emailConfig';

// Initialize EmailJS with public key
emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);

// Check if real credentials are configured
const isRealCredentialsConfigured = () => {
  return !EMAIL_CONFIG.SERVICE_ID.includes('YOUR_REAL') &&
         !EMAIL_CONFIG.TEMPLATE_ID.includes('YOUR_REAL') &&
         !EMAIL_CONFIG.PUBLIC_KEY.includes('YOUR_REAL');
};

export const sendRegistrationEmail = async (formData) => {
  try {
    // Format the availability days
    const availabilityText = formData.disponibilite.length > 0 
      ? formData.disponibilite.join(', ') 
      : 'Aucune disponibilité spécifiée';

    // Format the experience level
    const experienceLabels = {
      'debutant': 'Débutant(e) - Jamais dansé',
      'amateur': 'Amateur - Quelques cours',
      'intermediaire': 'Intermédiaire - Plusieurs années',
      'avance': 'Avancé(e) - Très expérimenté(e)'
    };

    // Prepare email template parameters
    const templateParams = {
      to_email: EMAIL_CONFIG.TO_EMAIL,
      from_name: `${formData.prenom} ${formData.nom}`,
      reply_to: formData.email,
      subject: 'Nouvelle inscription - Équipe de Danse Africaine',
      
      // Personal Information
      prenom: formData.prenom,
      nom: formData.nom,
      telephone: formData.telephone,
      date_naissance: formData.dateNaissance || 'Non spécifiée',
      
      // Dance Information
      experience_danse: experienceLabels[formData.experienceDanse] || 'Non spécifiée',
      disponibilite: availabilityText,
      motivation: formData.motivation || 'Aucune motivation spécifiée',
      
      // Formatted submission date
      date_inscription: new Date().toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    console.log('🔄 Attempting to send email...');
    console.log('📧 Recipient:', EMAIL_CONFIG.TO_EMAIL);
    console.log('👤 From:', templateParams.from_name);

    // Check if real credentials are configured
    if (!isRealCredentialsConfigured()) {
      console.warn('⚠️ Using demo credentials - Configure real EmailJS credentials for production');
      
      // Simulate successful email sending for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResponse = {
        status: 200,
        text: 'DEMO MODE - Email would be sent successfully',
        message: 'Configure real EmailJS credentials for actual email sending'
      };

      console.log('📧 DEMO: Email simulation completed');
      console.log('📋 Email content preview:', templateParams);
      
      return { success: true, response: mockResponse, isDemo: true };
    }

    // Send real email using EmailJS
    const response = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAIL_CONFIG.PUBLIC_KEY
    );

    console.log('✅ Email sent successfully via EmailJS!');
    console.log('📧 EmailJS Response:', response);
    
    return { success: true, response, isDemo: false };

  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    // Provide helpful error messages
    let errorMessage = error.message;
    if (error.status === 400) {
      errorMessage = 'Invalid email configuration. Please check your EmailJS credentials.';
    } else if (error.status === 401) {
      errorMessage = 'Unauthorized. Please verify your EmailJS public key.';
    } else if (error.status === 404) {
      errorMessage = 'Template or service not found. Please check your EmailJS IDs.';
    }
    
    return { success: false, error: errorMessage };
  }
};

// Test email function to verify configuration
export const testEmailConfiguration = async () => {
  const testData = {
    prenom: 'Test',
    nom: 'User',
    email: 'test@example.com',
    telephone: '06 12 34 56 78',
    dateNaissance: '1990-01-01',
    experienceDanse: 'debutant',
    motivation: 'Test de configuration EmailJS',
    disponibilite: ['Lundi', 'Mercredi']
  };

  console.log('🧪 Testing EmailJS configuration...');
  const result = await sendRegistrationEmail(testData);
  
  if (result.success) {
    console.log('✅ EmailJS configuration test successful!');
  } else {
    console.log('❌ EmailJS configuration test failed:', result.error);
  }
  
  return result;
};

// Fallback email method using browser's mailto
export const sendEmailViaMailto = (formData) => {
  const subject = encodeURIComponent('Nouvelle inscription - Équipe de Danse Africaine');
  const body = encodeURIComponent(`
🎭 NOUVELLE INSCRIPTION - ÉQUIPE DE DANSE AFRICAINE

👤 INFORMATIONS PERSONNELLES:
• Nom: ${formData.nom}
• Prénom: ${formData.prenom}
• Email: ${formData.email}
• Téléphone: ${formData.telephone}
• Date de naissance: ${formData.dateNaissance}

💃 INFORMATIONS DANSE:
• Expérience: ${formData.experienceDanse}
• Disponibilités: ${formData.disponibilite.join(', ')}

💭 MOTIVATION:
${formData.motivation}

📅 Date: ${new Date().toLocaleString('fr-FR')}

Cette inscription a été soumise via le formulaire en ligne.
  `);

  const mailtoLink = `mailto:${EMAIL_CONFIG.TO_EMAIL}?subject=${subject}&body=${body}`;
  window.open(mailtoLink);
  
  console.log('📧 Fallback: Opening mailto link');
  return { success: true, method: 'mailto' };
};

// Configuration status checker
export const getEmailConfigStatus = () => {
  const isConfigured = isRealCredentialsConfigured();
  
  return {
    isConfigured,
    service: EMAIL_CONFIG.SERVICE_ID,
    template: EMAIL_CONFIG.TEMPLATE_ID,
    publicKey: EMAIL_CONFIG.PUBLIC_KEY.substring(0, 10) + '...',
    recipient: EMAIL_CONFIG.TO_EMAIL,
    status: isConfigured ? '✅ Real EmailJS credentials configured' : '⚠️ Demo mode - Configure real credentials'
  };
};