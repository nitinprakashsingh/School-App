import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { authStyles } from './AuthStyles';

interface InputFieldProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  isPassword?: boolean;
  icon?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  error,
  isPassword = false,
  icon,
  required = false,
  ...textInputProps
}) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(isPassword);

  const togglePasswordVisibility = () => {
    setIsSecureTextEntry(!isSecureTextEntry);
  };

  return (
    <View style={authStyles.inputContainer}>
      <View style={authStyles.labelContainer}>
        <Text style={authStyles.inputLabel}>
          {icon && <Text style={authStyles.labelIcon}>{icon} </Text>}
          {label}
          {required && <Text style={authStyles.requiredAsterisk}> *</Text>}
        </Text>
      </View>
      
      <View style={[
        authStyles.inputWrapper,
        error ? authStyles.inputWrapperError : null
      ]}>
        <TextInput
          style={authStyles.textInput}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecureTextEntry}
          placeholderTextColor="#adb5bd"
          {...textInputProps}
        />
        
        {isPassword && (
          <TouchableOpacity
            style={authStyles.eyeButton}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            <Text style={authStyles.eyeIcon}>
              {isSecureTextEntry ? '👁️' : '🙈'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text style={authStyles.errorText}>{error}</Text>
      )}
    </View>
  );
};

export default InputField;