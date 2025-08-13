import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../Component/Auth/InputField';
import AuthButton from '../../Component/Auth/AuthButton';
import { authStyles } from '../../Component/Auth/AuthStyles';

interface LoginFormData {
  studentId: string;
  password: string;
}

interface FormErrors {
  studentId?: string;
  password?: string;
  general?: string;
}

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<LoginFormData>({
    studentId: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'studentId' | 'email'>('studentId');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate Student ID or Email
    if (!formData.studentId.trim()) {
      newErrors.studentId = loginMethod === 'studentId' 
        ? 'Student ID is required' 
        : 'Email is required';
    } else if (loginMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.studentId)) {
        newErrors.studentId = 'Please enter a valid email address';
      }
    } else {
      // Basic Student ID validation (assuming alphanumeric format)
      if (formData.studentId.length < 4) {
        newErrors.studentId = 'Student ID must be at least 4 characters';
      }
    }

    // Validate Password
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear specific field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Static validation for demo
      const validCredentials = [
        { id: 'STU001', email: 'john.doe@school.edu', password: 'password123' },
        { id: 'STU002', email: 'jane.smith@school.edu', password: 'password123' },
        { id: 'admin', email: 'admin@school.edu', password: 'admin123' },
      ];

      const user = validCredentials.find(cred => 
        (loginMethod === 'studentId' ? cred.id === formData.studentId : cred.email === formData.studentId) &&
        cred.password === formData.password
      );

      if (user) {
        // Success - navigate to OTP screen
        (navigation as any).navigate('OTPVerification', {
          studentId: formData.studentId,
          loginMethod,
        });
      } else {
        setErrors({ general: 'Invalid credentials. Please check your Student ID/Email and password.' });
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Please contact your school administrator or use the school portal to reset your password.',
      [
        {
          text: 'Contact Admin',
          onPress: () => Alert.alert('Contact Info', 'Email: admin@school.edu\nPhone: +1 (555) 123-4567'),
        },
        { text: 'OK', style: 'cancel' },
      ]
    );
  };

  const toggleLoginMethod = () => {
    setLoginMethod(prev => prev === 'studentId' ? 'email' : 'studentId');
    setFormData(prev => ({ ...prev, studentId: '' }));
    setErrors({});
  };

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={authStyles.container}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={authStyles.contentContainer}>
            {/* Header */}
            <View style={authStyles.headerContainer}>
              <Text style={authStyles.logo}>🎓</Text>
              <Text style={authStyles.title}>Welcome Back!</Text>
              <Text style={authStyles.subtitle}>
                Sign in to access your student dashboard
              </Text>
            </View>

            {/* Login Form */}
            <View style={authStyles.formContainer}>
              {/* Login Method Toggle */}
              <View style={authStyles.linkContainer}>
                <TouchableOpacity onPress={toggleLoginMethod} activeOpacity={0.7}>
                  <Text style={authStyles.linkText}>
                    Use {loginMethod === 'studentId' ? 'Email' : 'Student ID'} instead
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Student ID / Email Input */}
              <InputField
                label={loginMethod === 'studentId' ? 'Student ID' : 'Email Address'}
                value={formData.studentId}
                onChangeText={(value) => handleInputChange('studentId', value)}
                placeholder={loginMethod === 'studentId' ? 'Enter your Student ID' : 'Enter your email address'}
                error={errors.studentId}
                icon={loginMethod === 'studentId' ? '🆔' : '📧'}
                required
                autoCapitalize={loginMethod === 'studentId' ? 'characters' : 'none'}
                keyboardType={loginMethod === 'email' ? 'email-address' : 'default'}
                autoComplete={loginMethod === 'email' ? 'email' : 'username'}
              />

              {/* Password Input */}
              <InputField
                label="Password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="Enter your password"
                error={errors.password}
                icon="🔒"
                isPassword
                required
                autoComplete="password"
              />

              {/* General Error */}
              {errors.general && (
                <Text style={[authStyles.errorText, { textAlign: 'center', marginBottom: 16 }]}>
                  {errors.general}
                </Text>
              )}

              {/* Forgot Password Link */}
              <View style={authStyles.linkContainer}>
                <TouchableOpacity onPress={handleForgotPassword} activeOpacity={0.7}>
                  <Text style={authStyles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <AuthButton
                title="Sign In"
                onPress={handleLogin}
                loading={loading}
                icon="🚀"
              />

              {/* Demo Credentials Info */}
              <View style={authStyles.footerContainer}>
                <Text style={authStyles.footerText}>
                  Demo Credentials:{'\n'}
                  Student ID: STU001 or STU002{'\n'}
                  Email: john.doe@school.edu{'\n'}
                  Password: password123
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;