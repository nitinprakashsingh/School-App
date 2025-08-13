import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

// Import screens
import Dashboard from '../../Container/Dashboard/Dashboard';
import TimetableScreen from '../../Container/Dashboard/Screens/TimetableScreen';
import SubjectsScreen from '../../Container/Dashboard/Screens/SubjectsScreen';
import LibraryScreen from '../../Container/Dashboard/Screens/LibraryScreen';
import HomeworkScreen from '../../Container/Dashboard/Screens/HomeworkScreen';

const Tab = createBottomTabNavigator();

// Wrapper components to handle navigation props
const TimetableWrapper = () => <TimetableScreen onClose={() => {}} />;
const SubjectsWrapper = () => <SubjectsScreen onClose={() => {}} />;
const LibraryWrapper = () => <LibraryScreen onClose={() => {}} />;
const HomeworkWrapper = () => <HomeworkScreen onClose={() => {}} />;

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#6c757d',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e9ecef',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#4A90E2',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: size - 4, color }}>🏠</Text>
            </View>
          ),
          headerTitle: 'Student Dashboard',
        }}
      />
      
      <Tab.Screen
        name="Timetable"
        component={TimetableWrapper}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: size - 4, color }}>📅</Text>
            </View>
          ),
          headerTitle: 'Class Timetable',
        }}
      />
      
      <Tab.Screen
        name="Subjects"
        component={SubjectsWrapper}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: size - 4, color }}>📚</Text>
            </View>
          ),
          headerTitle: 'Subjects & Syllabus',
        }}
      />
      
      <Tab.Screen
        name="Library"
        component={LibraryWrapper}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: size - 4, color }}>🏛️</Text>
            </View>
          ),
          headerTitle: 'Digital Library',
        }}
      />
      
      <Tab.Screen
        name="Homework"
        component={HomeworkWrapper}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: size - 4, color }}>✍️</Text>
            </View>
          ),
          headerTitle: 'Homework & Assignments',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;