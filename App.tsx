import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { ThemeProvider } from './src/contexts/ThemeContext';
import MainScreen from './src/screen/MainScreen';

function App(): React.JSX.Element {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    });

    // const init = async () => {
    //   // await some async task if needed
    //   await new Promise(resolve => setTimeout(resolve, 2000));
    //   await RNBootSplash.hide({ fade: true });
    // };

    // init();
  }, []);

  return (
    <ThemeProvider>
      <MainScreen />
    </ThemeProvider>
  );
}

export default App;
