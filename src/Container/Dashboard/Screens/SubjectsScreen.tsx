import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { styles } from '../DashboardStyle';

interface SubjectsProps {
  onClose?: () => void;
}

interface Subject {
  id: string;
  name: string;
  teacher: string;
  icon: string;
  totalChapters: number;
  completedChapters: number;
  syllabus: string[];
  description: string;
}

const SubjectsScreen: React.FC<SubjectsProps> = ({ onClose }) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const subjects: Subject[] = [
    {
      id: 'math',
      name: 'Mathematics',
      teacher: 'Mrs. Smith',
      icon: '🔢',
      totalChapters: 16,
      completedChapters: 8,
      description: 'Learn fundamental mathematical concepts including algebra, geometry, and arithmetic.',
      syllabus: [
        'Number Systems',
        'Polynomials',
        'Coordinate Geometry',
        'Linear Equations',
        'Introduction to Trigonometry',
        'Circles',
        'Areas Related to Circles',
        'Surface Areas and Volumes',
        'Statistics',
        'Probability',
        'Real Numbers',
        'Triangles',
        'Quadratic Equations',
        'Arithmetic Progressions',
        'Light - Reflection and Refraction',
        'Some Applications of Trigonometry'
      ]
    },
    {
      id: 'english',
      name: 'English',
      teacher: 'Mr. Johnson',
      icon: '📖',
      totalChapters: 12,
      completedChapters: 6,
      description: 'Develop language skills through literature, grammar, and creative writing.',
      syllabus: [
        'A Letter to God',
        'Nelson Mandela: Long Walk to Freedom',
        'Two Stories about Flying',
        'From the Diary of Anne Frank',
        'The Hundred Dresses',
        'Glimpses of India',
        'Mijbil the Otter',
        'Madam Rides the Bus',
        'The Sermon at Benares',
        'The Proposal',
        'Grammar and Writing Skills',
        'Poetry Appreciation'
      ]
    },
    {
      id: 'science',
      name: 'Science',
      teacher: 'Dr. Brown',
      icon: '🔬',
      totalChapters: 15,
      completedChapters: 7,
      description: 'Explore physics, chemistry, and biology concepts through experiments and theory.',
      syllabus: [
        'Light - Reflection and Refraction',
        'Human Eye and Colourful World',
        'Electricity',
        'Magnetic Effects of Electric Current',
        'Acids, Bases and Salts',
        'Metals and Non-metals',
        'Carbon and its Compounds',
        'Life Processes',
        'Control and Coordination',
        'How do Organisms Reproduce?',
        'Heredity and Evolution',
        'Our Environment',
        'Management of Natural Resources',
        'Sources of Energy',
        'Periodic Classification of Elements'
      ]
    },
    {
      id: 'history',
      name: 'History',
      teacher: 'Ms. Davis',
      icon: '🏛️',
      totalChapters: 8,
      completedChapters: 4,
      description: 'Study historical events, civilizations, and their impact on modern society.',
      syllabus: [
        'The Rise of Nationalism in Europe',
        'Nationalism in India',
        'The Making of a Global World',
        'The Age of Industrialisation',
        'Print Culture and the Modern World',
        'Resources and Development',
        'Forest and Wildlife Resources',
        'Water Resources'
      ]
    },
    {
      id: 'geography',
      name: 'Geography',
      teacher: 'Mr. Wilson',
      icon: '🌍',
      totalChapters: 7,
      completedChapters: 3,
      description: 'Learn about physical and human geography, including climate, resources, and population.',
      syllabus: [
        'Resources and Development',
        'Forest and Wildlife Resources',
        'Water Resources',
        'Agriculture',
        'Minerals and Energy Resources',
        'Manufacturing Industries',
        'Lifelines of National Economy'
      ]
    },
    {
      id: 'hindi',
      name: 'Hindi',
      teacher: 'Mrs. Sharma',
      icon: '🇮🇳',
      totalChapters: 10,
      completedChapters: 5,
      description: 'Develop proficiency in Hindi language through literature and grammar.',
      syllabus: [
        'सूरदास के पद',
        'राम-लक्ष्मण-परशुराम संवाद',
        'सवैया और कवित्त',
        'आत्मकथ्य',
        'उत्साह और अट नहीं रही है',
        'यह दंतुरित मुस्कान',
        'फसल',
        'छाया मत छूना',
        'कन्यादान',
        'संस्कृति'
      ]
    }
  ];

  const renderSubjectCard = (subject: Subject) => {
    const progress = (subject.completedChapters / subject.totalChapters) * 100;
    
    return (
      <TouchableOpacity
        key={subject.id}
        style={styles.listItem}
        onPress={() => setSelectedSubject(subject)}
      >
        <Text style={styles.listItemIcon}>{subject.icon}</Text>
        <View style={styles.listItemContent}>
          <Text style={styles.listItemTitle}>{subject.name}</Text>
          <Text style={styles.listItemSubtitle}>
            Teacher: {subject.teacher} • Progress: {Math.round(progress)}%
          </Text>
          <View style={{ marginTop: 5, backgroundColor: '#e9ecef', height: 4, borderRadius: 2 }}>
            <View 
              style={{ 
                backgroundColor: '#4A90E2', 
                height: 4, 
                borderRadius: 2,
                width: `${progress}%` 
              }} 
            />
          </View>
        </View>
        <View style={styles.listItemAction}>
          <Text style={styles.listItemActionText}>View</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSyllabusDetail = () => {
    if (!selectedSubject) return null;

    return (
      <ScrollView style={styles.screenContent}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setSelectedSubject(null)}
        >
          <Text style={styles.secondaryButtonText}>← Back to Subjects</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 30, marginRight: 10 }}>{selectedSubject.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{selectedSubject.name}</Text>
              <Text style={styles.cardContent}>Teacher: {selectedSubject.teacher}</Text>
            </View>
          </View>
          <Text style={styles.cardContent}>{selectedSubject.description}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Progress Overview</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statNumber}>{selectedSubject.completedChapters}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statNumber}>{selectedSubject.totalChapters - selectedSubject.completedChapters}</Text>
              <Text style={styles.statLabel}>Remaining</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statNumber}>{selectedSubject.totalChapters}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.statNumber}>
                {Math.round((selectedSubject.completedChapters / selectedSubject.totalChapters) * 100)}%
              </Text>
              <Text style={styles.statLabel}>Progress</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📚 Complete Syllabus</Text>
          {selectedSubject.syllabus.map((chapter, index) => (
            <View key={index} style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
              borderBottomWidth: index < selectedSubject.syllabus.length - 1 ? 1 : 0,
              borderBottomColor: '#f1f3f4'
            }}>
              <Text style={{
                fontSize: 16,
                marginRight: 10,
                color: index < selectedSubject.completedChapters ? '#28a745' : '#6c757d'
              }}>
                {index < selectedSubject.completedChapters ? '✅' : '⭕'}
              </Text>
              <Text style={{
                flex: 1,
                fontSize: 14,
                color: index < selectedSubject.completedChapters ? '#28a745' : '#495057',
                fontWeight: index < selectedSubject.completedChapters ? '500' : '400'
              }}>
                {index + 1}. {chapter}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer}>

      {selectedSubject ? (
        renderSyllabusDetail()
      ) : (
        <ScrollView style={styles.screenContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📖 Your Subjects</Text>
            <Text style={styles.cardContent}>
              Click on any subject to view detailed syllabus and track your progress.
            </Text>
          </View>

          {subjects.map(renderSubjectCard)}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>💡 Study Tips</Text>
            <Text style={styles.cardContent}>
              • Create a study schedule for each subject{'\n'}
              • Review completed chapters regularly{'\n'}
              • Ask teachers for help with difficult topics{'\n'}
              • Practice with sample papers and exercises{'\n'}
              • Join study groups for better understanding
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default SubjectsScreen;