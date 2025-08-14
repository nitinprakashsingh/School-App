export type RootStackParamList = {
  Login: undefined;
  OTPVerification: {
    studentId: string;
    loginMethod: 'studentId' | 'email';
    phoneNumber?: string;
  };
  MainTabs: undefined;
  EBooks: undefined;
  StudyMaterials: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
};

export type BottomTabParamList = {
  Dashboard: undefined;
  Timetable: undefined;
  Subjects: undefined;
  Library: undefined;
  Homework: undefined;
};