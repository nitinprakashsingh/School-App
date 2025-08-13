# Authentication Screens

This directory contains the main authentication screens for the School App.

## Screens

### 🔐 LoginScreen
The main login screen with comprehensive authentication features.

**Features:**
- **Dual Login Methods**: Student ID or Email address
- **Form Validation**: Real-time validation with error messages
- **Password Security**: Masked input with visibility toggle
- **Forgot Password**: Integration with school administration
- **Loading States**: Visual feedback during authentication
- **Demo Credentials**: Built-in test accounts for development

**Demo Credentials:**
```
Student ID: STU001, STU002, or admin
Email: john.doe@school.edu, jane.smith@school.edu, admin@school.edu
Password: password123 (or admin123 for admin)
```

### 📱 OTPVerificationScreen
OTP verification screen with resend functionality and timer.

**Features:**
- **6-Digit OTP Input**: Auto-advancing input fields
- **Countdown Timer**: 60-second resend timer
- **Contact Masking**: Secure display of phone/email
- **Paste Support**: Quick OTP entry from SMS/email
- **Resend Functionality**: Request new OTP codes
- **Error Handling**: Clear feedback for invalid codes

**Demo OTP:**
```
Use: 123456 (for testing purposes)
```

## Navigation Flow

```
LoginScreen
     ↓
OTPVerificationScreen
     ↓
MainTabs (Dashboard)
```

## Usage

### Basic Implementation
```tsx
// In your navigator
import { LoginScreen, OTPVerificationScreen } from '../Container/Auth';

<Stack.Screen name="Login" component={LoginScreen} />
<Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
```

### Navigation Parameters
```tsx
// Navigate to OTP screen
navigation.navigate('OTPVerification', {
  studentId: 'STU001',
  loginMethod: 'studentId',
  phoneNumber: '+1 (555) 123-4567'  // optional
});
```

## Security Features

### 🔒 Authentication
- Form validation and sanitization
- Password masking and secure entry
- OTP-based two-factor authentication
- Session timeout handling

### 🛡️ Error Handling
- Comprehensive error messages
- Rate limiting simulation
- Invalid credential protection
- Network error recovery

### 📱 User Experience
- Keyboard-aware scrolling
- Auto-focus management
- Loading states and feedback
- Accessibility compliance

## Customization

### Theme Colors
```tsx
// Primary authentication color
primaryColor: '#4A90E2'  // School blue

// Error states
errorColor: '#dc3545'    // Red

// Success states
successColor: '#28a745'  // Green
```

### Validation Rules
```tsx
// Student ID validation
minLength: 4 characters
pattern: alphanumeric

// Email validation
pattern: standard email regex
required: valid domain

// Password validation
minLength: 6 characters
required: non-empty
```

## Integration Points

### 🔌 API Integration (Future)
```tsx
// Replace static validation with API calls
const authenticateUser = async (credentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
  return response.json();
};

const sendOTP = async (contact) => {
  const response = await fetch('/api/auth/send-otp', {
    method: 'POST',
    body: JSON.stringify({ contact })
  });
  return response.json();
};
```

### 🏫 School System Integration
- LDAP/Active Directory support
- Student Information System (SIS) integration
- Single Sign-On (SSO) compatibility
- Multi-tenant architecture support

## Development Notes

### 🧪 Testing
- Unit tests for validation logic
- Integration tests for navigation flow
- Accessibility testing
- Performance testing

### 📱 Platform Support
- iOS and Android compatibility
- Keyboard handling
- Safe area management
- Gesture navigation support

### 🔧 Maintenance
- Modular component architecture
- Centralized styling system
- TypeScript for type safety
- Comprehensive error logging