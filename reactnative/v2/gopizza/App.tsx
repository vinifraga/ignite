import { Text, View } from 'react-native';
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components/native';

import theme from '@src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular
  })


  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{
          fontFamily: 'DMSerifDisplay_400Regular',
          fontSize: 40,
        }}>GoPizza</Text>
      </View>
    </ThemeProvider>
  );
}