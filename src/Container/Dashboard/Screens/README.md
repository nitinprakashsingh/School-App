# Dashboard Screens

This directory contains all the main screens for the School App dashboard.

## Screens Overview

### 🏠 Dashboard (Main Hub)
- **File**: `Dashboard.tsx`
- **Purpose**: Central hub with feature cards for navigation
- **Features**: Quick stats, feature cards, overview information

### 📅 TimetableScreen
- **File**: `TimetableScreen.tsx`
- **Purpose**: Weekly class schedule management
- **Features**: Day selector, period details, teacher and room information

### 📚 SubjectsScreen
- **File**: `SubjectsScreen.tsx`
- **Purpose**: Subject information and syllabus tracking
- **Features**: Subject progress, curriculum details, teacher information

### 🏛️ LibraryScreen
- **File**: `LibraryScreen.tsx`
- **Purpose**: Digital learning resources access
- **Features**: Resource categories, search functionality, downloads

### ✍️ HomeworkScreen
- **File**: `HomeworkScreen.tsx`
- **Purpose**: Assignment management and submission
- **Features**: Assignment tracking, submission interface, grading

### 📖 EBooksScreen
- **File**: `EBooksScreen.tsx`
- **Purpose**: Digital textbook access
- **Features**: PDF viewer, book categories, search

### 📝 StudyMaterialsScreen
- **File**: `StudyMaterialsScreen.tsx`
- **Purpose**: Lesson plans and study notes
- **Features**: Material organization, downloads, categories

### 👤 ProfileScreen
- **File**: `ProfileScreen.tsx`
- **Purpose**: Student profile and achievements management
- **Features**: Personal information, achievements, fee status

## Profile Screen Features

### 📋 Overview Tab
- **Student Information**: Name, roll number, class, profile image
- **Quick Stats**: Achievements count, fees paid, attendance percentage
- **Class Teacher**: Contact information and communication options
- **Personal Details**: Email, phone, date of birth, blood group, parent info

### 🏆 Achievements Tab
- **Achievement Categories**: Academic, Sports, Arts, Leadership
- **Achievement Details**: Title, description, date, category badges
- **Visual Indicators**: Color-coded categories with icons
- **Comprehensive List**: All achievements for the academic year

### 💰 Fees Tab
- **Monthly Fee Status**: Paid/Pending status for each month
- **Payment Details**: Amount, due date, paid date
- **Summary**: Total fees, paid amount, pending amount
- **Visual Status**: Color-coded payment status indicators

## Navigation Integration

### Bottom Tab Navigation
The Profile screen is accessible via:
- Bottom tab with 👤 icon
- Dashboard feature card
- Direct navigation from other screens

### Navigation Flow
```
Dashboard → Profile (via tab or card)
Login → OTP → Dashboard → Profile
```

## Data Structure

### Student Data
```typescript
interface StudentData {
  name: string;
  rollNumber: string;
  class: string;
  classTeacher: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  bloodGroup: string;
  parentName: string;
  parentPhone: string;
  profileImage: string;
}
```

### Achievement Data
```typescript
interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  category: 'academic' | 'sports' | 'arts' | 'leadership';
}
```

### Fee Status Data
```typescript
interface FeeStatus {
  month: string;
  amount: number;
  dueDate: string;
  isPaid: boolean;
  paidDate?: string;
}
```

## Styling

All screens use the centralized `DashboardStyle.tsx` file for consistent theming:

- **Primary Color**: #4A90E2 (School blue)
- **Success Color**: #28a745 (Green for paid fees)
- **Warning Color**: #dc3545 (Red for pending fees)
- **Category Colors**: 
  - Academic: #4A90E2
  - Sports: #7ED321
  - Arts: #F5A623
  - Leadership: #BD10E0

## Features

### 🎨 Design System
- Card-based layout with shadows
- Consistent spacing and typography
- Color-coded status indicators
- Responsive design

### 🔧 Functionality
- Tab-based navigation within Profile screen
- Interactive elements (edit profile, contact teacher)
- Real-time data display
- Achievement categorization

### 📱 User Experience
- Smooth navigation between tabs
- Clear visual hierarchy
- Intuitive information organization
- Accessibility compliance

## Usage Examples

### Accessing Profile
```tsx
// From Dashboard
navigation.navigate('Profile');

// From bottom tab
// Automatically handled by tab navigator
```

### Viewing Achievements
```tsx
// Switch to achievements tab
setSelectedTab('achievements');

// Filter by category
const academicAchievements = achievements.filter(
  achievement => achievement.category === 'academic'
);
```

### Checking Fee Status
```tsx
// Get pending fees
const pendingFees = feeStatus.filter(fee => !fee.isPaid);

// Calculate total pending amount
const totalPending = pendingFees.reduce((sum, fee) => sum + fee.amount, 0);
```

## Future Enhancements

### 🔄 Planned Features
- Profile editing functionality
- Achievement sharing
- Fee payment integration
- Photo upload capability
- Academic progress tracking
- Parent communication portal

### 🔌 API Integration
- Real-time data synchronization
- Achievement updates
- Fee payment processing
- Profile image management
- Attendance tracking

## Development Notes

### 🧪 Testing
- Unit tests for data calculations
- Integration tests for navigation
- UI component testing
- Accessibility testing

### 📱 Platform Support
- iOS and Android compatibility
- Responsive design
- Touch-friendly interface
- Performance optimization

### 🔧 Maintenance
- Modular component architecture
- Centralized styling system
- TypeScript for type safety
- Comprehensive error handling 