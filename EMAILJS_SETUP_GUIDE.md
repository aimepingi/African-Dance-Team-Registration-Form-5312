# 📧 EmailJS Setup Guide - Complete Configuration

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service (Yahoo Recommended)
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select "Yahoo" (recommended) or your preferred email provider
4. Follow these steps for Yahoo:
   - Click "Connect Account"
   - Sign in with your Yahoo account (aimepingi@yahoo.fr)
   - Grant permissions to EmailJS
   - Your service will be created with an ID like: `service_xxxxxxx`

## Step 3: Create Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template configuration:

### Template Settings:
- **Template Name**: `Danse Africaine Registration`
- **Template ID**: Will be auto-generated (like: `template_xxxxxxx`)

### Template Content:
**Subject**: `Nouvelle inscription - Équipe de Danse Africaine - {{from_name}}`

**Content (HTML)**:
```html
<h2>🎭 NOUVELLE INSCRIPTION - ÉQUIPE DE DANSE AFRICAINE</h2>
<hr>

<h3>👤 INFORMATIONS PERSONNELLES:</h3>
<ul>
  <li><strong>Nom:</strong> {{nom}}</li>
  <li><strong>Prénom:</strong> {{prenom}}</li>
  <li><strong>Email:</strong> {{reply_to}}</li>
  <li><strong>Téléphone:</strong> {{telephone}}</li>
  <li><strong>Date de naissance:</strong> {{date_naissance}}</li>
</ul>

<h3>💃 INFORMATIONS DANSE:</h3>
<ul>
  <li><strong>Expérience:</strong> {{experience_danse}}</li>
  <li><strong>Disponibilités:</strong> {{disponibilite}}</li>
</ul>

<h3>💭 MOTIVATION:</h3>
<p>{{motivation}}</p>

<hr>
<p><strong>📅 Date d'inscription:</strong> {{date_inscription}}</p>
<p><em>Cette inscription a été soumise via le formulaire en ligne.</em></p>
<p><em>Vous pouvez répondre directement à {{reply_to}}</em></p>
```

### Template Variables to Add:
- `{{from_name}}`
- `{{reply_to}}`
- `{{nom}}`
- `{{prenom}}`
- `{{telephone}}`
- `{{date_naissance}}`
- `{{experience_danse}}`
- `{{disponibilite}}`
- `{{motivation}}`
- `{{date_inscription}}`

## Step 4: Get Your Credentials
After setup, collect these 3 credentials:
1. **Service ID**: Found in "Email Services" (e.g., `service_abc123`)
2. **Template ID**: Found in "Email Templates" (e.g., `template_xyz789`)
3. **Public Key**: Found in "Account" > "General" (e.g., `user_abc123xyz`)

## Step 5: Test Your Configuration
1. In EmailJS dashboard, go to your template
2. Click "Test" button
3. Fill in sample data
4. Send test email to verify it works

## Step 6: Update Your Code
Replace the demo credentials in the files below with your real credentials.

## Important Notes:
- **Recipient Email**: All form submissions will be sent to **aimepingi@yahoo.fr**
- **Service Provider**: Use Yahoo service in EmailJS for best compatibility
- **Template Variables**: Make sure all variables are included in your template
- **Testing**: Always test your configuration before going live