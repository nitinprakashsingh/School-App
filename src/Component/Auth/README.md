# Authentication Components

This directory contains reusable authentication components that can be used throughout the School App.

## Components

### 🔧 InputField
A customizable input field component with built-in validation and styling.

**Features:**
- Label with optional icon and required indicator
- Password visibility toggle
- Error state handling
- Consistent styling
- TypeScript support

**Usage:**
```tsx
<InputField
  label="Student ID"
  value={studentId}
  onChangeText={setStudentId}
  placeholder="Enter your Student ID"
  error={errors.studentId}
  icon="🆔"
  required
/>
```

### 🎯 AuthButton
A versatile button component for authentication actions.

**Features:**
- Multiple variants (primary, secondary, outline)
- Loading state with spinner
- Disabled state
- Icon support
- Consistent styling

**Usage:**
```tsx
<AuthButton
  title="Sign In"
  onPress={handleLogin}
  loading={loading}
  icon="🚀"
  variant="primary"
/>
```

### 🔢 OTPInput
A specialized component for OTP (One-Time Password) input with timer and resend functionality.

**Features:**
- 6-digit OTP input (configurable)
- Auto-focus next input
- Paste support
- Countdown timer
- Resend OTP functionality
- Masked contact display

**Usage:**
```tsx
<OTPInput
  length={6}
  onComplete={handleOTPComplete}
  onResendOTP={handleResendOTP}
  loading={loading}
  error={error}
  phoneNumber="+1 (555) 123-4567"
/>
```

## Styling

All components use the centralized `AuthStyles.tsx` file for consistent theming:

- **Primary Color**: #4A90E2 (School blue)
- **Error Color**: #dc3545 (Red)
- **Text Colors**: #2c3e50 (dark), #6c757d (gray)
- **Background**: #f8f9fa (light gray)

## Features

### 🎨 Design System
- Consistent spacing and typography
- Shadow effects and rounded corners
- Color-coded states (active, error, disabled)
- Responsive design

### ♿ Accessibility
- Proper label associations
- Color contrast compliance
- Touch target sizing
- Screen reader support

### 🔒 Security
- Password masking/unmasking
- Input validation
- Error handling
- Auto-complete attributes

## Usage Examples

### Basic Login Form
```tsx
import { InputField, AuthButton } from '../../Component/Auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <>
      <InputField
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        icon="📧"
      />
      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        isPassword
        icon="🔒"
      />
      <AuthButton
        title="Sign In"
        onPress={handleLogin}
      />
    </>
  );
};
```

### OTP Verification
```tsx
import { OTPInput, AuthButton } from '../../Component/Auth';

const OTPForm = () => {
  return (
    <>
      <OTPInput
        onComplete={handleVerification}
        onResendOTP={handleResend}
        phoneNumber="+1 (555) 123-4567"
      />
      <AuthButton
        title="Verify"
        onPress={handleVerify}
        variant="primary"
      />
    </>
  );
};
```

## Customization

Components are highly customizable through props and can be extended for specific use cases:

```tsx
// Custom styling
<AuthButton
  title="Custom Button"
  variant="outline"
  style={{ marginTop: 20 }}
  textStyle={{ fontSize: 16 }}
/>

// Custom validation
<InputField
  label="Custom Field"
  value={value}
  onChangeText={setValue}
  error={customValidation(value)}
/>
```