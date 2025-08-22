import React from 'react';

import { ThemeProvider } from './src/contexts/ThemeContext';
import MainScreen from './src/screen/MainScreen';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <MainScreen />
    </ThemeProvider>
  );
}

export default App;
