import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './DashboardStyle';

interface DashboardItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  const dashboardItems: DashboardItem[] = [
    {
      id: 'timetable',
      title: 'Class Timetable',
      description: 'View your daily class schedule',
      icon: '📅',
      color: '#4A90E2',
    },
    {
      id: 'subjects',
      title: 'Subjects & Syllabus',
      description: 'Explore subjects and curriculum',
      icon: '📚',
      color: '#7ED321',
    },
    {
      id: 'library',
      title: 'Digital Library',
      description: 'Access learning resources',
      icon: '🏛️',
      color: '#F5A623',
    },
    {
      id: 'homework',
      title: 'Homework & Assignments',
      description: 'Submit your assignments',
      icon: '✍️',
      color: '#BD10E0',
    },
    {
      id: 'ebooks',
      title: 'eBooks & PDFs',
      description: 'Access digital textbooks',
      icon: '📖',
      color: '#B8E986',
    },
    {
      id: 'study-materials',
      title: 'Study Materials',
      description: 'View lesson plans and notes',
      icon: '📝',
      color: '#50E3C2',
    },
  ];

  const handleItemPress = (screenId: string) => {
    switch (screenId) {
      case 'timetable':
        navigation.navigate('Timetable' as never);
        break;
      case 'subjects':
        navigation.navigate('Subjects' as never);
        break;
      case 'library':
        navigation.navigate('Library' as never);
        break;
      case 'homework':
        navigation.navigate('Homework' as never);
        break;
      case 'ebooks':
        navigation.navigate('EBooks' as never);
        break;
      case 'study-materials':
        navigation.navigate('StudyMaterials' as never);
        break;
      default:
        break;
    }
  };

  const renderDashboardItem = (item: DashboardItem) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.dashboardItem, { borderLeftColor: item.color }]}
      onPress={() => handleItemPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemIcon}>{item.icon}</Text>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.itemArrow}>
          <Text style={styles.arrowText}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Dashboard</Text>
        <Text style={styles.headerSubtitle}>Welcome back! Ready to learn?</Text>
      </View>

      {/* Dashboard Grid */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.dashboardGrid}>
          {dashboardItems.map(renderDashboardItem)}
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Quick Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>6</Text>
              <Text style={styles.statLabel}>Subjects</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Pending Tasks</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>eBooks</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>Progress</Text>
            </View>
          </View>
        </View>
      </ScrollView>


    </SafeAreaView>
  );
};

export default Dashboard;
