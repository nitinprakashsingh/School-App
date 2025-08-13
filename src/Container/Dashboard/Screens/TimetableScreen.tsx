import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { styles } from '../DashboardStyle';

interface TimetableProps {
  onClose?: () => void;
}

interface ClassPeriod {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

interface DaySchedule {
  [key: string]: ClassPeriod[];
}

const TimetableScreen: React.FC<TimetableProps> = ({ onClose }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const timetableData: DaySchedule = {
    Monday: [
      { time: '08:00 - 08:45', subject: 'Mathematics', teacher: 'Mrs. Smith', room: 'Room 101' },
      { time: '08:45 - 09:30', subject: 'English', teacher: 'Mr. Johnson', room: 'Room 102' },
      { time: '09:30 - 09:45', subject: 'Break', teacher: '', room: '' },
      { time: '09:45 - 10:30', subject: 'Science', teacher: 'Dr. Brown', room: 'Lab 1' },
      { time: '10:30 - 11:15', subject: 'History', teacher: 'Ms. Davis', room: 'Room 103' },
      { time: '11:15 - 12:00', subject: 'Geography', teacher: 'Mr. Wilson', room: 'Room 104' },
      { time: '12:00 - 12:45', subject: 'Lunch Break', teacher: '', room: '' },
      { time: '12:45 - 01:30', subject: 'Hindi', teacher: 'Mrs. Sharma', room: 'Room 105' },
      { time: '01:30 - 02:15', subject: 'Physical Education', teacher: 'Coach Miller', room: 'Playground' },
    ],
    Tuesday: [
      { time: '08:00 - 08:45', subject: 'Science', teacher: 'Dr. Brown', room: 'Lab 1' },
      { time: '08:45 - 09:30', subject: 'Mathematics', teacher: 'Mrs. Smith', room: 'Room 101' },
      { time: '09:30 - 09:45', subject: 'Break', teacher: '', room: '' },
      { time: '09:45 - 10:30', subject: 'English', teacher: 'Mr. Johnson', room: 'Room 102' },
      { time: '10:30 - 11:15', subject: 'Computer Science', teacher: 'Mr. Tech', room: 'Computer Lab' },
      { time: '11:15 - 12:00', subject: 'Art & Craft', teacher: 'Ms. Creative', room: 'Art Room' },
      { time: '12:00 - 12:45', subject: 'Lunch Break', teacher: '', room: '' },
      { time: '12:45 - 01:30', subject: 'Social Studies', teacher: 'Mr. Social', room: 'Room 106' },
      { time: '01:30 - 02:15', subject: 'Music', teacher: 'Mrs. Melody', room: 'Music Room' },
    ],
    Wednesday: [
      { time: '08:00 - 08:45', subject: 'English', teacher: 'Mr. Johnson', room: 'Room 102' },
      { time: '08:45 - 09:30', subject: 'Mathematics', teacher: 'Mrs. Smith', room: 'Room 101' },
      { time: '09:30 - 09:45', subject: 'Break', teacher: '', room: '' },
      { time: '09:45 - 10:30', subject: 'Hindi', teacher: 'Mrs. Sharma', room: 'Room 105' },
      { time: '10:30 - 11:15', subject: 'Science', teacher: 'Dr. Brown', room: 'Lab 1' },
      { time: '11:15 - 12:00', subject: 'Geography', teacher: 'Mr. Wilson', room: 'Room 104' },
      { time: '12:00 - 12:45', subject: 'Lunch Break', teacher: '', room: '' },
      { time: '12:45 - 01:30', subject: 'History', teacher: 'Ms. Davis', room: 'Room 103' },
      { time: '01:30 - 02:15', subject: 'Library Period', teacher: 'Ms. Librarian', room: 'Library' },
    ],
    Thursday: [
      { time: '08:00 - 08:45', subject: 'Mathematics', teacher: 'Mrs. Smith', room: 'Room 101' },
      { time: '08:45 - 09:30', subject: 'Science', teacher: 'Dr. Brown', room: 'Lab 1' },
      { time: '09:30 - 09:45', subject: 'Break', teacher: '', room: '' },
      { time: '09:45 - 10:30', subject: 'Computer Science', teacher: 'Mr. Tech', room: 'Computer Lab' },
      { time: '10:30 - 11:15', subject: 'English', teacher: 'Mr. Johnson', room: 'Room 102' },
      { time: '11:15 - 12:00', subject: 'Physical Education', teacher: 'Coach Miller', room: 'Playground' },
      { time: '12:00 - 12:45', subject: 'Lunch Break', teacher: '', room: '' },
      { time: '12:45 - 01:30', subject: 'Social Studies', teacher: 'Mr. Social', room: 'Room 106' },
      { time: '01:30 - 02:15', subject: 'Art & Craft', teacher: 'Ms. Creative', room: 'Art Room' },
    ],
    Friday: [
      { time: '08:00 - 08:45', subject: 'Hindi', teacher: 'Mrs. Sharma', room: 'Room 105' },
      { time: '08:45 - 09:30', subject: 'Mathematics', teacher: 'Mrs. Smith', room: 'Room 101' },
      { time: '09:30 - 09:45', subject: 'Break', teacher: '', room: '' },
      { time: '09:45 - 10:30', subject: 'English', teacher: 'Mr. Johnson', room: 'Room 102' },
      { time: '10:30 - 11:15', subject: 'Science', teacher: 'Dr. Brown', room: 'Lab 1' },
      { time: '11:15 - 12:00', subject: 'History', teacher: 'Ms. Davis', room: 'Room 103' },
      { time: '12:00 - 12:45', subject: 'Lunch Break', teacher: '', room: '' },
      { time: '12:45 - 01:30', subject: 'Geography', teacher: 'Mr. Wilson', room: 'Room 104' },
      { time: '01:30 - 02:15', subject: 'Music', teacher: 'Mrs. Melody', room: 'Music Room' },
    ],
    Saturday: [
      { time: '08:00 - 08:45', subject: 'Mathematics', teacher: 'Mrs. Smith', room: 'Room 101' },
      { time: '08:45 - 09:30', subject: 'Science', teacher: 'Dr. Brown', room: 'Lab 1' },
      { time: '09:30 - 09:45', subject: 'Break', teacher: '', room: '' },
      { time: '09:45 - 10:30', subject: 'English', teacher: 'Mr. Johnson', room: 'Room 102' },
      { time: '10:30 - 11:15', subject: 'Sports Activity', teacher: 'Coach Miller', room: 'Playground' },
      { time: '11:15 - 12:00', subject: 'Extra Curricular', teacher: 'Various', room: 'Various' },
    ],
  };

  const renderTimeSlot = (period: ClassPeriod, index: number) => {
    const isBreak = period.subject.toLowerCase().includes('break');
    
    return (
      <View key={index} style={[styles.tableRow, isBreak && { backgroundColor: '#f8f9fa' }]}>
        <View style={[styles.tableCell, { flex: 0.8 }]}>
          <Text style={styles.tableCellText}>{period.time}</Text>
        </View>
        <View style={[styles.tableCell, { flex: 1.2 }]}>
          <Text style={[styles.tableCellText, { fontWeight: isBreak ? '400' : '600' }]}>
            {period.subject}
          </Text>
        </View>
        <View style={styles.tableCell}>
          <Text style={styles.tableCellText}>{period.teacher}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text style={styles.tableCellText}>{period.room}</Text>
        </View>
      </View>
    );
  };

  const renderDayTab = (day: string) => (
    <TouchableOpacity
      key={day}
      style={[
        styles.secondaryButton,
        { 
          marginRight: 10,
          backgroundColor: selectedDay === day ? '#4A90E2' : '#e9ecef',
          marginTop: 0,
        }
      ]}
      onPress={() => setSelectedDay(day)}
    >
      <Text style={[
        styles.secondaryButtonText,
        { color: selectedDay === day ? '#ffffff' : '#495057' }
      ]}>
        {day.substring(0, 3)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView style={styles.screenContent}>
        {/* Day Selection */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.cardTitle}>Select Day</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
            {weekDays.map(renderDayTab)}
          </ScrollView>
        </View>

        {/* Current Day Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📚 {selectedDay} Schedule</Text>
          <Text style={styles.cardContent}>
            Total Classes: {timetableData[selectedDay]?.filter(p => !p.subject.toLowerCase().includes('break')).length || 0}
          </Text>
        </View>

        {/* Timetable */}
        <View style={styles.table}>
          {/* Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={[styles.tableCell, { flex: 0.8 }]}>
              <Text style={styles.tableHeaderText}>Time</Text>
            </View>
            <View style={[styles.tableCell, { flex: 1.2 }]}>
              <Text style={styles.tableHeaderText}>Subject</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.tableHeaderText}>Teacher</Text>
            </View>
            <View style={styles.tableCell}>
              <Text style={styles.tableHeaderText}>Room</Text>
            </View>
          </View>
          
          {/* Schedule */}
          {timetableData[selectedDay]?.map(renderTimeSlot)}
        </View>

        {/* Quick Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>ℹ️ Quick Info</Text>
          <Text style={styles.cardContent}>
            • School starts at 8:00 AM{'\n'}
            • Each period is 45 minutes{'\n'}
            • Break time: 9:30 - 9:45 AM{'\n'}
            • Lunch break: 12:00 - 12:45 PM{'\n'}
            • School ends at 2:15 PM
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TimetableScreen;