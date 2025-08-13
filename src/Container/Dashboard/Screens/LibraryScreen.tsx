import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { styles } from '../DashboardStyle';

interface LibraryProps {
  onClose?: () => void;
}

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'interactive' | 'quiz';
  subject: string;
  duration: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  icon: string;
}

const LibraryScreen: React.FC<LibraryProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Mathematics', 'Science', 'English', 'History', 'Geography'];

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Quadratic Equations Explained',
      type: 'video',
      subject: 'Mathematics',
      duration: '15 min',
      description: 'Complete guide to solving quadratic equations with examples',
      difficulty: 'Medium',
      icon: '🎥'
    },
    {
      id: '2',
      title: 'Photosynthesis Process',
      type: 'interactive',
      subject: 'Science',
      duration: '20 min',
      description: 'Interactive simulation of photosynthesis in plants',
      difficulty: 'Easy',
      icon: '🔬'
    },
    {
      id: '3',
      title: 'Grammar Rules Quiz',
      type: 'quiz',
      subject: 'English',
      duration: '10 min',
      description: 'Test your knowledge of English grammar rules',
      difficulty: 'Medium',
      icon: '📝'
    },
    {
      id: '4',
      title: 'World War II Timeline',
      type: 'article',
      subject: 'History',
      duration: '12 min',
      description: 'Comprehensive timeline of World War II events',
      difficulty: 'Hard',
      icon: '📚'
    },
    {
      id: '5',
      title: 'Climate Zones of India',
      type: 'video',
      subject: 'Geography',
      duration: '18 min',
      description: 'Visual guide to different climate zones in India',
      difficulty: 'Medium',
      icon: '🎥'
    },
    {
      id: '6',
      title: 'Algebra Basics',
      type: 'interactive',
      subject: 'Mathematics',
      duration: '25 min',
      description: 'Interactive exercises for learning algebra fundamentals',
      difficulty: 'Easy',
      icon: '🔢'
    },
    {
      id: '7',
      title: 'Chemical Reactions Lab',
      type: 'video',
      subject: 'Science',
      duration: '22 min',
      description: 'Virtual chemistry lab experiments and reactions',
      difficulty: 'Hard',
      icon: '🧪'
    },
    {
      id: '8',
      title: 'Poetry Analysis Guide',
      type: 'article',
      subject: 'English',
      duration: '14 min',
      description: 'Step-by-step guide to analyzing poetry',
      difficulty: 'Medium',
      icon: '📖'
    },
    {
      id: '9',
      title: 'Indian Independence Movement',
      type: 'video',
      subject: 'History',
      duration: '30 min',
      description: 'Documentary on India\'s struggle for independence',
      difficulty: 'Medium',
      icon: '🎬'
    },
    {
      id: '10',
      title: 'River Systems Quiz',
      type: 'quiz',
      subject: 'Geography',
      duration: '8 min',
      description: 'Test your knowledge of major river systems',
      difficulty: 'Easy',
      icon: '🌊'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.subject === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return '#FF6B6B';
      case 'article': return '#4ECDC4';
      case 'interactive': return '#45B7D1';
      case 'quiz': return '#96CEB4';
      default: return '#6c757d';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#28a745';
      case 'Medium': return '#ffc107';
      case 'Hard': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const renderCategoryTab = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.secondaryButton,
        { 
          marginRight: 10,
          backgroundColor: selectedCategory === category ? '#4A90E2' : '#e9ecef',
          marginTop: 0,
          paddingHorizontal: 15,
        }
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[
        styles.secondaryButtonText,
        { color: selectedCategory === category ? '#ffffff' : '#495057' }
      ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderResource = (resource: Resource) => (
    <TouchableOpacity key={resource.id} style={styles.listItem}>
      <Text style={styles.listItemIcon}>{resource.icon}</Text>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{resource.title}</Text>
        <Text style={styles.listItemSubtitle}>
          {resource.subject} • {resource.duration}
        </Text>
        <Text style={[styles.cardContent, { fontSize: 12, marginTop: 4 }]}>
          {resource.description}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 6, alignItems: 'center' }}>
          <View style={{
            backgroundColor: getTypeColor(resource.type),
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 12,
            marginRight: 8
          }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
              {resource.type.toUpperCase()}
            </Text>
          </View>
          <View style={{
            backgroundColor: getDifficultyColor(resource.difficulty),
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 12,
          }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
              {resource.difficulty}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.listItemAction}>
        <Text style={styles.listItemActionText}>Open</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.screenContainer}>

      <ScrollView style={styles.screenContent}>
        {/* Search Bar */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔍 Search Resources</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#e9ecef',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              marginTop: 8,
              fontSize: 16
            }}
            placeholder="Search for videos, articles, quizzes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Category Tabs */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.cardTitle}>📂 Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
            {categories.map(renderCategoryTab)}
          </ScrollView>
        </View>

        {/* Stats */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Library Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{resources.filter(r => r.type === 'video').length}</Text>
              <Text style={styles.statLabel}>Videos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{resources.filter(r => r.type === 'article').length}</Text>
              <Text style={styles.statLabel}>Articles</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{resources.filter(r => r.type === 'interactive').length}</Text>
              <Text style={styles.statLabel}>Interactive</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{resources.filter(r => r.type === 'quiz').length}</Text>
              <Text style={styles.statLabel}>Quizzes</Text>
            </View>
          </View>
        </View>

        {/* Results */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            📚 {selectedCategory === 'All' ? 'All Resources' : selectedCategory + ' Resources'} 
            ({filteredResources.length})
          </Text>
          {searchQuery ? (
            <Text style={styles.cardContent}>
              Showing results for "{searchQuery}"
            </Text>
          ) : null}
        </View>

        {/* Resource List */}
        {filteredResources.length > 0 ? (
          filteredResources.map(renderResource)
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>😔 No Resources Found</Text>
            <Text style={styles.cardContent}>
              Try adjusting your search terms or selecting a different category.
            </Text>
          </View>
        )}

        {/* Learning Tips */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💡 Learning Tips</Text>
          <Text style={styles.cardContent}>
            🎥 Videos: Great for visual learners{'\n'}
            📚 Articles: Perfect for detailed study{'\n'}
            🔬 Interactive: Hands-on learning experience{'\n'}
            📝 Quizzes: Test and reinforce your knowledge{'\n\n'}
            Mix different resource types for better understanding!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LibraryScreen;