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

interface StudyMaterialsProps {
  onClose?: () => void;
}

interface StudyMaterial {
  id: string;
  title: string;
  type: 'lesson-plan' | 'notes' | 'worksheet' | 'presentation' | 'video-notes';
  subject: string;
  chapter: string;
  description: string;
  createdDate: string;
  size: string;
  downloadCount: number;
}

interface LessonPlan {
  id: string;
  subject: string;
  chapter: string;
  topic: string;
  duration: string;
  objectives: string[];
  activities: string[];
  resources: string[];
  assessment: string;
  homework: string;
}

const StudyMaterialsScreen: React.FC<StudyMaterialsProps> = ({ onClose }) => {
  const [selectedTab, setSelectedTab] = useState('materials');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLessonPlan, setSelectedLessonPlan] = useState<LessonPlan | null>(null);

  const subjects = ['All', 'Mathematics', 'Science', 'English', 'History', 'Geography', 'Hindi'];

  const studyMaterials: StudyMaterial[] = [
    {
      id: '1',
      title: 'Quadratic Equations - Complete Notes',
      type: 'notes',
      subject: 'Mathematics',
      chapter: 'Chapter 4',
      description: 'Comprehensive notes covering all methods of solving quadratic equations',
      createdDate: '2024-01-10',
      size: '2.3 MB',
      downloadCount: 156
    },
    {
      id: '2',
      title: 'Light Reflection - Worksheet',
      type: 'worksheet',
      subject: 'Science',
      chapter: 'Chapter 1',
      description: 'Practice worksheet with diagrams and numerical problems',
      createdDate: '2024-01-08',
      size: '1.8 MB',
      downloadCount: 203
    },
    {
      id: '3',
      title: 'Poetry Analysis - Presentation',
      type: 'presentation',
      subject: 'English',
      chapter: 'Chapter 3',
      description: 'PowerPoint presentation on analyzing poetry themes and devices',
      createdDate: '2024-01-12',
      size: '4.1 MB',
      downloadCount: 89
    },
    {
      id: '4',
      title: 'Nationalism in Europe - Mind Map',
      type: 'notes',
      subject: 'History',
      chapter: 'Chapter 1',
      description: 'Visual mind map covering key events and personalities',
      createdDate: '2024-01-05',
      size: '1.2 MB',
      downloadCount: 134
    },
    {
      id: '5',
      title: 'Resources and Development - Case Study',
      type: 'worksheet',
      subject: 'Geography',
      chapter: 'Chapter 1',
      description: 'Case study analysis of resource utilization in different regions',
      createdDate: '2024-01-15',
      size: '2.7 MB',
      downloadCount: 98
    },
    {
      id: '6',
      title: 'Surdas Ke Pad - Video Notes',
      type: 'video-notes',
      subject: 'Hindi',
      chapter: 'Chapter 1',
      description: 'Video explanation with text notes of Surdas poetry',
      createdDate: '2024-01-07',
      size: '15.4 MB',
      downloadCount: 167
    },
    {
      id: '7',
      title: 'Triangles - Theorem Proofs',
      type: 'notes',
      subject: 'Mathematics',
      chapter: 'Chapter 6',
      description: 'Step-by-step proofs of all triangle theorems with diagrams',
      createdDate: '2024-01-11',
      size: '3.2 MB',
      downloadCount: 178
    },
    {
      id: '8',
      title: 'Electricity - Lab Manual',
      type: 'worksheet',
      subject: 'Science',
      chapter: 'Chapter 3',
      description: 'Complete lab manual with circuit diagrams and calculations',
      createdDate: '2024-01-09',
      size: '2.9 MB',
      downloadCount: 145
    }
  ];

  const lessonPlans: LessonPlan[] = [
    {
      id: '1',
      subject: 'Mathematics',
      chapter: 'Chapter 4',
      topic: 'Quadratic Equations - Factorization Method',
      duration: '45 minutes',
      objectives: [
        'Understand the concept of quadratic equations',
        'Learn factorization method for solving quadratic equations',
        'Apply the method to solve real-world problems'
      ],
      activities: [
        'Warm-up: Review of algebraic identities (5 min)',
        'Introduction to quadratic equations with examples (10 min)',
        'Demonstration of factorization method (15 min)',
        'Guided practice with students (10 min)',
        'Independent practice and Q&A (5 min)'
      ],
      resources: [
        'Whiteboard and markers',
        'Textbook examples',
        'Practice worksheets',
        'Calculator (if needed)'
      ],
      assessment: 'Students will solve 5 quadratic equations using factorization method',
      homework: 'Complete Exercise 4.2, Questions 1-10 from NCERT textbook'
    },
    {
      id: '2',
      subject: 'Science',
      chapter: 'Chapter 1',
      topic: 'Light - Reflection and Refraction',
      duration: '45 minutes',
      objectives: [
        'Understand laws of reflection',
        'Learn about refraction of light',
        'Observe practical applications in daily life'
      ],
      activities: [
        'Demonstration with mirror and laser pointer (10 min)',
        'Explain laws of reflection with diagrams (10 min)',
        'Introduction to refraction concept (10 min)',
        'Practical activity: Coin in water experiment (10 min)',
        'Discussion and summary (5 min)'
      ],
      resources: [
        'Plane mirror',
        'Laser pointer or torch',
        'Glass of water',
        'Coin',
        'Protractor'
      ],
      assessment: 'Draw ray diagrams for reflection and refraction',
      homework: 'Observe and list 5 examples of reflection and refraction from daily life'
    },
    {
      id: '3',
      subject: 'English',
      chapter: 'Chapter 2',
      topic: 'Nelson Mandela - Character Analysis',
      duration: '45 minutes',
      objectives: [
        'Analyze Nelson Mandela\'s character traits',
        'Understand the theme of freedom and sacrifice',
        'Develop critical thinking about leadership qualities'
      ],
      activities: [
        'Recap of previous lesson (5 min)',
        'Reading selected passages aloud (10 min)',
        'Group discussion on character traits (15 min)',
        'Individual reflection writing (10 min)',
        'Sharing and conclusion (5 min)'
      ],
      resources: [
        'NCERT English textbook',
        'Character analysis worksheet',
        'Audio/video clips (if available)',
        'Writing materials'
      ],
      assessment: 'Write a paragraph describing Mandela\'s leadership qualities',
      homework: 'Read the complete chapter and prepare questions for next class'
    }
  ];

  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSubject = selectedSubject === 'All' || material.subject === selectedSubject;
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const filteredLessonPlans = lessonPlans.filter(plan => {
    const matchesSubject = selectedSubject === 'All' || plan.subject === selectedSubject;
    const matchesSearch = plan.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.chapter.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson-plan': return '📋';
      case 'notes': return '📝';
      case 'worksheet': return '📄';
      case 'presentation': return '📊';
      case 'video-notes': return '🎥';
      default: return '📚';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lesson-plan': return '#4A90E2';
      case 'notes': return '#28a745';
      case 'worksheet': return '#ffc107';
      case 'presentation': return '#dc3545';
      case 'video-notes': return '#6f42c1';
      default: return '#6c757d';
    }
  };

  const renderTabButton = (tab: string, label: string) => (
    <TouchableOpacity
      key={tab}
      style={[
        styles.secondaryButton,
        { 
          marginRight: 10,
          backgroundColor: selectedTab === tab ? '#4A90E2' : '#e9ecef',
          marginTop: 0,
          flex: 1,
        }
      ]}
      onPress={() => setSelectedTab(tab)}
    >
      <Text style={[
        styles.secondaryButtonText,
        { color: selectedTab === tab ? '#ffffff' : '#495057' }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderSubjectTab = (subject: string) => (
    <TouchableOpacity
      key={subject}
      style={[
        styles.secondaryButton,
        { 
          marginRight: 10,
          backgroundColor: selectedSubject === subject ? '#4A90E2' : '#e9ecef',
          marginTop: 0,
          paddingHorizontal: 15,
        }
      ]}
      onPress={() => setSelectedSubject(subject)}
    >
      <Text style={[
        styles.secondaryButtonText,
        { color: selectedSubject === subject ? '#ffffff' : '#495057' }
      ]}>
        {subject}
      </Text>
    </TouchableOpacity>
  );

  const renderMaterial = (material: StudyMaterial) => (
    <TouchableOpacity key={material.id} style={styles.listItem}>
      <Text style={styles.listItemIcon}>{getTypeIcon(material.type)}</Text>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{material.title}</Text>
        <Text style={styles.listItemSubtitle}>
          {material.subject} • {material.chapter} • {material.size}
        </Text>
        <Text style={[styles.cardContent, { fontSize: 12, marginTop: 4 }]}>
          {material.description}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 6, alignItems: 'center' }}>
          <View style={{
            backgroundColor: getTypeColor(material.type),
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 12,
            marginRight: 8
          }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
              {material.type.replace('-', ' ').toUpperCase()}
            </Text>
          </View>
          <Text style={{ fontSize: 10, color: '#6c757d' }}>
            📥 {material.downloadCount} downloads
          </Text>
        </View>
      </View>
      <View style={styles.listItemAction}>
        <Text style={styles.listItemActionText}>Download</Text>
      </View>
    </TouchableOpacity>
  );

  const renderLessonPlan = (plan: LessonPlan) => (
    <TouchableOpacity
      key={plan.id}
      style={styles.listItem}
      onPress={() => setSelectedLessonPlan(plan)}
    >
      <Text style={styles.listItemIcon}>📋</Text>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{plan.topic}</Text>
        <Text style={styles.listItemSubtitle}>
          {plan.subject} • {plan.chapter} • {plan.duration}
        </Text>
        <Text style={[styles.cardContent, { fontSize: 12, marginTop: 4 }]}>
          {plan.objectives[0]}
        </Text>
      </View>
      <View style={styles.listItemAction}>
        <Text style={styles.listItemActionText}>View</Text>
      </View>
    </TouchableOpacity>
  );

  const renderLessonPlanDetail = () => {
    if (!selectedLessonPlan) return null;

    return (
      <ScrollView style={styles.screenContent}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setSelectedLessonPlan(null)}
        >
          <Text style={styles.secondaryButtonText}>← Back to Lesson Plans</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 24, marginRight: 10 }}>📋</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{selectedLessonPlan.topic}</Text>
              <Text style={styles.cardContent}>
                {selectedLessonPlan.subject} • {selectedLessonPlan.chapter} • {selectedLessonPlan.duration}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Learning Objectives</Text>
          {selectedLessonPlan.objectives.map((objective, index) => (
            <Text key={index} style={[styles.cardContent, { marginBottom: 5 }]}>
              {index + 1}. {objective}
            </Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📚 Lesson Activities</Text>
          {selectedLessonPlan.activities.map((activity, index) => (
            <Text key={index} style={[styles.cardContent, { marginBottom: 8 }]}>
              • {activity}
            </Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🛠️ Required Resources</Text>
          {selectedLessonPlan.resources.map((resource, index) => (
            <Text key={index} style={[styles.cardContent, { marginBottom: 5 }]}>
              • {resource}
            </Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Assessment</Text>
          <Text style={styles.cardContent}>{selectedLessonPlan.assessment}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏠 Homework</Text>
          <Text style={styles.cardContent}>{selectedLessonPlan.homework}</Text>
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>📥 Download Lesson Plan</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer}>

      {selectedLessonPlan ? (
        renderLessonPlanDetail()
      ) : (
        <ScrollView style={styles.screenContent}>
          {/* Tab Navigation */}
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            {renderTabButton('materials', 'Study Materials')}
            {renderTabButton('lesson-plans', 'Lesson Plans')}
          </View>

          {/* Search Bar */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🔍 Search {selectedTab === 'materials' ? 'Materials' : 'Lesson Plans'}</Text>
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
              placeholder={`Search for ${selectedTab === 'materials' ? 'notes, worksheets, presentations' : 'lesson plans, topics, chapters'}...`}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Subject Tabs */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.cardTitle}>📂 Subjects</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
              {subjects.map(renderSubjectTab)}
            </ScrollView>
          </View>

          {/* Stats */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📊 {selectedTab === 'materials' ? 'Materials' : 'Lesson Plans'} Stats</Text>
            {selectedTab === 'materials' ? (
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{studyMaterials.filter(m => m.type === 'notes').length}</Text>
                  <Text style={styles.statLabel}>Notes</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{studyMaterials.filter(m => m.type === 'worksheet').length}</Text>
                  <Text style={styles.statLabel}>Worksheets</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{studyMaterials.filter(m => m.type === 'presentation').length}</Text>
                  <Text style={styles.statLabel}>Presentations</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{studyMaterials.filter(m => m.type === 'video-notes').length}</Text>
                  <Text style={styles.statLabel}>Video Notes</Text>
                </View>
              </View>
            ) : (
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{lessonPlans.filter(p => p.subject === 'Mathematics').length}</Text>
                  <Text style={styles.statLabel}>Math</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{lessonPlans.filter(p => p.subject === 'Science').length}</Text>
                  <Text style={styles.statLabel}>Science</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{lessonPlans.filter(p => p.subject === 'English').length}</Text>
                  <Text style={styles.statLabel}>English</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{lessonPlans.length}</Text>
                  <Text style={styles.statLabel}>Total</Text>
                </View>
              </View>
            )}
          </View>

          {/* Results */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              📚 {selectedSubject === 'All' ? 'All' : selectedSubject} {selectedTab === 'materials' ? 'Materials' : 'Lesson Plans'}
              ({selectedTab === 'materials' ? filteredMaterials.length : filteredLessonPlans.length})
            </Text>
            {searchQuery ? (
              <Text style={styles.cardContent}>
                Showing results for "{searchQuery}"
              </Text>
            ) : null}
          </View>

          {/* Content List */}
          {selectedTab === 'materials' ? (
            filteredMaterials.length > 0 ? (
              filteredMaterials.map(renderMaterial)
            ) : (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>😔 No Materials Found</Text>
                <Text style={styles.cardContent}>
                  Try adjusting your search terms or selecting a different subject.
                </Text>
              </View>
            )
          ) : (
            filteredLessonPlans.length > 0 ? (
              filteredLessonPlans.map(renderLessonPlan)
            ) : (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>😔 No Lesson Plans Found</Text>
                <Text style={styles.cardContent}>
                  Try adjusting your search terms or selecting a different subject.
                </Text>
              </View>
            )
          )}

          {/* Study Tips */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>💡 Study Tips</Text>
            <Text style={styles.cardContent}>
              📝 Review notes regularly for better retention{'\n'}
              📄 Practice worksheets to reinforce concepts{'\n'}
              📊 Use presentations for visual learning{'\n'}
              🎥 Watch video notes for complex topics{'\n'}
              📋 Follow lesson plans for structured learning{'\n'}
              📚 Combine different materials for comprehensive understanding
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default StudyMaterialsScreen;