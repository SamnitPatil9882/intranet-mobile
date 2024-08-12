import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import Toast from './app/components/toast';

import {Interceptor} from './app/services/api';
import RootNavigator from './app/navigation/RootNavigator';
import UserContext, {UserContextData} from './app/context/user.context';

import colors from './app/constant/colors';
import VersionContext from './app/context/version.context';
import {CheckVersionResponse} from 'react-native-check-version';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import usePushNotification from './app/Peerly/services/firebase/notification';

const queryClient = new QueryClient();

const App = () => {
  const userContextValue = useState<UserContextData | null>(null);
  const versionContextValue = useState<CheckVersionResponse | null>(null);

  const {
    getDeviceToken,
    requestUserPermission,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onForeGroundNotificationHandler,
    onBackGroundNotifeeHandler,
  } = usePushNotification();

  useEffect(() => {
    requestUserPermission();
    getDeviceToken();
    listenToForegroundNotifications();
    listenToBackgroundNotifications();
    onForeGroundNotificationHandler();
    onBackGroundNotifeeHandler();
  }, []);


  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <VersionContext.Provider value={versionContextValue}>
        <UserContext.Provider value={userContextValue}>
          <Interceptor>
            <QueryClientProvider client={queryClient}>
              <StatusBar
                backgroundColor={colors.PRIMARY}
                barStyle="light-content"
              />
              <RootNavigator />
            </QueryClientProvider>
          </Interceptor>
        </UserContext.Provider>
      </VersionContext.Provider>
      <Toast />
    </GestureHandlerRootView>
  );
};

export default App;
