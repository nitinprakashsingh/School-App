# Navigation Components

This directory contains navigation-related components for the School App.

## Components

### 🍔 CustomDrawer
A custom drawer component that displays student profile information and navigation options.

**Features:**
- **Student Profile Section**: Photo, name, roll number, class, email
- **Quick Stats**: Achievements count, attendance percentage, fees paid
- **Navigation Items**: Main app navigation
- **Additional Menu**: Contact teacher, admin, calendar, settings, help
- **Logout Button**: Secure logout functionality

**Student Information Displayed:**
```
Name: Rahul Kumar
Roll No: STU001
Class: Class 10-A
Email: rahul.kumar@school.edu
```

**Quick Stats:**
- **6 Achievements** - Total achievements this year
- **85% Attendance** - Current attendance percentage
- **3/5 Fees Paid** - Fee payment status

## Navigation Structure

### Drawer Navigation Flow
```
Login → OTP → Dashboard (with Drawer)
                ↓
            [☰ Hamburger Menu]
                ↓
            Custom Drawer
                ↓
        - Student Profile
        - Quick Stats
        - Navigation Items
        - Additional Menu
        - Logout
```

### Drawer Features

#### 📱 Profile Section
- **Profile Image**: Professional student photo with border
- **Student Details**: Name, roll number, class, email
- **Visual Design**: Clean card layout with proper spacing

#### 📊 Quick Stats Section
- **Achievements**: Total count of student achievements
- **Attendance**: Current attendance percentage
- **Fees**: Payment status (paid/total months)

#### 🧭 Navigation Items
- **Dashboard**: Main app hub
- **Timetable**: Class schedule
- **Subjects**: Subject information
- **Library**: Digital resources
- **Homework**: Assignments

#### 🔗 Additional Menu
- **👨‍🏫 Contact Teacher**: Direct teacher communication
- **📞 Contact Admin**: Administrative support
- **📋 Academic Calendar**: School calendar access
- **⚙️ Settings**: App configuration
- **❓ Help & Support**: User assistance

#### 🚪 Logout Section
- **Logout Button**: Secure session termination
- **Visual Design**: Red button with logout icon

## Implementation

### Drawer Navigator
```tsx
// DrawerNavigator.tsx
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../Component/Navigation/CustomDrawer';

const Drawer = createDrawerNavigator();

<Drawer.Navigator
  drawerContent={(props) => <CustomDrawer props={props} />}
  screenOptions={{
    headerShown: false,
    drawerStyle: { width: 280 },
    drawerActiveBackgroundColor: '#4A90E2',
    drawerActiveTintColor: '#ffffff',
  }}
>
  <Drawer.Screen name="MainTabs" component={BottomTabNavigator} />
</Drawer.Navigator>
```

### Custom Drawer Component
```tsx
// CustomDrawer.tsx
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawer: React.FC<CustomDrawerProps> = ({ props }) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={{ uri: studentData.profileImage }} />
          <Text>{studentData.name}</Text>
        </View>
        
        {/* Quick Stats */}
        <View style={styles.statsSection}>
          {/* Stats items */}
        </View>
        
        {/* Navigation Items */}
        <DrawerItemList {...props} />
        
        {/* Additional Menu */}
        <View style={styles.additionalMenu}>
          {/* Menu items */}
        </View>
      </DrawerContentScrollView>
      
      {/* Logout Section */}
      <View style={styles.logoutSection}>
        <TouchableOpacity onPress={handleLogout}>
          <Text>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
```

## Styling

### Color Scheme
- **Primary Blue**: #4A90E2 (Active drawer items)
- **Text Primary**: #2c3e50 (Main text)
- **Text Secondary**: #6c757d (Secondary text)
- **Background**: #f8f9fa (Drawer background)
- **White**: #ffffff (Cards and sections)
- **Red**: #dc3545 (Logout button)

### Layout
- **Drawer Width**: 280px
- **Profile Image**: 80x80px with border
- **Section Spacing**: 10px between sections
- **Padding**: 20px for main sections, 15px for stats

## Features

### 🎨 Design System
- **Card-based Layout**: Clean sections with shadows
- **Consistent Spacing**: Proper margins and padding
- **Color-coded Elements**: Visual hierarchy with colors
- **Responsive Design**: Adapts to different screen sizes

### 🔧 Functionality
- **Profile Display**: Student information with photo
- **Quick Stats**: Real-time data display
- **Navigation Integration**: Seamless drawer navigation
- **Logout Handling**: Secure session management

### 📱 User Experience
- **Smooth Animations**: Drawer open/close transitions
- **Touch-friendly**: Proper touch targets
- **Visual Feedback**: Active state indicators
- **Accessibility**: Screen reader support

## Usage

### Opening the Drawer
```tsx
// From any screen
const navigation = useNavigation();
navigation.openDrawer();

// Hamburger button in header
<TouchableOpacity onPress={() => navigation.openDrawer()}>
  <Text>☰</Text>
</TouchableOpacity>
```

### Customizing Drawer Content
```tsx
// Add custom menu items
<TouchableOpacity style={styles.menuItem}>
  <Text style={styles.menuIcon}>📞</Text>
  <Text style={styles.menuText}>Contact Admin</Text>
</TouchableOpacity>
```

### Handling Logout
```tsx
const handleLogout = () => {
  // Clear user session
  // Navigate to login
  navigation.navigate('Login');
};
```

## Integration

### App Navigator Integration
```tsx
// AppNavigator.tsx
<Stack.Screen
  name="MainTabs"
  component={DrawerNavigator}  // Uses drawer instead of direct tabs
  options={{ headerShown: false }}
/>
```

### Bottom Tab Integration
```tsx
// BottomTabNavigator.tsx
headerLeft: () => <HamburgerButton />,  // Adds hamburger menu
```

## Future Enhancements

### 🔄 Planned Features
- **Profile Editing**: Direct profile updates from drawer
- **Notifications**: Badge indicators for new items
- **Theme Switching**: Dark/light mode toggle
- **Language Selection**: Multi-language support
- **Quick Actions**: Shortcut buttons for common tasks

### 🔌 API Integration
- **Real-time Stats**: Live data updates
- **Profile Sync**: Automatic profile updates
- **Notification Center**: Push notification handling
- **Analytics**: Usage tracking and insights

## Development Notes

### 🧪 Testing
- **Component Testing**: Unit tests for drawer functionality
- **Navigation Testing**: Integration tests for drawer navigation
- **UI Testing**: Visual regression testing
- **Accessibility Testing**: Screen reader compatibility

### 📱 Platform Support
- **iOS**: Native drawer behavior
- **Android**: Material Design drawer
- **Gesture Support**: Swipe to open/close
- **Performance**: Optimized rendering

### 🔧 Maintenance
- **Modular Architecture**: Reusable components
- **Type Safety**: TypeScript interfaces
- **Style Management**: Centralized styling
- **Error Handling**: Graceful error states 