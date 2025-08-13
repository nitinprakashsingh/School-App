import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { styles } from '../DashboardStyle';

interface HomeworkProps {
  onClose?: () => void;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
  submissionDate?: string;
  attachments?: string[];
}

const HomeworkScreen: React.FC<HomeworkProps> = ({ onClose }) => {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionText, setSubmissionText] = useState('');

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Quadratic Equations Practice',
      subject: 'Mathematics',
      description: 'Solve the given quadratic equations using different methods. Show all working steps.',
      dueDate: '2024-01-15',
      status: 'pending',
    },
    {
      id: '2',
      title: 'English Essay: My Future Goals',
      subject: 'English',
      description: 'Write a 300-word essay about your future goals and how you plan to achieve them.',
      dueDate: '2024-01-12',
      status: 'pending',
    },
    {
      id: '3',
      title: 'Science Lab Report',
      subject: 'Science',
      description: 'Complete the lab report on the photosynthesis experiment conducted in class.',
      dueDate: '2024-01-18',
      status: 'pending',
    },
    {
      id: '4',
      title: 'History Timeline Project',
      subject: 'History',
      description: 'Create a timeline of major events during the Indian Independence Movement.',
      dueDate: '2024-01-08',
      status: 'submitted',
      submissionDate: '2024-01-07',
    },
    {
      id: '5',
      title: 'Geography Map Work',
      subject: 'Geography',
      description: 'Mark all major rivers and mountain ranges of India on the provided map.',
      dueDate: '2024-01-05',
      status: 'graded',
      submissionDate: '2024-01-04',
      grade: 'A-',
    },
    {
      id: '6',
      title: 'Hindi Poetry Analysis',
      subject: 'Hindi',
      description: 'Analyze the given poem and write about its themes and literary devices.',
      dueDate: '2024-01-10',
      status: 'graded',
      submissionDate: '2024-01-09',
      grade: 'B+',
    },
  ];

  const filteredAssignments = assignments.filter(assignment => assignment.status === selectedTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'submitted': return '#17a2b8';
      case 'graded': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏰';
      case 'submitted': return '📤';
      case 'graded': return '✅';
      default: return '📝';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmitAssignment = () => {
    if (!submissionText.trim()) {
      Alert.alert('Error', 'Please enter your submission text.');
      return;
    }
    
    Alert.alert(
      'Submit Assignment',
      'Are you sure you want to submit this assignment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit',
          onPress: () => {
            Alert.alert('Success', 'Assignment submitted successfully!');
            setSelectedAssignment(null);
            setSubmissionText('');
          }
        }
      ]
    );
  };

  const renderTabButton = (tab: string, label: string, count: number) => (
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
        {label} ({count})
      </Text>
    </TouchableOpacity>
  );

  const renderAssignment = (assignment: Assignment) => {
    const daysUntilDue = getDaysUntilDue(assignment.dueDate);
    const isOverdue = daysUntilDue < 0 && assignment.status === 'pending';

    return (
      <TouchableOpacity
        key={assignment.id}
        style={[
          styles.listItem,
          isOverdue && { borderLeftWidth: 4, borderLeftColor: '#dc3545' }
        ]}
        onPress={() => setSelectedAssignment(assignment)}
      >
        <Text style={styles.listItemIcon}>{getStatusIcon(assignment.status)}</Text>
        <View style={styles.listItemContent}>
          <Text style={styles.listItemTitle}>{assignment.title}</Text>
          <Text style={styles.listItemSubtitle}>
            {assignment.subject} • Due: {new Date(assignment.dueDate).toLocaleDateString()}
          </Text>
          {assignment.status === 'pending' && (
            <Text style={[
              styles.cardContent,
              { 
                fontSize: 12, 
                marginTop: 4,
                color: isOverdue ? '#dc3545' : daysUntilDue <= 2 ? '#ffc107' : '#6c757d'
              }
            ]}>
              {isOverdue 
                ? `Overdue by ${Math.abs(daysUntilDue)} day(s)`
                : daysUntilDue === 0 
                ? 'Due Today!'
                : `${daysUntilDue} day(s) remaining`
              }
            </Text>
          )}
          {assignment.status === 'graded' && assignment.grade && (
            <Text style={[styles.cardContent, { fontSize: 12, marginTop: 4, color: '#28a745' }]}>
              Grade: {assignment.grade}
            </Text>
          )}
        </View>
        <View style={[styles.listItemAction, { backgroundColor: getStatusColor(assignment.status) }]}>
          <Text style={styles.listItemActionText}>
            {assignment.status === 'pending' ? 'Submit' : 'View'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAssignmentDetail = () => {
    if (!selectedAssignment) return null;

    return (
      <ScrollView style={styles.screenContent}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setSelectedAssignment(null)}
        >
          <Text style={styles.secondaryButtonText}>← Back to Assignments</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 24, marginRight: 10 }}>{getStatusIcon(selectedAssignment.status)}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{selectedAssignment.title}</Text>
              <Text style={styles.cardContent}>Subject: {selectedAssignment.subject}</Text>
            </View>
            <View style={[
              { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
              { backgroundColor: getStatusColor(selectedAssignment.status) }
            ]}>
              <Text style={{ color: 'white', fontSize: 12, fontWeight: '600', textTransform: 'uppercase' }}>
                {selectedAssignment.status}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📋 Assignment Details</Text>
          <Text style={styles.cardContent}>{selectedAssignment.description}</Text>
          <View style={{ marginTop: 15 }}>
            <Text style={[styles.cardContent, { fontWeight: '600' }]}>
              Due Date: {new Date(selectedAssignment.dueDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
            {selectedAssignment.submissionDate && (
              <Text style={[styles.cardContent, { color: '#28a745', marginTop: 5 }]}>
                Submitted: {new Date(selectedAssignment.submissionDate).toLocaleDateString()}
              </Text>
            )}
            {selectedAssignment.grade && (
              <Text style={[styles.cardContent, { color: '#28a745', marginTop: 5, fontWeight: '600' }]}>
                Grade: {selectedAssignment.grade}
              </Text>
            )}
          </View>
        </View>

        {selectedAssignment.status === 'pending' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>✍️ Submit Assignment</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#e9ecef',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                marginTop: 10,
                minHeight: 120,
                textAlignVertical: 'top',
                fontSize: 16
              }}
              placeholder="Type your assignment submission here..."
              value={submissionText}
              onChangeText={setSubmissionText}
              multiline
              numberOfLines={6}
            />
            
            <TouchableOpacity style={styles.primaryButton} onPress={handleSubmitAssignment}>
              <Text style={styles.primaryButtonText}>📤 Submit Assignment</Text>
            </TouchableOpacity>
            
            <Text style={[styles.cardContent, { marginTop: 10, fontSize: 12, fontStyle: 'italic' }]}>
              Note: Once submitted, you cannot edit your assignment. Make sure to review before submitting.
            </Text>
          </View>
        )}

        {selectedAssignment.attachments && selectedAssignment.attachments.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📎 Attachments</Text>
            {selectedAssignment.attachments.map((attachment, index) => (
              <TouchableOpacity key={index} style={styles.listItem}>
                <Text style={styles.listItemIcon}>📄</Text>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>{attachment}</Text>
                </View>
                <View style={styles.listItemAction}>
                  <Text style={styles.listItemActionText}>Open</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer}>

      {selectedAssignment ? (
        renderAssignmentDetail()
      ) : (
        <ScrollView style={styles.screenContent}>
          {/* Stats Overview */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📊 Assignment Overview</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: '#ffc107' }]}>
                  {assignments.filter(a => a.status === 'pending').length}
                </Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: '#17a2b8' }]}>
                  {assignments.filter(a => a.status === 'submitted').length}
                </Text>
                <Text style={styles.statLabel}>Submitted</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: '#28a745' }]}>
                  {assignments.filter(a => a.status === 'graded').length}
                </Text>
                <Text style={styles.statLabel}>Graded</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{assignments.length}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
            </View>
          </View>

          {/* Tab Navigation */}
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            {renderTabButton('pending', 'Pending', assignments.filter(a => a.status === 'pending').length)}
            {renderTabButton('submitted', 'Submitted', assignments.filter(a => a.status === 'submitted').length)}
            {renderTabButton('graded', 'Graded', assignments.filter(a => a.status === 'graded').length)}
          </View>

          {/* Assignment List */}
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map(renderAssignment)
          ) : (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>🎉 No {selectedTab} assignments</Text>
              <Text style={styles.cardContent}>
                {selectedTab === 'pending' 
                  ? 'Great job! You have no pending assignments.'
                  : `You have no ${selectedTab} assignments to show.`
                }
              </Text>
            </View>
          )}

          {/* Study Tips */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>💡 Assignment Tips</Text>
            <Text style={styles.cardContent}>
              📅 Plan ahead: Start assignments early{'\n'}
              📝 Read instructions carefully{'\n'}
              🔍 Research thoroughly before writing{'\n'}
              ✅ Review your work before submitting{'\n'}
              ⏰ Submit before the deadline{'\n'}
              📚 Ask teachers for help if needed
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HomeworkScreen;