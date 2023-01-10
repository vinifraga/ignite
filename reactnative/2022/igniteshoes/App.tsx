import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';
import { useEffect, useState } from 'react';
import { Notification } from './src/components/Notification';

OneSignal.setAppId('c5249431-8cc4-4795-a3ee-ec8c5578aa36')
OneSignal.setEmail('vinifragam@gmail.com')

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const [notification, setNotification] = useState<OSNotification | null>()

  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
      const response = notificationReceivedEvent.getNotification()

      setNotification(response)
    })

    return () => unsubscribe
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>

      {notification?.title && (
        <Notification title={notification.title} onClose={() => {setNotification(null)}} />
      )}
    </NativeBaseProvider>
  );
}