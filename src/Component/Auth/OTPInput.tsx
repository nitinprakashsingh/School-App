import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { authStyles } from './AuthStyles';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  onChange?: (otp: string) => void;
  onResendOTP: () => void;
  loading?: boolean;
  error?: string;
  phoneNumber?: string;
  email?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
  onChange,
  onResendOTP,
  loading = false,
  error,
  phoneNumber,
  email,
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    
    // Handle paste
    if (text.length > 1) {
      const pastedCode = text.slice(0, length).split('');
      for (let i = 0; i < length; i++) {
        newOtp[i] = pastedCode[i] || '';
      }
      setOtp(newOtp);
      const lastFilledIndex = pastedCode.length - 1;
      setActiveIndex(lastFilledIndex < length - 1 ? lastFilledIndex + 1 : length - 1);
      inputRefs.current[Math.min(lastFilledIndex + 1, length - 1)]?.focus();
    } else {
      newOtp[index] = text;
      setOtp(newOtp);
      
      // Move to next input
      if (text && index < length - 1) {
        setActiveIndex(index + 1);
        inputRefs.current[index + 1]?.focus();
      }
    }
    
    // Update parent component with current OTP
    const otpString = newOtp.join('');
    onChange?.(otpString);
    
    // Check if OTP is complete
    if (otpString.length === length && !otpString.includes('')) {
      onComplete(otpString);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = () => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
      setOtp(new Array(length).fill(''));
      setActiveIndex(0);
      inputRefs.current[0]?.focus();
      onResendOTP();
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMaskedContact = () => {
    if (phoneNumber) {
      return phoneNumber.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2');
    }
    if (email) {
      const [username, domain] = email.split('@');
      const maskedUsername = username.slice(0, 2) + '****' + username.slice(-2);
      return `${maskedUsername}@${domain}`;
    }
    return '';
  };

  return (
    <View>
      <Text style={authStyles.subtitle}>
        Enter the 6-digit code sent to {getMaskedContact()}
      </Text>
      
      <View style={authStyles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              if (ref) {
                inputRefs.current[index] = ref;
              }
            }}
            style={[
              authStyles.otpInput,
              digit ? authStyles.otpInputFilled : null,
              activeIndex === index ? authStyles.otpInputActive : null,
            ]}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
            onFocus={() => setActiveIndex(index)}
            keyboardType="numeric"
            maxLength={1}
            selectTextOnFocus
            editable={!loading}
          />
        ))}
      </View>

      {error && (
        <Text style={authStyles.errorText}>{error}</Text>
      )}

      <View style={authStyles.timerContainer}>
        {!canResend ? (
          <Text style={authStyles.timerText}>
            Resend OTP in {formatTimer(timer)}
          </Text>
        ) : null}
        
        <View style={authStyles.resendContainer}>
          <Text style={authStyles.resendText}>
            Didn't receive the code?
          </Text>
          <TouchableOpacity
            style={[
              authStyles.resendButton,
              !canResend && authStyles.resendButtonDisabled
            ]}
            onPress={handleResendOTP}
            disabled={!canResend || loading}
            activeOpacity={0.7}
          >
            <Text style={authStyles.resendButtonText}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OTPInput;