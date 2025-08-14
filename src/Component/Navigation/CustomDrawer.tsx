import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

interface CustomDrawerProps {
  props: any;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ props }) => {
  // Mock student data
  const studentData = {
    name: 'Rahul Kumar',
    rollNumber: 'STU001',
    class: 'Class 10-A',
    email: 'rahul.kumar@school.edu',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout pressed');
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: studentData.profileImage }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.studentName}>{studentData.name}</Text>
            <Text style={styles.rollNumber}>Roll No: {studentData.rollNumber}</Text>
            <Text style={styles.className}>{studentData.class}</Text>
            <Text style={styles.email}>{studentData.email}</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3/5</Text>
            <Text style={styles.statLabel}>Fees Paid</Text>
          </View>
        </View>

        {/* Navigation Items */}
        <View style={styles.navigationSection}>
          <DrawerItemList {...props} />
        </View>

        {/* Additional Menu Items */}
        <View style={styles.additionalMenu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>👨‍🏫</Text>
            <Text style={styles.menuText}>Contact Teacher</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>📞</Text>
            <Text style={styles.menuText}>Contact Admin</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>📋</Text>
            <Text style={styles.menuText}>Academic Calendar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>⚙️</Text>
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>❓</Text>
            <Text style={styles.menuText}>Help & Support</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      {/* Logout Section */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#4A90E2',
  },
  profileInfo: {
    marginBottom: 10,
  },
  studentName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  rollNumber: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
    marginBottom: 2,
  },
  className: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 2,
  },
  email: {
    fontSize: 12,
    color: '#6c757d',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#6c757d',
    textAlign: 'center',
  },
  navigationSection: {
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  additionalMenu: {
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 15,
    width: 20,
    textAlign: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  logoutSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default CustomDrawer; 