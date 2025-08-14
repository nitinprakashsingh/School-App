import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawer from '../Component/Navigation/CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer props={props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 280,
        },
        drawerActiveBackgroundColor: '#4A90E2',
        drawerActiveTintColor: '#ffffff',
        drawerInactiveTintColor: '#2c3e50',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{
          drawerLabel: '🏠 Dashboard',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator; 