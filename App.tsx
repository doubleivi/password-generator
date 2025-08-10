import React, { useEffect, useState } from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  // TextInput,
  TouchableOpacity,
  View,
  Appearance,
} from 'react-native';

// Form Validation
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Slider from '@react-native-community/slider';
import DeviceInfo from 'react-native-device-info';
import Clipboard from '@react-native-clipboard/clipboard';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 6 characters')
    .max(16, 'should be max of 16 characters')
    .required('Length is required'),
});

function App(): React.JSX.Element {
  const colorScheme = Appearance.getColorScheme();

  const [password, setPassword] = useState('');
  const [version, setVersion] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [passLength, setPassLength] = useState<number>(4);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const canGenerate = lowerCase || upperCase || numbers || symbols;
  const textColor = isDarkMode ? '#f8fafc' : '#000000';
  const cardColor = isDarkMode ? '#1e293b' : '#ffffff';

  const theme = {
    background: isDarkMode ? '#0f172a' : '#ffffff',
    card: isDarkMode ? '#1e293b' : '#ffffff',
    text: isDarkMode ? '#f8fafc' : '#000000',
    subtext: isDarkMode ? '#cbd5e1' : '#6b7280',
    gray: isDarkMode ? '#334155' : '#e5e7eb',
    sliderTrack: isDarkMode ? '#38bdf8' : '#000000',
    secondaryText: isDarkMode ? '#94a3b8' : '#000000',
    sliderTrackMin: isDarkMode ? '#38bdf8' : '#000000',
    sliderTrackMax: isDarkMode ? '#475569' : '#d1d5db',
    sliderThumb: isDarkMode ? '#f8fafc' : '#000000',
    checkboxFill: isDarkMode ? '#38bdf8' : '#000000',
    checkboxBorder: isDarkMode ? '#cbd5e1' : '#000000',
  };

  const getStyles = (theme: any) => {
    return StyleSheet.create({
      appContainer: {
        flex: 1,
        backgroundColor: theme.background,
        paddingHorizontal: 20,
        paddingTop: 40,
      },
      content: {
        flex: 1,
        justifyContent: 'flex-start',
      },
      formContainer: {
        backgroundColor: theme.card,
        borderRadius: 12,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
        marginBottom: 30,
      },
      title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: theme.text,
        textAlign: 'center',
        marginBottom: 20,
      },
      heading: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.text,
      },
      inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      },
      formActions: {
        marginTop: 20,
      },
      primaryBtn: {
        backgroundColor: theme.text,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 12,
      },
      primaryBtnTxt: {
        color: theme.background,
        fontSize: 16,
        fontWeight: '600',
      },
      secondaryBtn: {
        backgroundColor: theme.gray,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
      },
      secondaryBtnTxt: {
        color: theme.secondaryText,
        fontSize: 16,
        fontWeight: '600',
      },
      card: {
        backgroundColor: theme.card,
        padding: 20,
        marginTop: 10,
        borderRadius: 12,
      },
      cardElevated: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      description: {
        fontSize: 14,
        color: theme.subtext,
        textAlign: 'center',
        marginBottom: 10,
      },
      generatedPassword: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.text,
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      },
      footer: {
        alignItems: 'center',
        paddingVertical: 16,
      },
      versionText: {
        fontSize: 12,
        color: theme.subtext,
      },
      sliderWrapper: {
        backgroundColor: isDarkMode ? '#1e293b' : '#f3f4f6',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginTop: 10,
        marginBottom: 20,
      },
      slider: {
        width: '100%',
        height: 40,
      },
      lengthValue: {
        color: theme.text,
        fontWeight: '700',
      },
      checkboxRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 12,
      },
      checkbox: {
        marginRight: 10,
      },
    });
  };

  const styles = getStyles(theme);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += digitChars;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
      // console.log('result:: ', result);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
    setPassLength(4);
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    // Get the app version
    const appVersion = DeviceInfo.getVersion();
    setVersion(appVersion);
  }, []);

  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
        <TouchableOpacity
          onPress={() => setIsDarkMode(!isDarkMode)}
          style={{
            backgroundColor: cardColor,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: textColor }}>
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={() => {}}
          >
            {({ handleReset }) => (
              <>
                <View style={styles.sliderWrapper}>
                  <Text style={styles.heading}>
                    Password Length:{' '}
                    <Text style={styles.lengthValue}>{passLength}</Text>
                  </Text>
                  <Slider
                    style={styles.slider}
                    step={1}
                    value={passLength}
                    onValueChange={value => setPassLength(value)}
                    minimumValue={4}
                    maximumValue={16}
                    minimumTrackTintColor={theme.sliderTrackMin}
                    maximumTrackTintColor={theme.sliderTrackMax}
                    thumbTintColor={theme.sliderThumb}
                  />
                </View>
                <View style={styles.checkboxRow}>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor={theme.checkboxFill}
                    iconStyle={{ borderColor: theme.checkboxBorder }}
                    size={24}
                    innerIconStyle={{ borderWidth: 2 }}
                    style={styles.checkbox}
                  />
                  <Text
                    style={[styles.heading, { color: theme.text }]}
                    onPress={() => setLowerCase(!lowerCase)}
                  >
                    Include lowercase
                  </Text>
                </View>
                <View style={styles.checkboxRow}>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor={theme.checkboxFill}
                    iconStyle={{ borderColor: theme.checkboxBorder }}
                    size={24}
                    innerIconStyle={{ borderWidth: 2 }}
                    style={styles.checkbox}
                  />
                  <Text
                    style={[styles.heading, { color: theme.text }]}
                    onPress={() => setUpperCase(!upperCase)}
                  >
                    Include Uppercase letters
                  </Text>
                </View>
                <View style={styles.checkboxRow}>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor={theme.checkboxFill}
                    iconStyle={{ borderColor: theme.checkboxBorder }}
                    size={24}
                    innerIconStyle={{ borderWidth: 2 }}
                    style={styles.checkbox}
                  />
                  <Text
                    style={[styles.heading, { color: theme.text }]}
                    onPress={() => setNumbers(!numbers)}
                  >
                    Include Numbers
                  </Text>
                </View>

                <View style={styles.checkboxRow}>
                  <BouncyCheckbox
                    useBuiltInState={false}
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor={theme.checkboxFill}
                    iconStyle={{ borderColor: theme.checkboxBorder }}
                    size={24}
                    innerIconStyle={{ borderWidth: 2 }}
                    style={styles.checkbox}
                  />
                  <Text
                    style={[styles.heading, { color: theme.text }]}
                    onPress={() => setSymbols(!symbols)}
                  >
                    Include Symbols
                  </Text>
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!canGenerate}
                    style={[
                      styles.primaryBtn,
                      { opacity: !canGenerate ? 0.5 : 1 },
                    ]}
                    onPress={() => generatePasswordString(passLength)}
                  >
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.description}>Long Press to copy</Text>
            <Pressable
              onLongPress={() => {
                Clipboard.setString(password);
                // ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
              }}
            >
              {/* <Text selectable={true} style={styles.generatedPassword}> */}
              <Text
                selectable={true}
                style={[
                  styles.generatedPassword,
                  {
                    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
                  },
                ]}
              >
                {password}
              </Text>
            </Pressable>
          </View>
        ) : null}

        {!isPassGenerated ? (
          <Text
            style={{ textAlign: 'center', color: '#94a3b8', marginTop: 20 }}
          >
            Your password will appear here
          </Text>
        ) : null}
      </View>
      {/* Version display at the bottom */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>Version {version}</Text>
      </View>
    </SafeAreaView>
  );
}

export default App;
