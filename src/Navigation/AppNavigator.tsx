import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import EBooksScreen from '../Container/Dashboard/Screens/EBooksScreen';
import StudyMaterialsScreen from '../Container/Dashboard/Screens/StudyMaterialsScreen';
import LoginScreen from '../Container/Auth/LoginScreen';
import OTPVerificationScreen from '../Container/Auth/OTPVerificationScreen';

const Stack = createStackNavigator();

// Wrapper components for stack screens
const EBooksWrapper = ({ navigation }: any) => (
  <EBooksScreen onClose={() => navigation.goBack()} />
);

const StudyMaterialsWrapper = ({ navigation }: any) => (
  <StudyMaterialsScreen onClose={() => navigation.goBack()} />
);

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4A90E2',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerificationScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigator}
          options={{ 
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        
        <Stack.Screen
          name="EBooks"
          component={EBooksWrapper}
          options={{
            headerTitle: '📖 eBooks & PDFs',
            presentation: 'modal',
          }}
        />
        
        <Stack.Screen
          name="StudyMaterials"
          component={StudyMaterialsWrapper}
          options={{
            headerTitle: '📝 Study Materials',
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;