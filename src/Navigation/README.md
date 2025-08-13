# Navigation Structure

This folder contains the navigation configuration for the Student Dashboard application.

## Structure

```
src/Navigation/
├── AppNavigator.tsx      # Main stack navigator
├── BottomTabNavigator.tsx # Bottom tab navigator
├── types.ts              # TypeScript navigation types
├── index.ts              # Export barrel
└── README.md             # This file
```

## Navigation Flow

### Main Navigation (Stack)
- **MainTabs**: Bottom tab navigator (default screen)
- **EBooks**: eBooks & PDFs screen (modal presentation)
- **StudyMaterials**: Study Materials screen (modal presentation)

### Bottom Tab Navigation
- **Dashboard**: Main dashboard with feature cards
- **Timetable**: Class timetable with weekly schedule
- **Subjects**: Subjects & syllabus with progress tracking
- **Library**: Digital library with learning resources
- **Homework**: Homework & assignments management

## Features

### Bottom Tab Navigator
- 5 main tabs with emoji icons
- Active/inactive color states
- Custom tab bar styling
- Consistent header styling

### Stack Navigator
- Modal presentation for additional screens
- Back navigation support
- Custom header styling
- Gesture handling support

## Usage

The navigation is automatically set up in `App.tsx`. Users can:

1. **Navigate between main features** using the bottom tabs
2. **Access additional screens** from the Dashboard feature cards
3. **Navigate back** using the native back button or gestures
4. **Access modal screens** for eBooks and Study Materials

## Dependencies

- `@react-navigation/native`
- `@react-navigation/bottom-tabs`
- `@react-navigation/stack`
- `react-native-screens`
- `react-native-safe-area-context`
- `react-native-gesture-handler`