
import React from 'react';
import { AppNavigator } from './src/Navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return(
  <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
   <AppNavigator />;
   </SafeAreaView>
  )
}

export default App;
