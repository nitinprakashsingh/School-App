import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import OTPInput from '../../Component/Auth/OTPInput';
import AuthButton from '../../Component/Auth/AuthButton';
import { authStyles } from '../../Component/Auth/AuthStyles';

interface OTPVerificationProps {
  route?: {
    params?: {
      studentId: string;
      loginMethod: 'studentId' | 'email';
      phoneNumber?: string;
    };
  };
}

const OTPVerificationScreen: React.FC<OTPVerificationProps> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { studentId, loginMethod, phoneNumber } = route.params as any || {};
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');

  // Initialize enteredOTP state
  useEffect(() => {
    setEnteredOTP('');
    setError('');
  }, []);

  // Mock data for demo
  const mockPhoneNumber = phoneNumber || '+91 8540978755';
  const mockEmail = loginMethod === 'email' ? studentId : 'student@school.edu';

  const handleOTPComplete = async (otp: string) => {
    setEnteredOTP(otp);
    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Static OTP validation for demo (accept 123456 as valid OTP)
      if (otp === '123456') {
        Alert.alert(
          'Login Successful! 🎉',
          'Welcome to your student dashboard.',
          [
            {
              text: 'Continue',
              onPress: () => (navigation as any).navigate('MainTabs'),
            },
          ]
        );
      } else {
        setError('Invalid OTP. Please try again. (Use: 123456 for demo)');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPChange = (otp: string) => {
    setEnteredOTP(otp);
    setError(''); // Clear any previous errors when user types
  };

  const handleResendOTP = async () => {
    setError('');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'OTP Sent! 📱',
        `A new verification code has been sent to your ${loginMethod === 'email' ? 'email' : 'phone'}.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  const handleChangeLoginMethod = () => {
    Alert.alert(
      'Change Login Method',
      'Do you want to go back and use a different login method?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Go Back',
          onPress: () => (navigation as any).navigate('Login'),
        },
      ]
    );
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
              <Text style={authStyles.logo}>🔐</Text>
              <Text style={authStyles.title}>Verify Your Identity</Text>
              <Text style={authStyles.subtitle}>
                We've sent a verification code to confirm it's really you
              </Text>
            </View>

            {/* OTP Form */}
            <View style={authStyles.formContainer}>
              <OTPInput
                length={6}
                onComplete={handleOTPComplete}
                onChange={handleOTPChange}
                onResendOTP={handleResendOTP}
                loading={loading}
                error={error}
                phoneNumber={loginMethod === 'email' ? undefined : mockPhoneNumber}
                email={loginMethod === 'email' ? mockEmail : undefined}
              />

              {/* Verify Button */}
              <AuthButton
                title="Verify & Continue"
                onPress={() => enteredOTP && handleOTPComplete(enteredOTP)}
                loading={loading}
                disabled={enteredOTP.length !== 6}
                icon="✅"
              />

              {/* Alternative Actions */}
              <View style={authStyles.divider}>
                <View style={authStyles.dividerLine} />
                <Text style={authStyles.dividerText}>or</Text>
                <View style={authStyles.dividerLine} />
              </View>

              <AuthButton
                title="Back to Login"
                onPress={handleBackToLogin}
                variant="outline"
                icon="⬅️"
              />

              <View style={authStyles.linkContainer}>
                <TouchableOpacity onPress={handleChangeLoginMethod} activeOpacity={0.7}>
                  <Text style={authStyles.linkText}>
                    Use different login method
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;