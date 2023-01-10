import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { useState, useEffect } from 'react';
import OneSignal, { OSNotification, NotificationReceivedEvent } from 'react-native-onesignal';
import { Notification } from '../components/Notification';

export function Routes() {
  const [notification, setNotification] = useState<OSNotification | null>()

  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
      const response = notificationReceivedEvent.getNotification()

      setNotification(response)
    })

    return () => unsubscribe
  })

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />

      {/* {notification?.title && ( */}
        <Notification title={'notification.title'} onClose={() => {setNotification(null)}} />
      {/* )} */}
    </NavigationContainer>  
  );
}