import React, { useEffect } from 'react';
import RNBootSplash from "react-native-bootsplash";
import { ThemeProvider } from './src/contexts/ThemeContext';
import MainScreen from './src/screen/MainScreen';

function App(): React.JSX.Element {
    useEffect(() => {
    const init = async () => {
      // Do any async tasks here
      await RNBootSplash.hide({ fade: true });
    };

    init();
  }, []);

  return (
    <ThemeProvider>
      <MainScreen />
    </ThemeProvider>
  );
}

export default App;
